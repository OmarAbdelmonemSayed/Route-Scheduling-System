import { getSchedule } from '../services/schedule.service.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const schedule = asyncWrapper(
    async (req, res) => {
        const scheduleData = await getSchedule();
        res.status(200).json({
            success: true,
            data: {
                scheduleData
            },
            message: "Schedule fetched  successfully"
        });
    })



export {
    schedule
}