# 0008: Contact messages and privacy

**Status:** accepted

## Context
The contact form collects a name, an email address and a message, which is personal data. The owner is in India, where the DPDP Act is likely to apply once real visitors use the form.

## Decision
- Messages are stored in `contact_messages` and are never returned by any public endpoint.
- No IP address is stored. IP addresses are used only for rate limiting, in Redis, and expire automatically.
- Personal fields are hidden from logs (`src/logger/logger.js`).
- A retention job deletes messages older than `CONTACT_RETENTION_DAYS` (default 365): `npm run job:purge-contact`, run daily by a scheduler.
- Bots are slowed down by a hidden trap field plus a strict rate limit (5 per hour per address). A CAPTCHA is **not** included, because it needs an account with a provider and a widget in the frontend.

## Consequences
- Before launch the owner still needs a privacy notice (what is collected, why, how long, who to contact) and a way to delete a person's message on request. Neither page nor process exists yet.
- Someone has to read the messages. Until an admin area exists that means a database query, for example `SELECT created_at, name, email, subject, message FROM contact_messages ORDER BY created_at DESC;`.
- Backups also contain messages, so backup files are private and are listed in `.gitignore`.
