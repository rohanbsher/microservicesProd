import express from 'express'
import 'express-async-errors';
import { json } from 'body-parser'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true) // trust traffic from ingress-nginx
app.use(json())
app.use(cookieSession({
	signed: false, // disable encryption since JWT is already encrypted
	secure: true, // only works on https connections
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// async code can throw errors, so we need to use next() function to pass the error to the error handler
// but instead we can use the async express wrapper express-async-errors
app.all('*', async (req, res) => {	
	throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
	if(!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined')
	}

	try {
		// refers to cluster IP service in mongo-depl file
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err)
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000!');
  });
}

start()