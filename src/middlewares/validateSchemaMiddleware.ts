import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            throw {
                type: "Unprocessable Entity",
                message: errorDetails
            };
        }
        next();
    }
}