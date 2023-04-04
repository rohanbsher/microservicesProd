import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '@implementai/common'

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response, next: NextFunction) => {
	res.sendStatus(200);
})

export { router as createTicketRouter };