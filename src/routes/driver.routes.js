import express from "express";
import { addDriver, driverHistory } from "../controllers/driver.controller.js";

const router = express.Router();


router.route('/')
    .post(addDriver)



router.route('/:id/history')
    .get(driverHistory);



export {
    router
};