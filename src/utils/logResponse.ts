import fs from 'fs';

import { RateSourceResponse } from '../services/rateSource/RateSourceService';

interface Input {
  source: string;
  response: RateSourceResponse;
}

const formatLogData = (input: Input): string =>
  `${+new Date()} source: ${input.source} - ${input.response.code} - rate: ${
    input.response.rate ?? 'n/a'
  } - error: ${input.response.errorMessage ?? 'n/a'}\n`;

const logResponse = (input: Input): void => {
  fs.appendFile('logs.txt', formatLogData(input), function (error) {
    if (error) {
      console.error('ERROR: ', error);
    }
  });
  console.log(formatLogData(input));
};

export default logResponse;