import express from 'express';
import { getAllEvents, getEventDetails } from '../controllers/eventController.js';

const router = express.Router();


router.get('/', getAllEvents);
router.get('/event/:id', getEventDetails);



export default router;
