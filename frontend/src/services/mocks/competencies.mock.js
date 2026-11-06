/**
 * competencies.mock.js
 * What:  PLACEHOLDER skill-strength cards for the events page, used only in placeholder mode.
 * Source: copied from the legacy events.html. The percentages are NOT verified.
 * Used by: competency.service.js
 * Talks to: nothing
 */
export const competenciesMock = [
  {
    id: 'spatial-stack',
    code: 'SPATIAL_STACK',
    title: 'SPATIAL COMPUTING & VR',
    percent: 94,
    description:
      'Real-time WebGL, photogrammetry terrain mapping, and spatial interactive shaders practiced during design hackathons.',
    tags: ['THREE.JS', 'GLSL', 'RAYCASTING'],
    accent: 'cyan',
  },
  {
    id: 'robotics-stack',
    code: 'ROBOTICS_STACK',
    title: 'AUTONOMOUS ROBOTICS & SLAM',
    percent: 91,
    description:
      'LiDAR-based terrain obstacle navigation, ROS2 path-planning, and high-altitude rover kinematics developed for Robo-Terrain.',
    tags: ['ROS2', 'OPENCV', 'C++'],
    accent: 'purple',
  },
  {
    id: 'neural-stack',
    code: 'NEURAL_STACK',
    title: 'NEURAL INTERFACES & AI',
    percent: 88,
    description:
      'On-device edge inference, LLM agent integration, and computer vision deployed during the 36-hour DevHack marathon.',
    tags: ['PYTORCH', 'DIFFUSION', 'ONNX'],
    accent: 'emerald',
  },
];
