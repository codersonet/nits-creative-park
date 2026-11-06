/**
 * projects.mock.js
 * What:  PLACEHOLDER student project data, used only while VITE_USE_MOCK_DATA=true.
 * Source: copied from the legacy script.js. Not verified with the content owners.
 * Used by: project.service.js
 * Talks to: nothing
 */
export const projectsMock = [
  {
    id: 'synapse-autonomous-rover',
    title: 'SYNAPSE_AUTONOMOUS_ROVER',
    club: 'ROBOTICS SOCIETY',
    category: 'robotics',
    description:
      'Alpine high-altitude terrain mapping rover equipped with LiDAR and real-time obstacle avoidance algorithms.',
    progress: 88,
    stack: ['ROS2', 'C++', 'Python', 'OpenCV'],
    status: 'TESTING_IN_FIELD',
  },
  {
    id: 'neural-campus-os',
    title: 'NEURAL_CAMPUS_OS',
    club: 'WEBDEV & CODING CLUB',
    category: 'tech',
    description:
      'Centralized student query, attendance automation, and course material exchange system built for NIT Sikkim.',
    progress: 94,
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    status: 'DEPLOYED',
  },
  {
    id: 'alpine-energy-harvester',
    title: 'ALPINE_ENERGY_HARVESTER',
    club: 'GREEN TECH CLUB',
    category: 'robotics',
    description:
      'Low-temperature piezoelectric kinetic energy generators tailored for mountain micro-grids.',
    progress: 62,
    stack: ['Embedded C', 'MATLAB', 'IoT'],
    status: 'PROTOTYPING',
  },
  {
    id: 'kanchenjunga-vr-archive',
    title: 'KANCHENJUNGA_VR_ARCHIVE',
    club: 'DESIGN & MEDIA CELL',
    category: 'creative',
    description:
      "Photogrammetry and spatial computing reconstruction of Sikkim's cultural heritage and mountain geology.",
    progress: 75,
    stack: ['Three.js', 'WebGL', 'Blender'],
    status: 'IN_DEVELOPMENT',
  },
  {
    id: 'quantum-fintech-node',
    title: 'QUANTUM_FINTECH_NODE',
    club: 'E-CELL NIT SIKKIM',
    category: 'tech',
    description:
      'Decentralized micro-finance platform tailored for rural Himalayan entrepreneurs and artisanal markets.',
    progress: 45,
    stack: ['Solidity', 'Web3.js', 'React'],
    status: 'ALPHA_STAGE',
  },
  {
    id: 'aero-sikkim-drone-net',
    title: 'AERO_SIKKIM_DRONE_NET',
    club: 'AERO-MODELLING CLUB',
    category: 'robotics',
    description:
      'Autonomous essential medical cargo delivery drone designed for turbulent mountain wind corridors.',
    progress: 80,
    // NOTE: "PX4" appears twice in the legacy data. Kept as-is until the owner confirms the stack.
    stack: ['PX4 Autopilot', 'MAVLink', 'PX4'],
    status: 'FLIGHT_TRIALS',
  },
];
