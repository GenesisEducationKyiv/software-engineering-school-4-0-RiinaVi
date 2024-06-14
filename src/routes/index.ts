import express from 'express';

import * as controllers from '../controllers';
import { CurrencyBeaconService } from '../services/RateSourceService';
import * as process from 'process';

const router = express.Router();

const rateController = new controllers.RateController(
  new CurrencyBeaconService(process.env.CURRENCY_BEACON_API_KEY),
);

router.get('/rate', rateController.getRate);

router.post('/subscribe', new controllers.SubscribeController().subscribe);

router.get('/unsubscribe', new controllers.UnsubscribeController().unsubscribe);

export default router;
