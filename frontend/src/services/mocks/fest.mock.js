/**
 * fests.mock.js
 * What:  PLACEHOLDER festival data (the spotlight fest and the four annual fests),
 *        used only while VITE_USE_MOCK_DATA=true.
 * Source: copied from the legacy events.html. Content is NOT verified.
 * Open questions for the content owner:
 *   - The legacy page lists Udgam as "WINTER / FEB", but the 2026 poster says 30 Oct - 1 Nov.
 *   - Innoventure has no matching event filter in the legacy page, so its filterCategory is null.
 *   - The legacy Atheleta image link was a web page, not an image, so its imageUrl is null.
 * Used by: fest.service.js
 * Talks to: assets/images (fest poster)
 */
import poster640 from '@/assets/images/udgam2k26-640.webp';
import poster1024 from '@/assets/images/udgam2k26-1024.webp';

// The fest shown large at the top of the events page.
export const featuredFestMock = {
  id: 'udgam-2k26',
  name: 'UDGAM 2k26',
  tagline: 'Chase the Bloom!',
  description:
    'Where ideas take flight, cultures intertwine, and every moment becomes a memory — Udgam, the spirit of NIT Sikkim, blooming amidst the Himalayas.',
  startDate: '2026-10-30',
  endDate: '2026-11-01',
  status: 'UPCOMING',
  registrationOpen: true,
  highlights: [
    'VIBRANT COMMUNITY',
    '3 DAYS OF CELEBRATIONS',
    'LIFELONG MEMORIES',
    'CULTURAL COMPETITION',
  ],
  facts: [
    { icon: 'trophy', label: '30+ Events' },
    { icon: 'users', label: '1,200+ DELEGATES' },
    { icon: 'location', label: 'SOUTH SIKKIM CAMPUS' },
  ],
  primaryAction: { label: 'INDULGE', url: 'https://udgamnits.live' },
  secondaryAction: { label: 'EVENTS', url: 'https://udgamnits.live/events' },
  image: {
    src: poster1024,
    srcSet: `${poster640} 640w, ${poster1024} 1024w`,
    width: 1024,
    height: 1024,
    alt: 'Udgam Cultural Festival Spotlight',
  },
};

// The four yearly fests. "filterCategory" is the event filter the Explore button applies.
export const festsMock = [
  {
    id: 'abhiyantran',
    number: 1,
    name: 'ABHIYANTRAN',
    kind: 'TECHNICAL',
    season: 'AUTUMN',
    timeline: 'FEB',
    accent: 'cyan',
    description:
      'The national technical symposium of NIT Sikkim. Fosters engineering innovation, robotics obstacle trails, competitive coding, hackathons, and research paper presentations.',
    tags: ['ROBOTICS', 'AI / ML', 'AEROMODELLING'],
    imageUrl:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Abhiyantran Tech Fest',
    filterCategory: 'tech',
  },
  {
    id: 'udgam',
    number: 2,
    name: 'UDGAM',
    kind: 'CULTURAL',
    season: 'WINTER',
    timeline: 'OCT',
    accent: 'purple',
    description:
      'The annual cultural fiesta celebrating Himalayan heritage, indie music, choreography, theater, digital visual art, rock bands, and celebrity pro-nights.',
    tags: ['SPATIAL ARTS', 'SOUND ENG', 'MEDIA DESIGN'],
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Udgam Cultural Fest',
    filterCategory: 'culture',
  },
  {
    id: 'atheleta',
    number: 3,
    name: 'ATHELETA',
    kind: 'ATHLETICS',
    season: 'EARLY SPRING',
    timeline: 'MAR',
    accent: 'emerald',
    description:
      'The high-altitude mountain sports and competitive esports meet. Inter-branch and inter-college rivalries across football, cricket, badminton, volleyball, and strategy tactical gaming.',
    tags: ['KINEMATICS', 'ESPORTS STRATEGY', 'LEADERSHIP'],
    imageUrl: null,
    imageAlt: 'Atheleta Sports Fest',
    filterCategory: 'sports',
  },
  {
    id: 'innoventure',
    number: 4,
    name: 'INNOVENTURE',
    kind: 'VENTURE',
    season: 'SPRING',
    timeline: 'APR',
    accent: 'amber',
    description:
      'The flagship entrepreneurship summit by E-Cell NIT Sikkim. Features pitch decks, investor roundtables, Himalayan artisanal product incubations, and venture funding grants.',
    tags: ['VENTURE DESIGN', 'FINTECH', 'PRODUCT MGMT'],
    imageUrl:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Innoventure E-Summit',
    filterCategory: null,
  },
];
