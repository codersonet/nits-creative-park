/**
 * read-endpoints.k6.js
 * What:  A load test for the public read endpoints (mandate Section 10), written for k6.
 *        It ramps up to 100 visitors and fails if more than 1% of requests fail or the
 *        slowest 5% take longer than 300 ms.
 * Used by: a person, before a launch:  k6 run -e BASE_URL=http://localhost:8080 backend/tests/load/read-endpoints.k6.js
 * Talks to: a running copy of the site (the Nginx address), never production without permission
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const PATHS = [
  '/api/v1/projects',
  '/api/v1/projects?category=robotics',
  '/api/v1/events',
  '/api/v1/alumni',
  '/api/v1/companies',
  '/api/v1/fests',
  '/api/v1/fests/featured',
  '/api/v1/metrics/overview',
];

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
  },
};

// One visitor: reads a random page of data, then waits a moment like a person would.
export default function visitor() {
  const path = PATHS[Math.floor(Math.random() * PATHS.length)];
  const res = http.get(`${BASE_URL}${path}`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'answer says success': (r) => r.json('success') === true,
  });
  sleep(1);
}
