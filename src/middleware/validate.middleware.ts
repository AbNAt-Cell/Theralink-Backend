import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation errors:", error);
            console.log("body request:", req.body)
             res.status(400).json({
              error: "The request cannot be fulfilled due to bad syntax",
              details: error.details.map((d) => d.message),
            });
            return
          }
          next();
    };
};
