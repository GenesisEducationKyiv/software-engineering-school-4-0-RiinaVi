import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import schedule from 'node-schedule';

import { ormconfig as dataSource } from './ormconfig';
import router from './routes';
import sendRateToAllEmails from './jobs/sendRateToAllEmails';
import responseMessages from './constants/responseMessages';

const { SOMETHING_WENT_WRONG } = responseMessages;
// every day at 10:00
const SENDING_MAILS_SCHEDULING_TIME = '00 10 * * *';

export const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.use((err: Error, _req: Request, res: Response) => {
  if (err.stack) {
    console.error(err.stack);
    return res
      .status(SOMETHING_WENT_WRONG.code)
      .send(SOMETHING_WENT_WRONG.error);
  }
});

schedule.scheduleJob(SENDING_MAILS_SCHEDULING_TIME, sendRateToAllEmails);

export const main = async (): Promise<void> => {
  await dataSource.initialize();
};