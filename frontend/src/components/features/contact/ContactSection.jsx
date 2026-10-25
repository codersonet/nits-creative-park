/**
 * ContactSection.jsx
 * What:  The contact page body: skill picker and links on the left, the form on the right.
 *        It keeps the chosen skills so the picker and the form stay in step.
 * Used by: pages/ContactPage
 * Talks to: SkillPicker, ContactInfo, ContactForm, constants/contact-options.js
 */
import { useState } from 'react';
import { CONTACT_SKILLS } from '@/constants/contact-options.js';
import ContactForm from './ContactForm.jsx';
import ContactInfo from './ContactInfo.jsx';
import SkillPicker from './SkillPicker.jsx';

export default function ContactSection() {
  const [skills, setSkills] = useState([]);

  // Switches one skill on or off.
  function toggleSkill(value) {
    setSkills((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  return (
    <section className="contact-section">
      <div className="grid-container contact-layout">
        <div className="contact-info-col">
          <SkillPicker options={CONTACT_SKILLS} selected={skills} onToggle={toggleSkill} />
          <ContactInfo />
        </div>
        <ContactForm skills={skills} onSent={() => setSkills([])} />
      </div>
    </section>
  );
}
