import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@implementai/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', 
[
	body('email')
	.isEmail()
	.withMessage('Email must be valid'),
	body('password')
	.trim()
	.isLength({ min: 4, max: 20 })
	.withMessage('Password must be between 4 and 20 characters')
],
validateRequest, 
async (req: Request, res: Response) => {
	
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if(existingUser) {
		console.log('Email in use');
		throw new BadRequestError('Email in use');
	}

	// Password hashing


	const user = User.build( { email, password });
	await user.save();

	// Generate JWT
	const userJwt = jwt.sign({
		id: user.id,
		email: user.email
	}, process.env.JWT_KEY!);

	// Store it on session object
	// cookie session middleware sets a header to the response 
	req.session = {
		jwt: userJwt
	}

	res.status(201).send(user);
});

export { router as signupRouter };