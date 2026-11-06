/**
 * check-contract.mjs
 * What:  Makes sure the frontend, the backend and docs/api/openapi.yaml agree on the shared
 *        values: contact skills and subjects, and project and event categories. Run by CI.
 * Used by: .github/workflows/ci.yml, a person:  node scripts/check-contract.mjs
 * Talks to: frontend/src/constants/*.js, backend/src/constants/*.js, docs/api/openapi.yaml
 */
import { readFile } from 'node:fs/promises';

import { EVENT_CATEGORIES as backendEvents, PROJECT_CATEGORIES as backendProjects } from '../backend/src/constants/categories.js';
import { CONTACT_SKILLS as backendSkills, CONTACT_SUBJECTS as backendSubjects } from '../backend/src/constants/contact-options.js';
import { EVENT_CATEGORIES as frontendEvents, PROJECT_CATEGORIES as frontendProjects } from '../frontend/src/constants/categories.js';
import { CONTACT_SKILLS as frontendSkills, CONTACT_SUBJECTS as frontendSubjects } from '../frontend/src/constants/contact-options.js';

const openapi = await readFile(new URL('../docs/api/openapi.yaml', import.meta.url), 'utf8');
const problems = [];

// The frontend lists { value, label } objects and starts with "all"; the backend lists plain values.
const frontendValues = (list) => list.map((item) => item.value).filter((value) => value !== 'all');

// Reports a problem when two lists are not the same set of values.
function same(name, left, right) {
  const a = [...left].sort().join(',');
  const b = [...right].sort().join(',');
  if (a !== b) problems.push(`${name} differ:\n    frontend: ${a}\n    backend:  ${b}`);
}

same('project categories', frontendValues(frontendProjects), backendProjects);
same('event categories', frontendValues(frontendEvents), backendEvents);
same('contact skills', frontendSkills.map((item) => item.value), backendSkills);
same('contact subjects', frontendSubjects.map((item) => item.value), backendSubjects);

// Every shared value must also appear in the API description.
[...backendProjects, ...backendEvents, ...backendSubjects].forEach((value) => {
  if (!openapi.includes(value)) problems.push(`docs/api/openapi.yaml does not mention "${value}"`);
});

if (problems.length > 0) {
  process.stderr.write(`Contract check FAILED:\n- ${problems.join('\n- ')}\n`);
  process.exit(1);
}
process.stdout.write('Contract check passed: frontend, backend and openapi.yaml agree.\n');
