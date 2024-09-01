import express from 'express';
import { getAllEvents, getEventDetails } from '../backend/controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/event/:id', getEventDetails);
router.get('/eventos', (req, res) => {
  res.render('eventos');
});

export default router;
