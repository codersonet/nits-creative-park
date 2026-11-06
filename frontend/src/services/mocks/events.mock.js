/**
 * events.mock.js
 * What:  PLACEHOLDER event schedule, used only while VITE_USE_MOCK_DATA=true.
 * Source: copied from the legacy events.html. Dates, prizes and organizers are NOT verified.
 * Note:  "action.url" is null on purpose. The old buttons only showed a fake alert() such as
 *        "Seat reserved", so there is no real link yet. The UI must show these as unavailable.
 * Used by: event.service.js
 * Talks to: nothing
 */
export const eventsMock = [
  {
    id: 'abhiyantran-inaugural-keynote',
    title: 'ABHIYANTRAN INAUGURAL KEYNOTE',
    category: 'tech',
    kind: 'KEYNOTE',
    accent: 'cyan',
    startDate: '2026-10-28',
    endDate: null,
    description:
      'Opening keynote exploring space exploration robotics, high-altitude alpine infrastructure, and quantum hardware with visiting scientists from ISRO and Google Research.',
    tags: ['MAIN AUDITORIUM', 'HYBRID BROADCAST', 'ALUMNI PANEL'],
    organizer: 'TECH_COUNCIL',
    action: { label: 'RESERVE_SEAT', variant: 'primary', url: null },
  },
  {
    id: 'dev-hack-himalayas',
    title: 'DEV_HACK HIMALAYAS',
    category: 'hackathon',
    kind: '36H HACK',
    accent: 'emerald',
    startDate: '2026-11-14',
    endDate: '2026-11-15',
    description:
      'Intense 36-hour sprint tackling remote alpine connectivity, distributed micro-commerce, edge AI inference, and decentralized disaster telemetry.',
    tags: ['COMPUTING LAB 01', '₹1.0L PRIZE', 'AI & WEB3'],
    organizer: 'CODING_CLUB',
    action: { label: 'JOIN_DISCORD', variant: 'ghost', url: null },
  },
  {
    id: 'robo-terrain-4',
    title: 'ROBO-TERRAIN 4.0',
    category: 'robotics',
    kind: 'ROBOTICS',
    accent: 'purple',
    startDate: '2026-12-05',
    endDate: null,
    description:
      'Autonomous alpine rover obstacle navigation trials on a simulated slope. Teams deploy SLAM algorithms, LiDAR sensors, and kinetic shock absorbers.',
    tags: ['OPEN GROUND ARENA', 'HARDWARE SPECS', 'LIDAR TRACK'],
    organizer: 'ROBOTICS_CELL',
    action: { label: 'RULEBOOK', variant: 'ghost', url: null },
  },
  {
    id: 'spatial-ui-vision-ai',
    title: 'SPATIAL UI & VISION AI',
    category: 'tech',
    kind: 'WORKSHOP',
    accent: 'cyan',
    startDate: '2026-12-18',
    endDate: null,
    description:
      'Hands-on masterclass covering Apple WWDC-style fluid gesture engineering, neural rendering, photogrammetry, and spatial web shader architectures.',
    tags: ['SEMINAR HALL 02', 'HANDS-ON LAB', 'APPLE HIG'],
    organizer: 'DESIGN_&_MEDIA',
    action: { label: 'RESERVE_SEAT', variant: 'primary', url: null },
  },
  {
    id: 'reverb-battle-of-the-bands',
    title: 'REVERB // BATTLE OF THE BANDS',
    category: 'culture',
    kind: 'CULTURAL',
    accent: 'purple',
    startDate: '2027-02-19',
    endDate: null,
    description:
      'The flagship music face-off at Udgam. Top collegiate rock, metal, indie, and fusion bands battle it out on the open-air alpine amphitheater stage.',
    tags: ['OPEN AMPHITHEATER', 'LIVE CONCERT', 'JUDGES FROM INDIE'],
    organizer: 'MUSIC_CLUB',
    action: { label: 'GET_TICKET', variant: 'ghost', url: null },
  },
  {
    id: 'apex-esports-conclave',
    title: 'APEX ESPORTS CONCLAVE',
    category: 'sports',
    kind: 'ESPORTS',
    accent: 'emerald',
    startDate: '2027-03-14',
    endDate: null,
    description:
      'High-frequency competitive gaming arena for tactical FPS, strategy MOBAs, and sim-racing hosted on gigabit fiber LAN inside the computing complex.',
    tags: ['HPC LAB', 'GIGABIT LAN', 'STREAMED LIVE'],
    organizer: 'GAMING_GUILD',
    action: { label: 'REGISTER_SQUAD', variant: 'ghost', url: null },
  },
];
