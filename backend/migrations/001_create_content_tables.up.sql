-- 001_create_content_tables.up.sql
-- What:  Creates the tables behind the public pages (projects, events, alumni, partners, fests,
--        competencies, metrics). Every table has created_at / updated_at; updated_at is kept
--        current by a trigger. CHECK rules repeat the allowed values so bad data cannot get in.

CREATE FUNCTION set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$;

CREATE TABLE projects (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  club        text NOT NULL,
  category    text NOT NULL CHECK (category IN ('tech', 'robotics', 'creative')),
  description text NOT NULL,
  progress    smallint NOT NULL CHECK (progress BETWEEN 0 AND 100),
  stack       text[] NOT NULL DEFAULT '{}',
  status      text NOT NULL,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX projects_category_sort_idx ON projects (category, sort_order);

CREATE TABLE events (
  id            text PRIMARY KEY,
  title         text NOT NULL,
  category      text NOT NULL CHECK (category IN ('tech', 'hackathon', 'robotics', 'culture', 'sports')),
  kind          text NOT NULL,
  accent        text NOT NULL CHECK (accent IN ('cyan', 'purple', 'emerald', 'amber')),
  start_date    date NOT NULL,
  end_date      date,
  description   text NOT NULL,
  tags          text[] NOT NULL DEFAULT '{}',
  organizer     text NOT NULL,
  action_label  text NOT NULL,
  action_variant text NOT NULL CHECK (action_variant IN ('primary', 'ghost')),
  action_url    text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date IS NULL OR end_date >= start_date)
);
CREATE INDEX events_category_start_idx ON events (category, start_date);

CREATE TABLE alumni (
  id           text PRIMARY KEY,
  name         text NOT NULL,
  class_year   smallint NOT NULL CHECK (class_year BETWEEN 1950 AND 2100),
  role         text NOT NULL,
  company      text NOT NULL,
  branch       text NOT NULL,
  location     text NOT NULL,
  bio          text NOT NULL,
  linkedin_url text NOT NULL,
  sort_order   integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE companies (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  logo_path  text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE placement_stats (
  academic_year               text PRIMARY KEY,
  highest_domestic_package_lpa numeric(6, 2) NOT NULL,
  highest_package_role        text NOT NULL,
  average_btech_package_lpa   numeric(6, 2) NOT NULL,
  is_current                  boolean NOT NULL DEFAULT false,
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);
-- Only one row may be "current".
CREATE UNIQUE INDEX placement_stats_one_current_idx ON placement_stats (is_current) WHERE is_current;

CREATE TABLE fests (
  id              text PRIMARY KEY,
  number          smallint NOT NULL,
  name            text NOT NULL,
  kind            text NOT NULL,
  season          text NOT NULL,
  timeline        text NOT NULL,
  accent          text NOT NULL CHECK (accent IN ('cyan', 'purple', 'emerald', 'amber')),
  description     text NOT NULL,
  tags            text[] NOT NULL DEFAULT '{}',
  image_url       text,
  image_alt       text NOT NULL,
  filter_category text CHECK (filter_category IN ('tech', 'hackathon', 'robotics', 'culture', 'sports')),
  sort_order      integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE featured_fests (
  id                text PRIMARY KEY,
  name              text NOT NULL,
  tagline           text NOT NULL,
  description       text NOT NULL,
  start_date        date NOT NULL,
  end_date          date,
  registration_open boolean NOT NULL DEFAULT false,
  highlights        text[] NOT NULL DEFAULT '{}',
  facts             jsonb NOT NULL DEFAULT '[]',
  primary_action    jsonb NOT NULL,
  secondary_action  jsonb NOT NULL,
  image             jsonb NOT NULL,
  is_active         boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date IS NULL OR end_date >= start_date)
);
-- Only one fest may be the spotlight fest.
CREATE UNIQUE INDEX featured_fests_one_active_idx ON featured_fests (is_active) WHERE is_active;

CREATE TABLE competencies (
  id          text PRIMARY KEY,
  code        text NOT NULL,
  title       text NOT NULL,
  percent     smallint NOT NULL CHECK (percent BETWEEN 0 AND 100),
  description text NOT NULL,
  tags        text[] NOT NULL DEFAULT '{}',
  accent      text NOT NULL CHECK (accent IN ('cyan', 'purple', 'emerald', 'amber')),
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE metric_stats (
  id         text PRIMARY KEY,
  group_name text NOT NULL CHECK (group_name IN ('overview', 'campus')),
  label      text NOT NULL,
  value      integer NOT NULL CHECK (value >= 0),
  caption    text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX metric_stats_group_sort_idx ON metric_stats (group_name, sort_order);

CREATE TABLE participation_rates (
  id         text PRIMARY KEY,
  department text NOT NULL,
  percent    smallint NOT NULL CHECK (percent BETWEEN 0 AND 100),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- A single row (id is always 1).
CREATE TABLE infrastructure_status (
  id                      smallint PRIMARY KEY CHECK (id = 1),
  title                   text NOT NULL,
  description             text NOT NULL,
  grid_power_uptime_percent numeric(5, 2) NOT NULL CHECK (grid_power_uptime_percent BETWEEN 0 AND 100),
  node_latency_ms         numeric(7, 2) NOT NULL CHECK (node_latency_ms >= 0),
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

-- Keep updated_at current on every table above.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'projects', 'events', 'alumni', 'companies', 'placement_stats', 'fests', 'featured_fests',
    'competencies', 'metric_stats', 'participation_rates', 'infrastructure_status'
  ]
  LOOP
    EXECUTE format(
      'CREATE TRIGGER %I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
      table_name || '_set_updated_at', table_name
    );
  END LOOP;
END
$$;
