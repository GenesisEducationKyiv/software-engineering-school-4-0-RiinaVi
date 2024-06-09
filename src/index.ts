import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ormconfig as dataSource } from './ormconfig';

import schedule from 'node-schedule';

import router from './routes';
import sendRateToAllEmails from './jobs/sendRateToAllEmails';

const app = express();

dotenv.config();

const { PORT } = process.env;

const main = async () => {
  await dataSource.initialize();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/', router);

  app.use((err: Error, _req: Request, res: Response) => {
    if (err.stack) {
      console.error(err.stack);
      return res
        .status(500)
        .send({ error: { message: 'something went wrong :(' } });
    }
  });

  // send email every day at 10:00
  schedule.scheduleJob('00 10 * * *', async () => {
    console.log('Daily email sending scheduled.');
    await sendRateToAllEmails();
  });

  app.listen(PORT, () => {
    console.log(
      `server started at http://${
        process.env.SERVER_IP ?? 'localhost'
      }:${PORT}`,
    );
  });
};

main().catch((err) => {
  console.error(err);
});
