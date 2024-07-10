import express from 'express';

import RateController from '../controllers';

const router = express.Router();

const rateController = new RateController();

router.get('/rate', (req, res) => rateController.getRate(req, res));

export default router;
