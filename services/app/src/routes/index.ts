import express from 'express';

import SERVICES_URLS from '../../../../constants/servicesUrls';

const router = express.Router();

router.get('/rate', (req, res) => {
  res.redirect(`${SERVICES_URLS.CURRENCY_EXCHANGE_RATE}/rate`);
});

router.post('/subscribe', async (req, res) => {
  const serviceResponse = await fetch(
    `http://email-subscription:${
      process.env.EMAIL_SUBSCRIPTION_SERVICE_PORT ?? 8020
    }/subscribe`,
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  res.send(await serviceResponse.json());
});

router.get('/unsubscribe', (req, res) => {
  res.redirect(
    `${SERVICES_URLS.EMAIL_SUBSCRIPTION}/unsubscribe?email=${
      req.query.email as string
    }`,
  );
});

export default router;
