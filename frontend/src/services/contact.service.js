/**
 * contact.service.js
 * What:  Sends a message from the contact form (POST /contact-messages).
 * Used by: hooks/useSendContactMessage.js
 * Talks to: apiClient.js, utils/api-error.js
 */
import { USE_MOCK_DATA } from '@/constants/env.js';
import { ApiError } from '@/utils/api-error.js';
import { apiPost } from './apiClient.js';

// Sends one contact message. "skills" is a list of CONTACT_SKILLS values.
export async function sendContactMessage({ name, email, skills, subject, message, website, signal }) {
  if (USE_MOCK_DATA) {
    // WHY: there is no approved place to deliver messages yet (see docs/support.md).
    // Pretending the message was sent would mislead visitors, so we fail honestly.
    throw new ApiError({
      code: 'CONTACT_NOT_AVAILABLE',
      message: 'The contact form is not connected yet, so your message was not sent.',
    });
  }
  // "website" is the hidden trap field; the server drops messages where it is filled in.
  return apiPost('/contact-messages', { name, email, skills, subject, message, website }, { signal });
}
