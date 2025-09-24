import express from "express";
import { schedule } from "../controllers/schedule.controller.js";

const router = express.Router();

router.route('/')
    .get(schedule)

export {
    router
};