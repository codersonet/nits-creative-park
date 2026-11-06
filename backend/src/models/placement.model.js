/**
 * placement.model.js
 * What:  The shape of the placement figures. "numeric" columns are cast to numbers, because the
 *        database driver would otherwise send them as text.
 * Used by: repositories/placement.repository.js
 * Talks to: nothing
 */
export const PLACEMENT_TABLE = 'placement_stats';
export const PLACEMENT_SELECT = `academic_year AS "academicYear",
  highest_domestic_package_lpa::float8 AS "highestDomesticPackageLpa",
  highest_package_role AS "highestPackageRole",
  average_btech_package_lpa::float8 AS "averageBtechPackageLpa"`;
