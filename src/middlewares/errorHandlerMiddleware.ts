import { NextFunction, Request, Response } from "express";

export function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.error(error);
    if (error.type === "Unprocessable Entity") {
        return res.status(422).send(error.message);
    }

    return res.status(500).send("Internal Server Error");
}