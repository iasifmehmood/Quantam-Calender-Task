import express, { Router } from 'express';
import { EventController } from '../Controller/EventController';

const router: Router = express.Router();
const eventController = new EventController();

router.post('/event', (req, res) => eventController.addEvent(req, res));

export default router;
