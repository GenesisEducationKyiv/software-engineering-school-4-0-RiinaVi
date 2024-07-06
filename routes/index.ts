import express from 'express';

import SERVICES_URLS from '../constants/servicesUrls';

const router = express.Router();

router.get('/rate', (req, res) => {
  res.redirect(`${SERVICES_URLS.CURRENCY_EXCHANGE_RATE}/rate`);
});

router.post('/subscribe', (req, res) => {
  res.redirect(`${SERVICES_URLS.EMAIL_SUBSCRIPTION}/subscribe`);
});

router.get('/unsubscribe', (req, res) => {
  res.redirect(`${SERVICES_URLS.EMAIL_SUBSCRIPTION}/unsubscribe`);
});

export default router;
