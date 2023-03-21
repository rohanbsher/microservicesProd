import express from 'express';
import { currentUser } from '../middlewares/current-user';


// object that handles all the routing logic
const router = express.Router();

// use the currentUser middleware
router.get('/api/users/currentuser', currentUser, (req, res) => {
	res.send({ currentUser : req.currentUser || null});
});

// naming the export as currentUserRouter
export { router as currentUserRouter };