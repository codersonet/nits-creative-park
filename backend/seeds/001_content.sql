-- 001_content.sql
-- What:  PLACEHOLDER content for the public pages, copied from the original static site
--        (via frontend/src/services/mocks). It is NOT verified with the content owners.
-- Safety: replaces the content tables completely. It never touches contact_messages.
--         `npm run seed` refuses to run in production unless ALLOW_SEED=true.
-- Note:  image paths are relative to the site (no leading slash); the frontend adds its base path.

DELETE FROM infrastructure_status;
DELETE FROM participation_rates;
DELETE FROM metric_stats;
DELETE FROM competencies;
DELETE FROM featured_fests;
DELETE FROM fests;
DELETE FROM placement_stats;
DELETE FROM companies;
DELETE FROM alumni;
DELETE FROM events;
DELETE FROM projects;

INSERT INTO projects (id, title, club, category, description, progress, stack, status, sort_order) VALUES
  ('synapse-autonomous-rover', 'SYNAPSE_AUTONOMOUS_ROVER', 'ROBOTICS SOCIETY', 'robotics', 'Alpine high-altitude terrain mapping rover equipped with LiDAR and real-time obstacle avoidance algorithms.', 88, ARRAY['ROS2', 'C++', 'Python', 'OpenCV']::text[], 'TESTING_IN_FIELD', 1),
  ('neural-campus-os', 'NEURAL_CAMPUS_OS', 'WEBDEV & CODING CLUB', 'tech', 'Centralized student query, attendance automation, and course material exchange system built for NIT Sikkim.', 94, ARRAY['Next.js', 'Node.js', 'PostgreSQL']::text[], 'DEPLOYED', 2),
  ('alpine-energy-harvester', 'ALPINE_ENERGY_HARVESTER', 'GREEN TECH CLUB', 'robotics', 'Low-temperature piezoelectric kinetic energy generators tailored for mountain micro-grids.', 62, ARRAY['Embedded C', 'MATLAB', 'IoT']::text[], 'PROTOTYPING', 3),
  ('kanchenjunga-vr-archive', 'KANCHENJUNGA_VR_ARCHIVE', 'DESIGN & MEDIA CELL', 'creative', 'Photogrammetry and spatial computing reconstruction of Sikkim''s cultural heritage and mountain geology.', 75, ARRAY['Three.js', 'WebGL', 'Blender']::text[], 'IN_DEVELOPMENT', 4),
  ('quantum-fintech-node', 'QUANTUM_FINTECH_NODE', 'E-CELL NIT SIKKIM', 'tech', 'Decentralized micro-finance platform tailored for rural Himalayan entrepreneurs and artisanal markets.', 45, ARRAY['Solidity', 'Web3.js', 'React']::text[], 'ALPHA_STAGE', 5),
  ('aero-sikkim-drone-net', 'AERO_SIKKIM_DRONE_NET', 'AERO-MODELLING CLUB', 'robotics', 'Autonomous essential medical cargo delivery drone designed for turbulent mountain wind corridors.', 80, ARRAY['PX4 Autopilot', 'MAVLink', 'PX4']::text[], 'FLIGHT_TRIALS', 6);

