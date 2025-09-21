import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './utils/errorHandler.js';
import CustomError from './utils/CustomError.js';
import { PrismaClient } from '@prisma/client';

const app = express();
dotenv.config();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// app.use();
// app.use();
// app.use();
app.use('/', () => {
    throw new CustomError(404, 'resource not found');
});


app.use(errorHandler);

export default app;