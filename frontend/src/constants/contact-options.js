/**
 * contact-options.js
 * What:  The skill tags and subject choices offered on the contact form.
 * Used by: components/features/contact (skill picker, subject select)
 * Talks to: nothing
 */

// "value" is sent with the message. "label" is shown on screen.
export const CONTACT_SKILLS = Object.freeze([
  { value: 'AUTONOMOUS_ROBOTICS', label: 'ROBOTICS & SLAM' },
  { value: 'AI_DISTRIBUTED_ML', label: 'AI & MACHINE LEARNING' },
  { value: 'HIMALAYAN_IOT', label: 'HIMALAYAN IOT GRID' },
  { value: 'SPATIAL_COMPUTING', label: 'SPATIAL COMPUTING & VR' },
  { value: 'FULLSTACK_SYSTEMS', label: 'DISTRIBUTED SYSTEMS' },
  { value: 'AEROSPACE_DRONES', label: 'AERO-DRONE TELEMETRY' },
  { value: 'QUANTUM_FINTECH', label: 'DECENTRALIZED WEB3' },
  { value: 'SEISMIC_CIVIL', label: 'SEISMIC ENGINEERING' },
]);

export const CONTACT_SUBJECTS = Object.freeze([
  { value: 'PROJECT_COLLABORATION', label: 'NEW_PROJECT_COLLABORATION' },
  { value: 'CAMPUS_RECRUITMENT', label: 'CAMPUS_RECRUITMENT_DRIVE' },
  { value: 'RESEARCH_PARTNERSHIP', label: 'RESEARCH_&_PATENT_INQUIRY' },
  { value: 'ALUMNI_NETWORKING', label: 'ALUMNI_NETWORKING_SYNC' },
  { value: 'SYSTEM_FEEDBACK', label: 'SYSTEM_FEEDBACK_&_SUPPORT' },
]);
