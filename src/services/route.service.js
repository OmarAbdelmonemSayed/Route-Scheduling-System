import { prisma } from '../app.js';
import CustomError from '../utils/CustomError.js';

const createNewRoute = async (data) => {
        if (!data) {
            throw new CustomError(400, 'Route is required')
        }
        const driver = await prisma.driver.findFirst({
            where: {
                availability: true
            }
        });
        if (driver) {
            await prisma.driver.update({
                where: {
                    id: driver.id
                },
                data: {
                    availability: false
                }
            });
            data.driverId = driver.id;
            data.status = "ACTIVE";
        }
        const route = await prisma.route.create({
            data
        });
        return route;
    }

const getAllRoutes = async (data) => {
        const page = parseInt(data.page) || 0;
        const limit = parseInt(data.limit) || 10;
        const routes = await prisma.route.findMany({
            skip: page * limit,
            take: limit
        });
        return routes;
    }

const finishRouteById = async (routeId) => {
        if (!routeId) {
            throw new CustomError(400, 'Id is required');
        }
        const route = await prisma.route.update({
            where: {
                id: routeId
            },
            data: {
                status: "COMPLETED"
            }
        });
        if (!route) {
            throw new CustomError(404, 'Route not found');
        }
        const driver = await prisma.driver.update({
            where: {
                id: route.driverId
            },
            data: {
                availability: true
            }
        });
        if (!driver) {
            throw new CustomError(404, 'Driver not found');
        }
        return route;
    }



export {
    createNewRoute,
    getAllRoutes,
    finishRouteById
}