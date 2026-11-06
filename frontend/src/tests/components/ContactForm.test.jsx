/**
 * ContactForm.test.jsx
 * What:  Checks that the contact form does not pretend to work while the backend is missing.
 * Used by: npm test
 * Talks to: components/features/contact/ContactForm.jsx
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactForm from '@/components/features/contact/ContactForm.jsx';

describe('ContactForm in placeholder mode', () => {
  it('says it is offline and keeps the send button off', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ContactForm skills={[]} onSent={() => {}} />
      </QueryClientProvider>,
    );
    expect(screen.getByText(/OFFLINE/, { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /TRANSMIT_PAYLOAD/ })).toBeDisabled();
  });
});
