import express from 'express';

import * as controllers from '../controllers';
import { CurrencyBeaconService } from '../services/RateSourceService';

const router = express.Router();

const rateController = new controllers.RateController(
  new CurrencyBeaconService(process.env.CURRENCY_BEACON_API_KEY ?? ''),
);
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
