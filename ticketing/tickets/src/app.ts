import express from 'express'
import 'express-async-errors';
import { json } from 'body-parser'
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@implementai/common'
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express()
app.set('trust proxy', true) // trust traffic from ingress-nginx
app.use(json())
app.use(cookieSession({
	signed: false, // disable encryption since JWT is already encrypted
	// secure: true, // only works on https connections
	secure: process.env.NODE_ENV !== 'test' //Jest sets NODE_ENV to 'test'
}))

app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

// async code can throw errors, so we need to use next() function to pass the error to the error handler
// but instead we can use the async express wrapper express-async-errors
app.all('*', async (req, res) => {	
	throw new NotFoundError()
})

app.use(errorHandler)

//Named export
export { app }