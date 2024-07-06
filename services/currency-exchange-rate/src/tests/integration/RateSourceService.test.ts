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
});
