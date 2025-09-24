import { createNewRoute, finishRouteById, getAllRoutes } from '../services/route.service.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const addRoute = asyncWrapper(
    async (req, res) => {
        const route = await createNewRoute(req.body);
        res.status(201).json({
            success: true,
            data: {
                route
            },
            message: "Route created successfully"
        });
    })

const getRoutes = asyncWrapper(
    async (req, res) => {
        const routes = await getAllRoutes(req.query);
        res.status(201).json({
            success: true,
            data: {
                routes
            },
            message: "Routes fetched successfully"
        });
    })

const finishRoute = asyncWrapper(
    async (req, res) => {
        const route = await finishRouteById(req.params.id);
        res.status(200).json({
            success: true,
            data: {
                route
            },
            message: "Route finished successfully"
        });
    })



export {
    addRoute,
    getRoutes,
    finishRoute
}