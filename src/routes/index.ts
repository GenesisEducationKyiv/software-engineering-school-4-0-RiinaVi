import express from 'express';

import * as controllers from '../controllers';
import { CurrencyBeaconService } from '../services/rateSource/CurrencyBeaconService';
import FetchTransportLayer from '../services/transportLayer/FetchTransportLayer';

const router = express.Router();

const rateController = new controllers.RateController(
  new CurrencyBeaconService(
    process.env.RATE_SOURCE_API_KEY ?? '',
    FetchTransportLayer,
  ),
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
