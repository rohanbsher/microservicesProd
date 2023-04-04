import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

// Add a new property to the Request interface
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}


// object that handles all the routing logic
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
	// if there is no jwt property on the session object, then the user is not authenticated
	if (!req.session?.jwt) {
		return next();
	}

	try {
		// if there is a jwt property on the session object, then the user is authenticated
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
		req.currentUser = payload;
	} catch (err) {}

	next();
}