/**
 * contact.validator.js
 * What:  Checks and cleans a contact message. Unknown fields are rejected. A filled-in trap field
 *        ("website", hidden from real visitors) marks the message as coming from a bot.
 * Used by: routes/contact.routes.js (through middleware/validate.middleware.js)
 * Talks to: utils/validation.js, errors/AppError.js, constants/contact-options.js
 */
import { CONTACT_LIMITS, CONTACT_SKILLS, CONTACT_SUBJECTS } from '../constants/contact-options.js';
import { ValidationError } from '../errors/AppError.js';
import { readChoice, readEmail, readText } from '../utils/validation.js';

const ALLOWED_FIELDS = ['name', 'email', 'skills', 'subject', 'message', 'website'];

// Reads the list of chosen skills: an array of known values, no repeats.
function readSkills(errors, raw) {
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > CONTACT_SKILLS.length) {
    errors.push({ field: 'skills', message: 'skills must be a short list.' });
    return [];
  }
  const unique = [...new Set(raw)];
  if (!unique.every((skill) => typeof skill === 'string' && CONTACT_SKILLS.includes(skill))) {
    errors.push({ field: 'skills', message: 'skills contains an unknown value.' });
    return [];
  }
  return unique;
}

// Returns { data, isBot }. Throws a ValidationError listing every problem.
export function validateContactMessage(body) {
  const isObject = body !== null && typeof body === 'object' && !Array.isArray(body);
  if (!isObject) {
    throw new ValidationError([{ field: 'body', message: 'Send the message as a JSON object.' }]);
  }

  // The trap field: real visitors never see it, so any text in it means a script filled the form.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return { data: null, isBot: true };
  }

  const errors = [];
  Object.keys(body).forEach((name) => {
    if (!ALLOWED_FIELDS.includes(name)) errors.push({ field: name, message: 'Unknown field.' });
  });
  const data = {
    name: readText(errors, 'name', body.name, { max: CONTACT_LIMITS.nameMax }),
    email: readEmail(errors, 'email', body.email, { max: CONTACT_LIMITS.emailMax }),
    skills: readSkills(errors, body.skills),
    subject: readChoice(errors, 'subject', body.subject, CONTACT_SUBJECTS),
    message: readText(errors, 'message', body.message, {
      max: CONTACT_LIMITS.messageMax,
      multiline: true,
    }),
  };
  if (data.subject === undefined && !errors.some((item) => item.field === 'subject')) {
    errors.push({ field: 'subject', message: 'subject is required.' });
  }
  if (errors.length > 0) throw new ValidationError(errors);
  return { data, isBot: false };
}
