/**
 * logger.js
 * What:  The one logger for the whole backend (JSON lines, one per event). Personal details are
 *        hidden before anything is written (mandate Section 9: never log secrets or personal data).
 * Used by: every file that needs to log
 * Talks to: pino, config/env.js
 */
import pino from 'pino';
import { env } from '../config/env.js';

export const logger = pino({
  level: env.logLevel,
  base: { service: 'creative-park-api' },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.email',
      '*.message',
      '*.name',
      '*.password',
    ],
    censor: '[hidden]',
  },
});
