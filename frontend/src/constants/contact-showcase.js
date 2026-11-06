/**
 * contact-showcase.js
 * What:  The three picture cards at the bottom of the contact page.
 * Used by: components/features/contact/ContactShowcase
 * Talks to: nothing
 */

// Copied from the old contact.html. The pictures are loaded from Unsplash, a third-party site.
export const CONTACT_SHOWCASE = Object.freeze([
  {
    id: "rover-grid",
    code: "SUBSYSTEM_01",
    accent: "cyan",
    title: "AUTONOMOUS_ROVER_GRID",
    caption: "Field Testing at 7,000+ ft",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "campus-os",
    code: "SUBSYSTEM_02",
    accent: "purple",
    title: "NEURAL_CAMPUS_OS",
    caption: "Distributed Student Cloud",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "himalayan-sync",
    code: "SUBSYSTEM_03",
    accent: "emerald",
    title: "GLOBAL_HIMALAYAN_SYNC",
    caption: "Alpine IoT Sensors Active",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
]);
