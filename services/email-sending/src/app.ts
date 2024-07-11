import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import schedule from 'node-schedule';
import { randomUUID } from 'crypto';

import amqplib from 'amqplib';
const queue = 'emails';

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

schedule.scheduleJob(SENDING_MAILS_SCHEDULING_TIME, async () => {
  const connection = await amqplib.connect(
    `amqp://${process.env.SERVER_IP ?? 'localhost'}`,
  );
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  const message = {
    eventId: randomUUID(),
    eventType: 'EmailScheduled',
    timeStamp: +new Date(),
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
});

export const main = async (): Promise<void> => {
  const connection = await amqplib.connect(
    `amqp://${process.env.SERVER_IP ?? 'localhost'}`,
  );
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  await channel.consume(queue, async (message) => {
    if (message !== null) {
      console.log('Received:', message.content.toString());
      channel.ack(message);
      await sendRateToAllEmails();
    } else {
      console.log('Consumer cancelled by server');
    }
  });
};
