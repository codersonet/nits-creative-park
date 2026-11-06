/**
 * SocialIcon.jsx
 * What:  The icon for one social network, drawn as inline SVG (no icon font, no CDN).
 * Used by: components/layout/Footer, the contact page
 * Talks to: react-icons (only the five icons listed below are bundled)
 */
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const ICONS = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  discord: FaDiscord,
};

// "id" is the id from constants/social-links.js. Unknown ids draw nothing.
export default function SocialIcon({ id }) {
  const Icon = ICONS[id];
  return Icon ? <Icon aria-hidden="true" focusable="false" /> : null;
}
