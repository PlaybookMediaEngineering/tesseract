-- Create the enums
CREATE TYPE bank_providers AS ENUM ('gocardless', 'plaid', 'teller');
CREATE TYPE inbox_status AS ENUM ('processing', 'pending', 'archived', 'new', 'deleted');
CREATE TYPE reportTypes AS ENUM ('profit', 'revenue', 'burn_rate');
CREATE TYPE teamRoles AS ENUM ('owner', 'member');
CREATE TYPE trackerStatus AS ENUM ('in_progress', 'completed');
CREATE TYPE transactionCategories AS ENUM (
  'travel', 'office_supplies', 'meals', 'software', 'rent', 'income',
  'equipment', 'transfer', 'internet_and_telephone', 'facilities_expenses',
  'activity', 'uncategorized', 'taxes', 'other', 'salary', 'fees'
);
CREATE TYPE transactionMethods AS ENUM (
  'payment', 'card_purchase', 'card_atm', 'transfer', 'other', 'unknown', 'ach',
  'interest', 'deposit', 'wire', 'fee'
);
CREATE TYPE transactionStatus AS ENUM ('posted', 'pending', 'excluded', 'completed');

-- Create the tables
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  email TEXT NULL,
  inbox_email TEXT NULL,
  inbox_forwarding BOOLEAN NULL,
  inbox_id TEXT NULL,
  logo_url TEXT NULL,
  name TEXT NULL
);

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  avatar_url TEXT NULL,
  created_at TIMESTAMP NULL,
  email TEXT NULL,
  full_name TEXT NULL,
  locale TEXT NULL,
  team_id UUID NULL,
  week_starts_on_monday BOOLEAN NULL,
  CONSTRAINT users_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES public.users(id)
);

CREATE TABLE IF NOT EXISTS public.bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  enrollment_id TEXT NULL,
  expires_at TIMESTAMP NULL,
  institution_id TEXT NOT NULL,
  logo_url TEXT NULL,
  name TEXT NOT NULL,
  provider bank_providers NULL,
  team_id UUID NOT NULL,
  CONSTRAINT bank_connections_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

SECURITY LABEL FOR pgsodium	ON COLUMN public.bank_connections.name
  IS 'ENCRYPT WITH KEY ID e11e1140-67b0-4230-968b-4293b6b23162 SECURITY INVOKER';

CREATE TABLE IF NOT EXISTS public.bank_accounts (
  account_id TEXT NOT NULL,
  balance NUMERIC NULL,
  bank_connection_id UUID NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NOT NULL,
  currency TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  last_accessed TIMESTAMP NULL,
  name TEXT NULL,
  team_id UUID NOT NULL,
  CONSTRAINT bank_accounts_bank_connection_id_fkey FOREIGN KEY (bank_connection_id) REFERENCES public.bank_connections(id),
  -- FOREIGN KEY (bank_connection_id) REFERENCES public.decrypted_bank_connections(id),
  CONSTRAINT bank_accounts_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id),
  CONSTRAINT public_bank_accounts_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

SECURITY LABEL FOR pgsodium	ON COLUMN public.bank_accounts.name
  IS 'ENCRYPT WITH KEY ID e11e1140-67b0-4230-968b-4293b6b23162 SECURITY INVOKER';

