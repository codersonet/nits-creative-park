/**
 * contact.service.js
 * What:  Business logic for contact messages. A message caught by the hidden trap field is
 *        dropped without saving, and the sender is told it worked (so bots learn nothing).
 * Used by: controllers/contact.controller.js
 * Talks to: repositories/contact.repository.js, logger/logger.js
 */
import { logger } from '../logger/logger.js';
import * as contactRepository from '../repositories/contact.repository.js';

// Saves a checked message. "isBot" is true when the trap field was filled in.
// "repository" can be replaced in tests.
export async function submitContactMessage({ data, isBot }, repository = contactRepository) {
  if (isBot) {
    logger.info('Contact message dropped by the trap field');
    return;
  }
  await repository.insertMessage(data);
}
