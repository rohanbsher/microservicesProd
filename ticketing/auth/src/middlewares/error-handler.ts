import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// capture and process all the error produced by different request handlers
// 4 arguments are required for express to recognize this as an error handler
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(400).send({
		errors: [{ message: 'Something went wrong' }]
	});
}