CREATE TABLE IF NOT EXISTS public.transaction_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color TEXT NULL,
  created_at TIMESTAMP NULL,
  description TEXT NULL,
  name TEXT NOT NULL,
  slug UUID DEFAULT gen_random_uuid() NOT NULL UNIQUE,
  system BOOLEAN NULL,
  team_id UUID NOT NULL,
  vat NUMERIC NULL,
  CONSTRAINT transaction_categories_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  UNIQUE (slug, team_id) -- Composite unique constraint
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount NUMERIC NOT NULL,
  assigned_id UUID NULL,
  balance NUMERIC NULL,
  bank_account_id UUID,
  category transactionCategories,
  category_slug UUID NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  currency TEXT NOT NULL,
  currency_rate NUMERIC NULL, 
  currency_source TEXT NULL,
  date TIMESTAMP DEFAULT NOW() NOT NULL,
  description TEXT NULL,
  internal_id TEXT NOT NULL,
  manual BOOLEAN NULL,
  method transactionMethods NOT NULL,
  name TEXT NOT NULL,
  note TEXT NULL,
  status transactionStatus NULL,
  team_id UUID NOT NULL,
  FOREIGN KEY (assigned_id) REFERENCES public.users(id),
  FOREIGN KEY (bank_account_id) REFERENCES public.bank_accounts(id),
  FOREIGN KEY (category_slug, team_id) REFERENCES public.transaction_categories(slug, team_id),
  FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

SECURITY LABEL FOR pgsodium	ON COLUMN public.transactions.name
  IS 'ENCRYPT WITH KEY ID e11e1140-67b0-4230-968b-4293b6b23162 SECURITY INVOKER';
SECURITY LABEL FOR pgsodium	ON COLUMN public.transactions.description
  IS 'ENCRYPT WITH KEY ID e11e1140-67b0-4230-968b-4293b6b23162 SECURITY INVOKER';

CREATE TABLE IF NOT EXISTS public.transaction_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  name TEXT NULL,
  path TEXT[] NULL,
  size NUMERIC NULL,
  team_id UUID NULL,
  transaction_id UUID NULL,
  type TEXT NULL,
  CONSTRAINT public_transaction_attachments_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT public_transaction_attachments_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);

CREATE TABLE IF NOT EXISTS public.inbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount NUMERIC NULL,
  attachment_id UUID NULL,
  content_type TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  currency TEXT NULL,
  display_name TEXT NULL,
  due_date TEXT NULL,
  embedding TEXT NULL,
  file_name TEXT NULL,
  file_path TEXT[] NULL,
  forwarded_to TEXT NULL,
  fts TSVECTOR,
  meta JSONB NULL,
  reference_id TEXT NULL,
  size NUMERIC NULL,
  status inbox_status,
  team_id UUID NULL,
  transaction_id UUID NULL,
  website TEXT NULL,
  inbox_amount_text TEXT NULL,
  CONSTRAINT inbox_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.transaction_attachments(id),
  CONSTRAINT public_inbox_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT public_inbox_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NULL,
  currency TEXT NULL,
  expire_at TIMESTAMP NULL,
  from_date TIMESTAMP NULL,
  link_id TEXT NULL,
  short_link TEXT NULL,
  team_id UUID NULL,
  to_date TIMESTAMP NULL,
  type reportTypes,
  CONSTRAINT public_reports_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id),
  CONSTRAINT reports_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.tracker_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  billable BOOLEAN NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  currency TEXT NULL,
  description TEXT NULL,
  estimate NUMERIC NULL,
  name TEXT NOT NULL,
  rate NUMERIC NULL,
  status trackerStatus,
  team_id UUID NULL,
  project_members JSONB NULL,
  total_duration NUMERIC NULL,
  CONSTRAINT tracker_projects_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.tracker_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  created_by UUID NULL,
  link_id TEXT NULL,
  project_id UUID NULL,
  short_link TEXT NULL,
  team_id UUID NULL,
  CONSTRAINT public_tracker_reports_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id),
  CONSTRAINT public_tracker_reports_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.tracker_projects(id),
  CONSTRAINT tracker_reports_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.tracker_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assigned_id UUID NULL,
  billed BOOLEAN NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  currency TEXT NULL,
  date TIMESTAMP NULL,
  description TEXT NULL,
  duration NUMERIC NULL,
  project_id UUID NULL,
  rate NUMERIC NULL,
  start TIMESTAMP NULL,
  stop TIMESTAMP NULL,
  team_id UUID NULL,
  project_members JSONB NULL,
  CONSTRAINT tracker_entries_assigned_id_fkey FOREIGN KEY (assigned_id) REFERENCES public.users(id),
  CONSTRAINT tracker_entries_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.tracker_projects(id),
  CONSTRAINT tracker_entries_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);


