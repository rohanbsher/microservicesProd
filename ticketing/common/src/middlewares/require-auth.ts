import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// Assuming that the user is already authenticated
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
}
