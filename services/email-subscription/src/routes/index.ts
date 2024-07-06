import express from 'express';

import SubscribeController from '../controllers/SubscribeController';
import UnsubscribeController from '../controllers/UnsubscribeController';
import GetAllEmailsController from '../controllers/GetAllEmailsController';

const router = express.Router();

const subscribeController = new SubscribeController();
const unsubscribeController = new UnsubscribeController();
const getAllEmailsController = new GetAllEmailsController();

router.post('/subscribe', (req, res) =>
  subscribeController.subscribe(req, res),
);

router.get('/unsubscribe', (req, res) =>
  unsubscribeController.unsubscribe(req, res),
);

router.get('/emails', (req, res) =>
  getAllEmailsController.getAllEmails(req, res),
);

export default router;