CREATE TABLE IF NOT EXISTS public.transaction_enrichments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug UUID NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  name TEXT NULL,
  system BOOLEAN NULL,
  team_id UUID NULL,
  CONSTRAINT transaction_enrichments_category_slug_team_id_fkey FOREIGN KEY (category_slug, team_id) REFERENCES public.transaction_categories(slug, team_id),
  CONSTRAINT transaction_enrichments_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount NUMERIC NOT NULL,
  assigned_id UUID NULL,
  balance NUMERIC NULL,
  bank_account_id UUID,
  category transactionCategories,
  category_slug UUID NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  currency TEXT NOT NULL,
  currency_rate NUMERIC NULL, 
  currency_source TEXT NULL,
  date TIMESTAMP DEFAULT NOW() NOT NULL,
  description TEXT NULL,
  internal_id TEXT NOT NULL,
  manual BOOLEAN NULL,
  method transactionMethods NOT NULL,
  name TEXT NOT NULL,
  note TEXT NULL,
  status transactionStatus NULL,
  team_id UUID NOT NULL,
  CONSTRAINT public_transactions_assigned_id_fkey FOREIGN KEY (assigned_id) REFERENCES public.users(id),
  CONSTRAINT transactions_bank_account_id_fkey FOREIGN KEY (bank_account_id) REFERENCES public.bank_accounts(id),
  CONSTRAINT transactions_category_slug_team_id_fkey FOREIGN KEY (category_slug, team_id) REFERENCES public.transaction_categories(slug, team_id),
  CONSTRAINT public_transactions_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.user_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  email TEXT NULL,
  invited_by UUID NULL,
  role teamRoles NULL,
  team_id UUID NULL,
  CONSTRAINT user_invites_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.users(id),
  CONSTRAINT public_user_invites_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

CREATE TABLE IF NOT EXISTS public.users_on_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP,
  role teamRoles,
  team_id UUID,
  user_id UUID,
  CONSTRAINT users_on_team_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT users_on_team_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
-- Create the functions
CREATE FUNCTION public.amount_text() RETURNS TEXT AS $$
BEGIN
  RETURN 'Amount text function not implemented';
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.calculated_vat() RETURNS NUMERIC AS $$
BEGIN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.extract_product_names(products_json JSONB) RETURNS TEXT AS $$
BEGIN
  RETURN 'Extract product names function not implemented';
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.generate_id(size INT) RETURNS TEXT AS $$
BEGIN
  RETURN 'Generate ID function not implemented';
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.generate_inbox(size INT) RETURNS TEXT AS $$
BEGIN
  RETURN 'Generate inbox function not implemented';
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_bank_account_currencies(team_id UUID) RETURNS TABLE(currency VARCHAR) AS $$
BEGIN
  RETURN QUERY SELECT DISTINCT currency FROM public.bank_accounts WHERE team_id = team_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_burn_rate(team_id UUID, date_from TIMESTAMP, date_to TIMESTAMP, currency VARCHAR) RETURNS TABLE(date TIMESTAMP, value NUMERIC) AS $$
BEGIN
  RETURN QUERY SELECT date_trunc('month', date) AS date, SUM(amount) AS value
               FROM public.transactions
               WHERE team_id = team_id AND date BETWEEN date_from AND date_to
               GROUP BY date_trunc('month', date);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_current_burn_rate(team_id UUID, currency VARCHAR) RETURNS NUMERIC AS $$
