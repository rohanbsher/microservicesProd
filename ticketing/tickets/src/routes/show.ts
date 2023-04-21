import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket'
import { NotFoundError } from '@implementai/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
	 const ticket = await Ticket.findById(req.params.id);

	 if(!ticket) {
		throw new NotFoundError();
	 }

	 // defaults to 200
	 res.send(ticket);
});

export { router as showTicketRouter };