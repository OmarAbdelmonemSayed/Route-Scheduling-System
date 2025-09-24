import { prisma } from '../app.js';
import CustomError from '../utils/CustomError.js';

const createNewDriver = async (data) => {
        if (!data) {
            throw new CustomError(400, 'Driver is required')
        }
        const driver = await prisma.driver.create({
            data
        });
        return driver;
    }

const getDriverHistory = async (driverId) => {
    if (!driverId) {
        throw new CustomError(400, 'Id is required');
    }
    const history = await prisma.route.findMany({
            where: {
                driverId
            },
            omit: {
                driverId: true
            }
        });
        return history;
    }



export {
    createNewDriver,
    getDriverHistory
}