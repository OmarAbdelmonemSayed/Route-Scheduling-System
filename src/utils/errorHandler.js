import { Prisma } from "@prisma/client";

export default function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = "Something went wrong";

    // Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 400;
            message = `Unique constraint failed on: ${err.meta?.target}`;
        }
        if (err.code === "P2003") {
            statusCode = 400;
            message = `Foreign key constraint failed: ${err.meta}`;
        }
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = `Validation error: ${err.message}`;
    } else {
        statusCode = 500;
        message = `Unexpected error: ${err}`;
    }
    
    // Custom errors
    if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message
        },
    });
}