-- 002_create_contact_messages.up.sql
-- What:  Creates the table that stores messages from the contact form. It holds personal data
--        (name, email, message), so a job deletes old rows (see src/jobs/purgeContactMessages.job.js).

CREATE TABLE contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email      text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  skills     text[] NOT NULL DEFAULT '{}',
  subject    text NOT NULL,
  message    text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  status     text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Used by the retention job and by "newest first" reading.
CREATE INDEX contact_messages_created_at_idx ON contact_messages (created_at);

CREATE TRIGGER contact_messages_set_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
