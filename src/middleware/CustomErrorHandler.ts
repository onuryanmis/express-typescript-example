import {ValidationError} from "class-validator";
import * as express from "express";
import {ExpressErrorMiddlewareInterface, HttpError, Middleware} from "routing-controllers";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(error: any, request: express.Request, response: express.Response, next: express.NextFunction) {
        let responseObject = {} as any;

        if (Array.isArray(error.errors) && error.errors.every((element: any) => element instanceof ValidationError)) {
            response.status(400);
            responseObject.message = "Validation Error";
            responseObject.errors = [];
            error.errors.forEach((element: ValidationError) => {
                let propertyName = element.property.toString();
                responseObject.errors.push({[propertyName]: element.constraints});
            });
        } else {
            if (error instanceof HttpError && error.httpCode) {
                response.status(error.httpCode);
            } else {
                response.status(500);
            }

            if (error instanceof Error) {
                const developmentMode: boolean = process.env.NODE_ENV === "development";

                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                if (error.message) {
                    responseObject.message = error.message;
                }
                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            } else if (typeof error === "string") {
                responseObject.message = error;
            }
        }

        response.json(responseObject);
    }
}