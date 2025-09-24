import express from "express";
import { addRoute, finishRoute, getRoutes } from "../controllers/route.controller.js";

const router = express.Router();


router.route('/')
    .post(addRoute)
    .get(getRoutes);



router.route('/:id/finish')
    .patch(finishRoute);



export {
    router
};