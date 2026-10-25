/**
 * useSendContactMessage.js
 * What:  Sends the contact form and reports loading, success and error states.
 * Used by: ContactForm
 * Talks to: contact.service.js, @tanstack/react-query
 */
import { useMutation } from '@tanstack/react-query';
import { sendContactMessage } from '@/services/contact.service.js';

// Returns the mutation; call mutate(formValues). Use isPending to disable the button.
export function useSendContactMessage() {
  return useMutation({ mutationFn: sendContactMessage });
}
