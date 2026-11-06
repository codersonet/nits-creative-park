/**
 * social-links.js
 * What:  The club's social media accounts shown in the footer.
 * Used by: components/layout/Footer
 * Talks to: nothing
 */

// Copied from the old script.js footer. "id" picks the icon inside the Footer component,
// so this file stays free of UI code.
export const SOCIAL_LINKS = Object.freeze([
  { id: 'github', label: 'GitHub', href: 'https://github.com/opb_nitsikkim' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/opb_nitsikkim' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/school/opb-nit-sikkim/' },
  { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/opb_nitsikkim' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com/invite/MD2sD4yRvw' },
]);
