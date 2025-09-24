import { createNewDriver, getDriverHistory } from '../services/driver.service.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const addDriver = asyncWrapper(
    async (req, res) => {
        const driver = await createNewDriver(req.body);
        res.status(201).json({
            success: true,
            data: {
                driver
            },
            message: "Driver created successfully"
        });
    })

const driverHistory = asyncWrapper(
    async (req, res) => {
        const history = await getDriverHistory(req.params.id);
        res.status(201).json({
            success: true,
            data: {
                history
            },
            message: "History fetched successfully"
        });
    })



export {
    addDriver,
    driverHistory
}