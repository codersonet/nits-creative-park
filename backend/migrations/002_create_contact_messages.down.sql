-- 002_create_contact_messages.down.sql
-- What:  Undoes 002: removes the contact messages table. DESTROYS ALL STORED MESSAGES.
DROP TABLE IF EXISTS contact_messages;
