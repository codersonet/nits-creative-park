/**
 * validation.js
 * What:  Small readers that check one value each and clean it. Each takes an "errors" list: when
 *        a value is wrong it adds { field, message } and the validator throws once at the end.
 * Used by: validators/*.validator.js
 * Talks to: nothing
 */

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reads a whole number. A missing value gives the fallback. Arrays and other types are rejected.
export function readInteger(errors, field, raw, { min, max, fallback }) {
  if (raw === undefined || raw === '') return fallback;
  const text = typeof raw === 'string' || typeof raw === 'number' ? String(raw).trim() : '';
  if (!/^\d{1,9}$/.test(text)) {
    errors.push({ field, message: `${field} must be a whole number.` });
    return fallback;
  }
  const value = Number(text);
  if (value < min || value > max) {
    errors.push({ field, message: `${field} must be between ${min} and ${max}.` });
    return fallback;
  }
  return value;
}

// Reads a choice from an allowed list. A missing value gives undefined (the filter is off).
export function readChoice(errors, field, raw, allowed) {
  if (raw === undefined || raw === '') return undefined;
  if (typeof raw !== 'string' || !allowed.includes(raw)) {
    errors.push({ field, message: `${field} must be one of: ${allowed.join(', ')}.` });
    return undefined;
  }
  return raw;
}

// Reads text: trims it, removes control characters, and checks the length.
// "multiline" keeps line breaks (for messages); otherwise they become spaces (for names).
export function readText(errors, field, raw, { min = 1, max, multiline = false }) {
  if (typeof raw !== 'string') {
    errors.push({ field, message: `${field} is required.` });
    return '';
  }
  const cleaned = raw
    .replace(multiline ? /\r\n?/g : /[\r\n\t]+/g, multiline ? '\n' : ' ')
    .replace(CONTROL_CHARS, '')
    .trim();
  if (cleaned.length < min || cleaned.length > max) {
    errors.push({ field, message: `${field} must be ${min} to ${max} characters.` });
  }
  return cleaned;
}

// Checks the shape of an email address and its length. Delivery is never attempted here.
export function readEmail(errors, field, raw, { max }) {
  const email = readText(errors, field, raw, { min: 3, max });
  if (email && !EMAIL_SHAPE.test(email)) {
    errors.push({ field, message: `${field} must be a valid email address.` });
  }
  return email.toLowerCase();
}