BEGIN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_profit(team_id UUID, date_from TIMESTAMP, date_to TIMESTAMP, currency VARCHAR) RETURNS TABLE(date TIMESTAMP, value NUMERIC) AS $$
BEGIN
  RETURN QUERY SELECT date_trunc('month', date) AS date, SUM(amount) AS value
               FROM public.transactions
               WHERE team_id = team_id AND date BETWEEN date_from AND date_to AND amount > 0
               GROUP BY date_trunc('month', date);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_revenue(team_id UUID, date_from TIMESTAMP, date_to TIMESTAMP, currency VARCHAR) RETURNS TABLE(date TIMESTAMP, value NUMERIC) AS $$
BEGIN
  RETURN QUERY SELECT date_trunc('month', date) AS date, SUM(amount) AS value
               FROM public.transactions
               WHERE team_id = team_id AND date BETWEEN date_from AND date_to AND amount > 0
               GROUP BY date_trunc('month', date);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_runway(team_id UUID, date_from TIMESTAMP, date_to TIMESTAMP, currency VARCHAR) RETURNS NUMERIC AS $$
BEGIN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_spending(team_id UUID, date_from TIMESTAMP, date_to TIMESTAMP, currency_target VARCHAR) RETURNS TABLE(name VARCHAR, slug VARCHAR, amount NUMERIC, currency VARCHAR, color VARCHAR, percentage NUMERIC) AS $$
BEGIN
  RETURN QUERY SELECT tc.name, tc.slug, SUM(t.amount) AS amount, t.currency, tc.color, SUM(t.amount) * 100.0 / (SELECT SUM(amount) FROM public.transactions WHERE team_id = team_id AND date BETWEEN date_from AND date_to) AS percentage
               FROM public.transactions t
               JOIN public.transaction_categories tc ON t.category_slug = tc.slug AND t.team_id = tc.team_id
               WHERE t.team_id = team_id AND t.date BETWEEN date_from AND date_to
               GROUP BY tc.name, tc.slug, t.currency, tc.color;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.get_total_balance(team_id UUID, currency VARCHAR) RETURNS NUMERIC AS $$
BEGIN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.slugify(value VARCHAR) RETURNS VARCHAR AS $$
BEGIN
  RETURN LOWER(REGEXP_REPLACE(value, '\W+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.total_duration() RETURNS NUMERIC AS $$
BEGIN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.unaccent(value VARCHAR) RETURNS VARCHAR AS $$
BEGIN
  RETURN TRANSLATE(value, 'áéíóúüñ', 'aeiouun');
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.upsert_bank_connection(
  b_id UUID, b_name VARCHAR, b_institution_id VARCHAR, b_logo_url VARCHAR, b_team_id UUID,
  b_provider bank_providers, b_access_token VARCHAR, b_enrollment_id VARCHAR, b_expires_at TIMESTAMP
) RETURNS TABLE (
  access_token VARCHAR, created_at TIMESTAMP, enrollment_id VARCHAR, expires_at TIMESTAMP,
  id UUID, institution_id VARCHAR, logo_url VARCHAR, name VARCHAR, provider bank_providers, team_id UUID
) AS $$
BEGIN
  INSERT INTO public.bank_connections (id, access_token, created_at, enrollment_id, expires_at, institution_id, logo_url, name, provider, team_id)
  VALUES (b_id, b_access_token, NOW(), b_enrollment_id, b_expires_at, b_institution_id, b_logo_url, b_name, b_provider, b_team_id)
  ON CONFLICT (id) DO UPDATE
  SET access_token = EXCLUDED.access_token, enrollment_id = EXCLUDED.enrollment_id, expires_at = EXCLUDED.expires_at,
      institution_id = EXCLUDED.institution_id, logo_url = EXCLUDED.logo_url, name = EXCLUDED.name, provider = EXCLUDED.provider,
      team_id = EXCLUDED.team_id
  RETURNING access_token, created_at, enrollment_id, expires_at, id, institution_id, logo_url, name, provider, team_id;
END;
$$ LANGUAGE plpgsql;
