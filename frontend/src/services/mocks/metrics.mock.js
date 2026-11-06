/**
 * metrics.mock.js
 * What:  PLACEHOLDER campus numbers, used only while VITE_USE_MOCK_DATA=true.
 * Source: copied from the legacy index.html and metrics.html. The figures are NOT verified,
 *         and the old page called them "real-time" although they were typed by hand.
 * Used by: metrics.service.js
 * Talks to: nothing
 */

// The four counters on the homepage.
export const overviewStatsMock = [
  { id: 'active-clubs', label: 'ACTIVE_CLUBS', value: 12, caption: 'Technical Subsystems' },
  { id: 'live-projects', label: 'LIVE_PROJECTS', value: 48, caption: 'Active Deployments' },
  { id: 'graduated-net', label: 'GRADUATED_NET', value: 1659, caption: 'Global Alumni Members' },
  { id: 'top-partners', label: 'TOP_PARTNERS', value: 85, caption: 'Visiting Tech Firms' },
];

// Everything shown on the metrics page.
export const campusMetricsMock = {
  stats: [
    { id: 'github-commits', label: 'GITHUB_COMMITS', value: 18420, caption: 'Annual Code Repositories' },
    { id: 'research-papers', label: 'RESEARCH_PAPERS', value: 142, caption: 'IEEE / Scopus Indexed' },
    { id: 'hackathon-wins', label: 'HACKATHON_WINS', value: 36, caption: 'National & Global Titles' },
    { id: 'patents-filed', label: 'PATENTS_FILED', value: 18, caption: 'Himalayan Tech Innovations' },
  ],
  participation: [
    { id: 'cse', department: 'COMPUTER SCIENCE & ENG', percent: 96 },
    { id: 'aiml', department: 'AI/ML', percent: 91 },
    { id: 'ece', department: 'ELECTRONICS & COMM', percent: 91 },
    { id: 'eee', department: 'ELECTRICAL & ELECTRONICS', percent: 84 },
    { id: 'mech', department: 'MECHANICAL ENGINEERING', percent: 79 },
    { id: 'civil', department: 'CIVIL ENGINEERING', percent: 72 },
  ],
  infrastructure: {
    title: 'Campus Server Uptime',
    description:
      'Primary high-performance computing (HPC) nodes located at Ravangla campus facility maintain redundant power back-ups during extreme alpine winter conditions.',
    gridPowerUptimePercent: 99.2,
    nodeLatencyMs: 12.4,
  },
};
