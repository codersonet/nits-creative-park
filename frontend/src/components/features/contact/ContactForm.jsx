/**
 * ContactForm.jsx
 * What:  The terminal-style contact form: name, email, chosen skills, subject and message.
 *        While the backend is not connected the send button is switched off and says why.
 * Used by: ContactSection
 * Talks to: hooks/useSendContactMessage.js, GlassCard, Button, constants/*, utils/api-error.js
 */
import { useId, useState } from 'react';
import { FaSignal } from 'react-icons/fa6';
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import { CONTACT_SKILLS, CONTACT_SUBJECTS } from '@/constants/contact-options.js';
import { USE_MOCK_DATA } from '@/constants/env.js';
import { useSendContactMessage } from '@/hooks/useSendContactMessage.js';
import { ApiError } from '@/utils/api-error.js';

const EMPTY_VALUES = { name: '', email: '', subject: CONTACT_SUBJECTS[0].value, message: '' };

// "skills" is the list of chosen skill values. "onSent" is called after a successful send.
export default function ContactForm({ skills, onSent }) {
  const formId = useId();
  const [values, setValues] = useState(EMPTY_VALUES);
  const mutation = useSendContactMessage();
  const skillLabels = CONTACT_SKILLS.filter((skill) => skills.includes(skill.value)).map((s) => s.label);

  // Returns a change handler that updates one field of the form.
  function handleChange(field) {
    return (event) => setValues((current) => ({ ...current, [field]: event.target.value }));
  }

  // Sends the message. The browser has already checked the required fields and lengths.
  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate(
      { ...values, skills },
      {
        onSuccess: () => {
          setValues(EMPTY_VALUES);
          onSent();
        },
      },
    );
  }

  return (
    <GlassCard className="terminal-window">
      <div className="terminal-bar">
        <div className="term-dots" aria-hidden="true">
          <span className="term-dot red" />
          <span className="term-dot yellow" />
          <span className="term-dot green" />
        </div>
        <span className="label-mono text-muted bar-title">REMOTE_INTERFACE_V2.6</span>
        <span className="label-mono accent-emerald">
          <FaSignal aria-hidden="true" focusable="false" /> {USE_MOCK_DATA ? 'OFFLINE' : 'ONLINE'}
        </span>
      </div>
      <div className="terminal-scanline" />

      <div className="terminal-body">
        <div className="terminal-prompt-box">
          <p>&gt; BOOTING COMMUNICATION PROTOCOL...</p>
          <p>&gt; UPLINK_STATUS: {USE_MOCK_DATA ? 'OFFLINE [FORM NOT CONNECTED YET]' : 'READY'}</p>
          <p>&gt; {USE_MOCK_DATA ? 'MESSAGES CANNOT BE SENT YET' : 'READY_FOR_PAYLOAD_TRANSMISSION'}</p>
        </div>

        {mutation.isSuccess ? (
          <div role="status" className="form-success">
            <span className="label-mono accent-emerald">[✓] MESSAGE_RECEIVED</span>
            <Button variant="ghost" onClick={() => mutation.reset()}>
              SEND_ANOTHER
            </Button>
          </div>
        ) : (
          <form className="terminal-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="terminal-field">
                <label htmlFor={`${formId}-name`}>IDENTIFIER_NAME</label>
                <input
                  id={`${formId}-name`}
                  className="terminal-input"
                  placeholder="e.g. Dr. Jane Doe"
                  value={values.name}
                  onChange={handleChange('name')}
                  maxLength={100}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="terminal-field">
                <label htmlFor={`${formId}-email`}>UPLINK_EMAIL</label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  className="terminal-input"
                  placeholder="e.g. user@domain.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  maxLength={254}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="terminal-field">
              <label htmlFor={`${formId}-skills`}>TARGET_DOMAINS / SKILLS</label>
              <input
                id={`${formId}-skills`}
                className="terminal-input"
                placeholder="Select skills in the panel"
                value={skillLabels.join(', ')}
                readOnly
              />
            </div>

            <div className="terminal-field">
              <label htmlFor={`${formId}-subject`}>PROTOCOL_SUBJECT</label>
              <select
                id={`${formId}-subject`}
                className="terminal-select"
                value={values.subject}
                onChange={handleChange('subject')}
              >
                {CONTACT_SUBJECTS.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="terminal-field">
              <label htmlFor={`${formId}-message`}>DATA_PAYLOAD</label>
              <textarea
                id={`${formId}-message`}
                className="terminal-textarea"
                rows={5}
                placeholder="Describe your inquiry, project or technical details..."
                value={values.message}
                onChange={handleChange('message')}
                maxLength={2000}
                required
              />
            </div>

            {mutation.isError && (
              <p role="alert" className="form-error">
                {mutation.error instanceof ApiError
                  ? mutation.error.message
                  : 'Something went wrong. Please try again.'}
              </p>
            )}

            <Button type="submit" className="form-submit" disabled={USE_MOCK_DATA || mutation.isPending}>
              {mutation.isPending ? 'TRANSMITTING...' : 'TRANSMIT_PAYLOAD ↗'}
            </Button>
          </form>
        )}

        <div className="terminal-telemetry">
          <div>COORDINATES: 27.3012° N, 88.3615° E</div>
          <div className="telemetry-right">STATION: SOUTH SIKKIM</div>
        </div>
      </div>
    </GlassCard>
  );
}
