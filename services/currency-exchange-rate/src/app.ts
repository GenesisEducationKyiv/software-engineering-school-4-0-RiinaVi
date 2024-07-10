import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes';
import responseMessages from '../../../constants/responseMessages';

const { INTERNAL_SERVER_ERROR } = responseMessages;

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
      .status(INTERNAL_SERVER_ERROR.code)
      .send(INTERNAL_SERVER_ERROR.error);
  }
});
