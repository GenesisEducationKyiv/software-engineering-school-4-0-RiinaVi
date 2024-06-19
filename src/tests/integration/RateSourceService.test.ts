/* eslint-disable */
import request from 'supertest';
import * as sinon from 'sinon';
import { app } from '../../app';

describe('RateSourceService', () => {
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(sinon.restore);

  test('should respond with current rate and 200 code', async () => {
    const ratesData = {
      json: () => {
        return Promise.resolve({
          meta: {
            code: 200,
          },
          rates: {
            UAH: 40.33,
          },
        });
      },
    };
    fetchStub.resolves(ratesData);

    const response = await request(app).get('/rate');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ rate: 40.33 });
  });

  test('should respond 429 error', async () => {
    const errorResponseFromThirdPartyService = {
      meta: {
        code: 429,
        error_type: 'auth failed',
        error_detail: 'Request limits exceeded',
      },
    };
    const jsonErrorResponseFromThirdPartyService = {
      json: () => {
        return Promise.resolve(errorResponseFromThirdPartyService);
      },
    };
    fetchStub.resolves(jsonErrorResponseFromThirdPartyService);

    const response = await request(app).get('/rate');
    expect(response.status).toBe(429);
    expect(response.body).toStrictEqual({
      error: `${errorResponseFromThirdPartyService.meta.error_type}: ${errorResponseFromThirdPartyService.meta.error_detail}`,
    });
  });

  test('should respond 500 error', async () => {
    const errorResponseFromThirdPartyService = {
      meta: {
        code: 500,
        error_type: 'Internal Server Error',
        error_detail:
          "This is an issue with CurrencyBeacon's servers processing your request.",
      },
    };
    const jsonErrorResponseFromThirdPartyService = {
      json: () => {
        return Promise.resolve(errorResponseFromThirdPartyService);
      },
    };
    fetchStub.resolves(jsonErrorResponseFromThirdPartyService);

    const response = await request(app).get('/rate');
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: `${errorResponseFromThirdPartyService.meta.error_type}: ${errorResponseFromThirdPartyService.meta.error_detail}`,
    });
  });
});
