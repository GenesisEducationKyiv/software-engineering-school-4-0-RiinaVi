import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import schedule from 'node-schedule';

import sendRateToAllEmails from './jobs/sendRateToAllEmails';
import responseMessages from '../../../constants/responseMessages';

const { INTERNAL_SERVER_ERROR } = responseMessages;
// every day at 10:00
const SENDING_MAILS_SCHEDULING_TIME = '00 10 * * *';

export const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err: Error, _req: Request, res: Response) => {
  if (err.stack) {
    console.error(err.stack);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .send(INTERNAL_SERVER_ERROR.error);
  }
});

schedule.scheduleJob(SENDING_MAILS_SCHEDULING_TIME, sendRateToAllEmails);
