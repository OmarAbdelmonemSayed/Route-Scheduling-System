import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './utils/errorHandler.js';
import CustomError from './utils/CustomError.js';
import { PrismaClient } from '@prisma/client';
import { router as routeRouter } from './routes/route.routes.js';
import { router as driverRouter } from './routes/driver.routes.js';
import { router as schduleRouter } from './routes/schedule.routes.js';

const app = express();
dotenv.config();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/routes', routeRouter);
app.use('/drivers', driverRouter);
app.use('/schedule', schduleRouter);
app.use('/', () => {
    throw new CustomError(404, 'resource not found');
});


app.use(errorHandler);

export default app;