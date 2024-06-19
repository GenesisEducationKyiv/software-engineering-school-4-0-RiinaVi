/* eslint-disable */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const body = {
    email: 'riinavi86@gmail.com',
  };
  const res = http.post('http://localhost:8000/subscribe', body);
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}
