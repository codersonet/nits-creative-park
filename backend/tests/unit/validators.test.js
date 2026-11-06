/**
 * validators.test.js
 * What:  Checks the list and contact validators: good input, bad input and attack-shaped input.
 * Used by: npm test
 * Talks to: validators/list.validator.js, validators/contact.validator.js
 */
import { describe, expect, it } from 'vitest';
import { ValidationError } from '../../src/errors/AppError.js';
import { validateContactMessage } from '../../src/validators/contact.validator.js';
import { pageQuery, projectQuery } from '../../src/validators/list.validator.js';

const goodMessage = {
  name: 'Jane Doe',
  email: 'Jane@Example.org',
  skills: ['HIMALAYAN_IOT'],
  subject: 'PROJECT_COLLABORATION',
  message: 'Hello there',
};

describe('list validator', () => {
  it('gives defaults for an empty query', () => {
    expect(projectQuery({})).toEqual({ page: 1, limit: 50, category: undefined });
  });

  it('reads page, limit and category', () => {
    expect(projectQuery({ page: '2', limit: '4', category: 'robotics' })).toEqual({
      page: 2,
      limit: 4,
      category: 'robotics',
    });
  });

  it('refuses a limit above 100, unknown parameters and unknown categories', () => {
    expect(() => projectQuery({ limit: '1000' })).toThrow(ValidationError);
    expect(() => projectQuery({ foo: '1' })).toThrow(ValidationError);
    expect(() => projectQuery({ category: "x'; DROP TABLE projects;--" })).toThrow(ValidationError);
    expect(() => pageQuery({ category: 'tech' })).toThrow(ValidationError);
  });

  it('lists every problem at once', () => {
    try {
      projectQuery({ page: 'x', category: 'nope' });
      expect.unreachable();
    } catch (error) {
      expect(error.details.map((item) => item.field).sort()).toEqual(['category', 'page']);
    }
  });
});

describe('contact validator', () => {
  it('cleans a good message', () => {
    const { data, isBot } = validateContactMessage(goodMessage);
    expect(isBot).toBe(false);
    expect(data.email).toBe('jane@example.org');
    expect(data.skills).toEqual(['HIMALAYAN_IOT']);
  });

  it('marks a filled trap field as a bot, without validating further', () => {
    expect(validateContactMessage({ website: 'http://spam.example' })).toEqual({ data: null, isBot: true });
  });

  it('treats an empty trap field as a real visitor', () => {
    expect(validateContactMessage({ ...goodMessage, website: '' }).isBot).toBe(false);
  });

  it('rejects bodies that are not objects', () => {
    [undefined, null, 'text', [], 5].forEach((body) => {
      expect(() => validateContactMessage(body)).toThrow(ValidationError);
    });
  });

  it('rejects unknown fields, bad skills, bad subjects and long messages', () => {
    expect(() => validateContactMessage({ ...goodMessage, isAdmin: true })).toThrow(ValidationError);
    expect(() => validateContactMessage({ ...goodMessage, skills: ['NOPE'] })).toThrow(ValidationError);
    expect(() => validateContactMessage({ ...goodMessage, skills: 'HIMALAYAN_IOT' })).toThrow(ValidationError);
    expect(() => validateContactMessage({ ...goodMessage, subject: 'OTHER' })).toThrow(ValidationError);
    expect(() => validateContactMessage({ ...goodMessage, subject: undefined })).toThrow(ValidationError);
    expect(() => validateContactMessage({ ...goodMessage, message: 'x'.repeat(2001) })).toThrow(ValidationError);
  });

  it('removes repeated skills', () => {
    const { data } = validateContactMessage({ ...goodMessage, skills: ['HIMALAYAN_IOT', 'HIMALAYAN_IOT'] });
    expect(data.skills).toEqual(['HIMALAYAN_IOT']);
  });
});
