import express from 'express';

import * as controllers from '../controllers';

const router = express.Router();

const rateController = new controllers.RateController();
const subscribeController = new controllers.SubscribeController();
const unsubscribeController = new controllers.UnsubscribeController();

router.get('/rate', (req, res) => rateController.getRate(req, res));

router.post('/subscribe', (req, res) =>
  subscribeController.subscribe(req, res),
);

router.get('/unsubscribe', (req, res) =>
  unsubscribeController.unsubscribe(req, res),
);

export default router;
