import express from 'express';

// object that handles all the routing logic
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	res.send('Hi there!');
});

// naming the export as currentUserRouter
export { router as currentUserRouter };