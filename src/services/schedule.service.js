import { prisma } from '../app.js';
import CustomError from '../utils/CustomError.js';

const getSchedule = async (data) => {
        const schedule = await prisma.route.findMany({
            include: {
                driver: true
            }
        });
        return schedule;
    }

export {
    getSchedule
}