INSERT INTO events (id, title, category, kind, accent, start_date, end_date, description, tags, organizer, action_label, action_variant, action_url) VALUES
  ('abhiyantran-inaugural-keynote', 'ABHIYANTRAN INAUGURAL KEYNOTE', 'tech', 'KEYNOTE', 'cyan', '2026-10-28', NULL, 'Opening keynote exploring space exploration robotics, high-altitude alpine infrastructure, and quantum hardware with visiting scientists from ISRO and Google Research.', ARRAY['MAIN AUDITORIUM', 'HYBRID BROADCAST', 'ALUMNI PANEL']::text[], 'TECH_COUNCIL', 'RESERVE_SEAT', 'primary', NULL),
  ('dev-hack-himalayas', 'DEV_HACK HIMALAYAS', 'hackathon', '36H HACK', 'emerald', '2026-11-14', '2026-11-15', 'Intense 36-hour sprint tackling remote alpine connectivity, distributed micro-commerce, edge AI inference, and decentralized disaster telemetry.', ARRAY['COMPUTING LAB 01', '₹1.0L PRIZE', 'AI & WEB3']::text[], 'CODING_CLUB', 'JOIN_DISCORD', 'ghost', NULL),
  ('robo-terrain-4', 'ROBO-TERRAIN 4.0', 'robotics', 'ROBOTICS', 'purple', '2026-12-05', NULL, 'Autonomous alpine rover obstacle navigation trials on a simulated slope. Teams deploy SLAM algorithms, LiDAR sensors, and kinetic shock absorbers.', ARRAY['OPEN GROUND ARENA', 'HARDWARE SPECS', 'LIDAR TRACK']::text[], 'ROBOTICS_CELL', 'RULEBOOK', 'ghost', NULL),
  ('spatial-ui-vision-ai', 'SPATIAL UI & VISION AI', 'tech', 'WORKSHOP', 'cyan', '2026-12-18', NULL, 'Hands-on masterclass covering Apple WWDC-style fluid gesture engineering, neural rendering, photogrammetry, and spatial web shader architectures.', ARRAY['SEMINAR HALL 02', 'HANDS-ON LAB', 'APPLE HIG']::text[], 'DESIGN_&_MEDIA', 'RESERVE_SEAT', 'primary', NULL),
  ('reverb-battle-of-the-bands', 'REVERB // BATTLE OF THE BANDS', 'culture', 'CULTURAL', 'purple', '2027-02-19', NULL, 'The flagship music face-off at Udgam. Top collegiate rock, metal, indie, and fusion bands battle it out on the open-air alpine amphitheater stage.', ARRAY['OPEN AMPHITHEATER', 'LIVE CONCERT', 'JUDGES FROM INDIE']::text[], 'MUSIC_CLUB', 'GET_TICKET', 'ghost', NULL),
  ('apex-esports-conclave', 'APEX ESPORTS CONCLAVE', 'sports', 'ESPORTS', 'emerald', '2027-03-14', NULL, 'High-frequency competitive gaming arena for tactical FPS, strategy MOBAs, and sim-racing hosted on gigabit fiber LAN inside the computing complex.', ARRAY['HPC LAB', 'GIGABIT LAN', 'STREAMED LIVE']::text[], 'GAMING_GUILD', 'REGISTER_SQUAD', 'ghost', NULL);

INSERT INTO alumni (id, name, class_year, role, company, branch, location, bio, linkedin_url, sort_order) VALUES
  ('arjun-sharma', 'Arjun Sharma', 2021, 'Senior AI Engineer', 'Google', 'CSE', 'Palo Alto, CA', 'Ex-Lead of Web Development Club. Focused on distributed ML infrastructure and cloud scaling.', 'https://linkedin.com/in/arjun-sharma', 1),
  ('priya-chettri', 'Priya Chettri', 2019, 'Robotics Systems Architect', 'ISRO', 'ECE', 'Bengaluru, IN', 'Former President of Robotics Society. Specializes in terrain navigation algorithms and rover kinematics.', 'https://linkedin.com/in/priya-chettri', 2),
  ('tashi-bhutia', 'Tashi Bhutia', 2022, 'Founder', 'Alpine Security Systems', 'EEE', 'Gangtok, IN', 'Building hardware-level encryption solutions for high-altitude weather monitoring networks.', 'https://linkedin.com/in/tashi-bhutia', 3),
  ('rohan-verma', 'Rohan Verma', 2020, 'Core Kernel Developer', 'Microsoft', 'CSE', 'Redmond, WA', 'Contributed to low-latency Linux kernel driver architectures during tenure at NIT Sikkim research lab.', 'https://linkedin.com/in/rohan-verma', 4),
  ('ananya-roy', 'Ananya Roy', 2018, 'Principal Structural Lead', 'L&T', 'CIVIL', 'Mumbai, IN', 'Spearheaded structural seismic engineering designs for high-altitude mountain bridge infrastructure.', 'https://linkedin.com/in/ananya-roy', 5),
  ('karan-rai', 'Karan Rai', 2023, 'Quant Systems Engineer', 'Goldman Sachs', 'MECH', 'London, UK', 'Architected high-frequency trading data pipelines during final year capstone thesis project.', 'https://linkedin.com/in/karan-rai', 6);

