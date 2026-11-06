/**
 * companies.mock.js
 * What:  PLACEHOLDER recruitment partner list, used only while VITE_USE_MOCK_DATA=true.
 * Source: the 43 badges in the legacy companies.html. Partner names are NOT verified.
 * Note:  "logoPath" is a generic 24x24 SVG shape from the legacy page, not the company's real logo.
 * Used by: company.service.js
 * Talks to: nothing
 */
export const companiesMock = [
  { id: '314e', name: '314E', logoPath: 'M4 4h16v4H12v4h8v8H4V4z' },
  { id: 'aarti-industries', name: 'AARTI_INDUSTRIES', logoPath: 'M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z' },
  { id: 'alstom', name: 'ALSTOM', logoPath: 'M3 4h18v4H7v4h12v4H7v4h14v4H3V4z' },
  { id: 'analytics-quotient', name: 'ANALYTICS_QUOTIENT', logoPath: 'M12 2L2 22h20L12 2zm0 5l5.5 11h-11L12 7z' },
  { id: 'azure-power', name: 'AZURE_POWER', logoPath: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z' },
  { id: 'baker-hughes', name: 'BAKER_HUGHES', logoPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'bosch', name: 'BOSCH', logoPath: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z' },
  { id: 'byjus', name: 'BYJUS', logoPath: 'M4 4h10a4 4 0 0 1 0 8H4V4zm0 8h11a4 4 0 0 1 0 8H4v-8z' },
  { id: 'c-dac', name: 'C_DAC', logoPath: 'M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6z' },
  { id: 'capgemini', name: 'CAPGEMINI', logoPath: 'M12 2a10 10 0 100 20 10 10 0 000-20zm4 11H8v-2h8v2z' },
  { id: 'cgi', name: 'CGI', logoPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z' },
  { id: 'cognizant', name: 'COGNIZANT', logoPath: 'M12 2L2 12l10 10 10-10L12 2zm0 4.5l6.5 6.5-6.5 6.5L5.5 13 12 6.5z' },
  { id: 'dalmia-bharat', name: 'DALMIA_BHARAT', logoPath: 'M4 4h8a8 8 0 0 1 0 16H4V4zm4 4v8h4a4 4 0 0 0 0-8H8z' },
  { id: 'grab', name: 'GRAB', logoPath: 'M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm3 13h-6V9h6v6z' },
  { id: 'deloitte', name: 'DELOITTE', logoPath: 'M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15l7.5-13z' },
  { id: 'dassault-systemes', name: 'DASSAULT_SYSTEMES', logoPath: 'M4 4h16v4H8v4h12v8H4V4z' },
  { id: 'elitmus', name: 'ELITMUS', logoPath: 'M6 4h12v4H10v4h8v4H10v4H6V4z' },
  { id: 'infosys', name: 'INFOSYS', logoPath: 'M4 4h4v16H4V4zm6 0h10v4H14v2h6v4h-6v6h-4V4z' },
  { id: 'ibm', name: 'IBM', logoPath: 'M2 4h20v2H2V4zm0 4h20v2H2V8zm0 4h20v2H2v-2zm0 4h20v2H2v-2z' },
  { id: 'inveniolsi', name: 'INVENIOLSI', logoPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2V8h2v8z' },
  { id: 'intel', name: 'INTEL', logoPath: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z' },
  { id: 'indiamart', name: 'INDIAMART', logoPath: 'M12 2L2 8v8l10 6 10-6V8L12 2zm0 4l6 3.5v5L12 18l-6-3.5v-5L12 6z' },
  { id: 'ivy', name: 'IVY', logoPath: 'M4 4h4v16H4V4zm6 0l4 8 4-8h4l-6 12v4h-4v-4L10 4z' },
  { id: 'juspay', name: 'JUSPAY', logoPath: 'M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z' },
  { id: 'lti', name: 'LTI', logoPath: 'M4 4h4v12h8v4H4V4z' },
  { id: 'mcafee', name: 'MCAFEE', logoPath: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 4l6 3v6l-6 3-6-3V9l6-3z' },
  { id: 'maq-software', name: 'MAQ_SOFTWARE', logoPath: 'M2 4h4l6 10 6-10h4v16h-4V10l-6 10L6 10v10H2V4z' },
  { id: 'maruti-suzuki', name: 'MARUTI_SUZUKI', logoPath: 'M12 2L2 22h5l5-10 5 10h5L12 2z' },
  { id: 'nvidia', name: 'NVIDIA', logoPath: 'M12 0L1.75 6v12L12 24l10.25-6V6L12 0zm0 2.8l7.5 4.4v8.8L12 20.4l-7.5-4.4V7.2L12 2.8z' },
  { id: 'oracle', name: 'ORACLE', logoPath: 'M16 4H8C3.58 4 0 7.58 0 12s3.58 8 8 8h8c4.42 0 8-3.58 8-8s-3.58-8-8-8zm0 12H8c-2.21 0-4-1.79-4-4s1.79-4 4-4h8c2.21 0 4 1.79 4 4s-1.79 4-4 4z' },
  { id: 'publicis-sapient', name: 'PUBLICIS_SAPIENT', logoPath: 'M2 4h9v16H2V4zm11 0h9v16h-9V4z' },
  { id: 'powergrid', name: 'POWERGRID', logoPath: 'M11 2h2v7h-2V2zm-7 8h16v2H4v-2zm7 4h2v8h-2v-8z' },
  { id: 'siemens', name: 'SIEMENS', logoPath: 'M3 6h18v3H6v3h15v6H3v-3h15v-3H3V6z' },
  { id: 'sonata-software', name: 'SONATA_SOFTWARE', logoPath: 'M4 4h16v4H8v3h12v9H4v-4h12v-1H4V4z' },
  { id: 'samsung', name: 'SAMSUNG', logoPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
  { id: 'salesforce', name: 'SALESFORCE', logoPath: 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' },
  { id: 'tcs', name: 'TCS', logoPath: 'M2 4h20v4H14v12h-4V8H2V4z' },
  { id: 'teradata', name: 'TERADATA', logoPath: 'M4 4h16v4h-6v12h-4V8H4V4z' },
  { id: 'tmeic', name: 'TMEIC', logoPath: 'M2 4h20v4h-8v12h-4V8H2V4z' },
  { id: 'tredence', name: 'TREDENCE', logoPath: 'M12 2L2 22h20L12 2zm0 6l4 10H8l4-10z' },
  { id: 'tech-mahindra', name: 'TECH_MAHINDRA', logoPath: 'M4 4h16v3H4V4zm0 6h16v3H4v-3zm0 6h10v4H4v-4z' },
  { id: 'ubisoft', name: 'UBISOFT', logoPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5z' },
  { id: 'vedanta', name: 'VEDANTA', logoPath: 'M12 2L4 18h16L12 2zm0 5l3.5 7h-7L12 7z' },
];
