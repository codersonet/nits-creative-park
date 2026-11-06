-- 001_create_content_tables.down.sql
-- What:  Undoes 001: removes every content table and the updated_at function. DESTROYS CONTENT.
DROP TABLE IF EXISTS infrastructure_status, participation_rates, metric_stats, competencies,
  featured_fests, fests, placement_stats, companies, alumni, events, projects;
DROP FUNCTION IF EXISTS set_updated_at();
