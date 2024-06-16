import express from 'express';

import * as controllers from '../controllers';

const router = express.Router();

router.get('/rate', controllers.getRate);

router.post('/subscribe', controllers.subscribe);

router.get('/unsubscribe', controllers.unsubscribe);

export default router;