INSERT INTO companies (id, name, logo_path, sort_order) VALUES
  ('314e', '314E', 'M4 4h16v4H12v4h8v8H4V4z', 1),
  ('aarti-industries', 'AARTI_INDUSTRIES', 'M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z', 2),
  ('alstom', 'ALSTOM', 'M3 4h18v4H7v4h12v4H7v4h14v4H3V4z', 3),
  ('analytics-quotient', 'ANALYTICS_QUOTIENT', 'M12 2L2 22h20L12 2zm0 5l5.5 11h-11L12 7z', 4),
  ('azure-power', 'AZURE_POWER', 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z', 5),
  ('baker-hughes', 'BAKER_HUGHES', 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', 6),
  ('bosch', 'BOSCH', 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z', 7),
  ('byjus', 'BYJUS', 'M4 4h10a4 4 0 0 1 0 8H4V4zm0 8h11a4 4 0 0 1 0 8H4v-8z', 8),
  ('c-dac', 'C_DAC', 'M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6z', 9),
  ('capgemini', 'CAPGEMINI', 'M12 2a10 10 0 100 20 10 10 0 000-20zm4 11H8v-2h8v2z', 10),
  ('cgi', 'CGI', 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z', 11),
  ('cognizant', 'COGNIZANT', 'M12 2L2 12l10 10 10-10L12 2zm0 4.5l6.5 6.5-6.5 6.5L5.5 13 12 6.5z', 12),
  ('dalmia-bharat', 'DALMIA_BHARAT', 'M4 4h8a8 8 0 0 1 0 16H4V4zm4 4v8h4a4 4 0 0 0 0-8H8z', 13),
  ('grab', 'GRAB', 'M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm3 13h-6V9h6v6z', 14),
  ('deloitte', 'DELOITTE', 'M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15l7.5-13z', 15),
  ('dassault-systemes', 'DASSAULT_SYSTEMES', 'M4 4h16v4H8v4h12v8H4V4z', 16),
  ('elitmus', 'ELITMUS', 'M6 4h12v4H10v4h8v4H10v4H6V4z', 17),
  ('infosys', 'INFOSYS', 'M4 4h4v16H4V4zm6 0h10v4H14v2h6v4h-6v6h-4V4z', 18),
  ('ibm', 'IBM', 'M2 4h20v2H2V4zm0 4h20v2H2V8zm0 4h20v2H2v-2zm0 4h20v2H2v-2z', 19),
  ('inveniolsi', 'INVENIOLSI', 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2V8h2v8z', 20),
  ('intel', 'INTEL', 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z', 21),
  ('indiamart', 'INDIAMART', 'M12 2L2 8v8l10 6 10-6V8L12 2zm0 4l6 3.5v5L12 18l-6-3.5v-5L12 6z', 22),
  ('ivy', 'IVY', 'M4 4h4v16H4V4zm6 0l4 8 4-8h4l-6 12v4h-4v-4L10 4z', 23),
  ('juspay', 'JUSPAY', 'M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z', 24),
  ('lti', 'LTI', 'M4 4h4v12h8v4H4V4z', 25),
  ('mcafee', 'MCAFEE', 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 4l6 3v6l-6 3-6-3V9l6-3z', 26),
  ('maq-software', 'MAQ_SOFTWARE', 'M2 4h4l6 10 6-10h4v16h-4V10l-6 10L6 10v10H2V4z', 27),
  ('maruti-suzuki', 'MARUTI_SUZUKI', 'M12 2L2 22h5l5-10 5 10h5L12 2z', 28),
  ('nvidia', 'NVIDIA', 'M12 0L1.75 6v12L12 24l10.25-6V6L12 0zm0 2.8l7.5 4.4v8.8L12 20.4l-7.5-4.4V7.2L12 2.8z', 29),
  ('oracle', 'ORACLE', 'M16 4H8C3.58 4 0 7.58 0 12s3.58 8 8 8h8c4.42 0 8-3.58 8-8s-3.58-8-8-8zm0 12H8c-2.21 0-4-1.79-4-4s1.79-4 4-4h8c2.21 0 4 1.79 4 4s-1.79 4-4 4z', 30),
  ('publicis-sapient', 'PUBLICIS_SAPIENT', 'M2 4h9v16H2V4zm11 0h9v16h-9V4z', 31),
  ('powergrid', 'POWERGRID', 'M11 2h2v7h-2V2zm-7 8h16v2H4v-2zm7 4h2v8h-2v-8z', 32),
  ('siemens', 'SIEMENS', 'M3 6h18v3H6v3h15v6H3v-3h15v-3H3V6z', 33),
  ('sonata-software', 'SONATA_SOFTWARE', 'M4 4h16v4H8v3h12v9H4v-4h12v-1H4V4z', 34),
  ('samsung', 'SAMSUNG', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z', 35),
  ('salesforce', 'SALESFORCE', 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z', 36),
  ('tcs', 'TCS', 'M2 4h20v4H14v12h-4V8H2V4z', 37),
  ('teradata', 'TERADATA', 'M4 4h16v4h-6v12h-4V8H4V4z', 38),
  ('tmeic', 'TMEIC', 'M2 4h20v4h-8v12h-4V8H2V4z', 39),
  ('tredence', 'TREDENCE', 'M12 2L2 22h20L12 2zm0 6l4 10H8l4-10z', 40),
  ('tech-mahindra', 'TECH_MAHINDRA', 'M4 4h16v3H4V4zm0 6h16v3H4v-3zm0 6h10v4H4v-4z', 41),
  ('ubisoft', 'UBISOFT', 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z', 42),
  ('vedanta', 'VEDANTA', 'M12 2L4 18h16L12 2zm0 5l3.5 7h-7L12 7z', 43);

INSERT INTO placement_stats (academic_year, highest_domestic_package_lpa, highest_package_role, average_btech_package_lpa, is_current) VALUES
  ('2025-2026', 33.46, 'SOFTWARE DEVELOPMENT ROLE', 8.32, true);

INSERT INTO fests (id, number, name, kind, season, timeline, accent, description, tags, image_url, image_alt, filter_category, sort_order) VALUES
  ('abhiyantran', 1, 'ABHIYANTRAN', 'TECHNICAL', 'AUTUMN', 'OCT', 'cyan', 'The national technical symposium of NIT Sikkim. Fosters engineering innovation, robotics obstacle trails, competitive coding, hackathons, and research paper presentations.', ARRAY['ROBOTICS', 'AI / ML', 'AEROMODELLING']::text[], 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', 'Abhiyantran Tech Fest', 'tech', 1),
  ('udgam', 2, 'UDGAM', 'CULTURAL', 'WINTER', 'FEB', 'purple', 'The annual cultural fiesta celebrating Himalayan heritage, indie music, choreography, theater, digital visual art, rock bands, and celebrity pro-nights.', ARRAY['SPATIAL ARTS', 'SOUND ENG', 'MEDIA DESIGN']::text[], 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80', 'Udgam Cultural Fest', 'culture', 2),
  ('atheleta', 3, 'ATHELETA', 'ATHLETICS', 'EARLY SPRING', 'MAR', 'emerald', 'The high-altitude mountain sports and competitive esports meet. Inter-branch and inter-college rivalries across football, cricket, badminton, volleyball, and strategy tactical gaming.', ARRAY['KINEMATICS', 'ESPORTS STRATEGY', 'LEADERSHIP']::text[], NULL, 'Atheleta Sports Fest', 'sports', 3),
  ('innoventure', 4, 'INNOVENTURE', 'VENTURE', 'SPRING', 'APR', 'amber', 'The flagship entrepreneurship summit by E-Cell NIT Sikkim. Features pitch decks, investor roundtables, Himalayan artisanal product incubations, and venture funding grants.', ARRAY['VENTURE DESIGN', 'FINTECH', 'PRODUCT MGMT']::text[], 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80', 'Innoventure E-Summit', NULL, 4);

INSERT INTO featured_fests (id, name, tagline, description, start_date, end_date, registration_open, highlights, facts, primary_action, secondary_action, image, is_active) VALUES
  ('udgam-2k26', 'UDGAM 2k26', 'Chase the Bloom!', 'Where ideas take flight, cultures intertwine, and every moment becomes a memory — Udgam, the spirit of NIT Sikkim, blooming amidst the Himalayas.', '2026-10-30', '2026-11-01', true, ARRAY['VIBRANT COMMUNITY', '3 DAYS OF CELEBRATIONS', 'LIFELONG MEMORIES', 'CULTURAL COMPETITION']::text[], '[{"icon":"trophy","label":"30+ Events"},{"icon":"users","label":"1,200+ DELEGATES"},{"icon":"location","label":"SOUTH SIKKIM CAMPUS"}]'::jsonb, '{"label":"INDULGE","url":"https://udgamnits.live"}'::jsonb, '{"label":"EVENTS","url":"https://udgamnits.live/events"}'::jsonb, '{"src":"images/udgam2k26-1024.webp","srcSet":"images/udgam2k26-640.webp 640w, images/udgam2k26-1024.webp 1024w","width":1024,"height":1024,"alt":"Udgam Cultural Festival Spotlight"}'::jsonb, true);

INSERT INTO competencies (id, code, title, percent, description, tags, accent, sort_order) VALUES
  ('spatial-stack', 'SPATIAL_STACK', 'SPATIAL COMPUTING & VR', 94, 'Real-time WebGL, photogrammetry terrain mapping, and spatial interactive shaders practiced during design hackathons.', ARRAY['THREE.JS', 'GLSL', 'RAYCASTING']::text[], 'cyan', 1),
  ('robotics-stack', 'ROBOTICS_STACK', 'AUTONOMOUS ROBOTICS & SLAM', 91, 'LiDAR-based terrain obstacle navigation, ROS2 path-planning, and high-altitude rover kinematics developed for Robo-Terrain.', ARRAY['ROS2', 'OPENCV', 'C++']::text[], 'purple', 2),
  ('neural-stack', 'NEURAL_STACK', 'NEURAL INTERFACES & AI', 88, 'On-device edge inference, LLM agent integration, and computer vision deployed during the 36-hour DevHack marathon.', ARRAY['PYTORCH', 'DIFFUSION', 'ONNX']::text[], 'emerald', 3);

INSERT INTO metric_stats (id, group_name, label, value, caption, sort_order) VALUES
  ('active-clubs', 'overview', 'ACTIVE_CLUBS', 12, 'Technical Subsystems', 1),
  ('live-projects', 'overview', 'LIVE_PROJECTS', 48, 'Active Deployments', 2),
  ('graduated-net', 'overview', 'GRADUATED_NET', 1659, 'Global Alumni Members', 3),
  ('top-partners', 'overview', 'TOP_PARTNERS', 85, 'Visiting Tech Firms', 4),
  ('github-commits', 'campus', 'GITHUB_COMMITS', 18420, 'Annual Code Repositories', 1),
  ('research-papers', 'campus', 'RESEARCH_PAPERS', 142, 'IEEE / Scopus Indexed', 2),
  ('hackathon-wins', 'campus', 'HACKATHON_WINS', 36, 'National & Global Titles', 3),
  ('patents-filed', 'campus', 'PATENTS_FILED', 18, 'Himalayan Tech Innovations', 4);

INSERT INTO participation_rates (id, department, percent, sort_order) VALUES
  ('cse', 'COMPUTER SCIENCE & ENG', 96, 1),
  ('aiml', 'AI/ML', 91, 2),
  ('ece', 'ELECTRONICS & COMM', 91, 3),
  ('eee', 'ELECTRICAL & ELECTRONICS', 84, 4),
  ('mech', 'MECHANICAL ENGINEERING', 79, 5),
  ('civil', 'CIVIL ENGINEERING', 72, 6);

INSERT INTO infrastructure_status (id, title, description, grid_power_uptime_percent, node_latency_ms) VALUES
  (1, 'Campus Server Uptime', 'Primary high-performance computing (HPC) nodes located at Ravangla campus facility maintain redundant power back-ups during extreme alpine winter conditions.', 99.2, 12.4);
