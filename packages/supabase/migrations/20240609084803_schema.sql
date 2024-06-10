-- Drop the tables that should be views
DROP VIEW IF EXISTS public.decrypted_bank_accounts CASCADE;
DROP VIEW IF EXISTS public.decrypted_bank_connections CASCADE;
DROP VIEW IF EXISTS public.decrypted_transaction_enrichments CASCADE;
DROP VIEW IF EXISTS public.decrypted_transactions CASCADE;

CREATE VIEW public.decrypted_bank_connections AS
SELECT
  bc.access_token,
  bc.created_at,
  bc.enrollment_id,
  bc.expires_at,
  bc.id,
  bc.institution_id,
  bc.logo_url,
  bc.name,
  bc.provider,
  bc.team_id,
  CASE
    WHEN bc.name IS NULL THEN NULL::text
    ELSE
      CASE
        WHEN bc.name IS NULL THEN NULL::text
        ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(bc.name, 'base64'::text), convert_to(''::text, 'utf8'::name), 'e11e1140-67b0-4230-968b-4293b6b23162', NULL::bytea), 'utf8'::name)
      END
  END AS decrypted_name
FROM
  public.bank_connections bc;

CREATE VIEW public.decrypted_bank_accounts AS
SELECT
  ba.account_id,
  ba.balance,
  ba.bank_connection_id,
  ba.created_at,
  ba.created_by,
  ba.currency,
  ba.enabled,
  ba.id,
  ba.last_accessed,
  ba.name,
  ba.team_id,
  CASE
    WHEN ba.name IS NULL THEN NULL::text
    ELSE
      CASE
        WHEN ba.name IS NULL THEN NULL::text
        ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(ba.name, 'base64'::text), convert_to(''::text, 'utf8'::name), 'e11e1140-67b0-4230-968b-4293b6b23162', NULL::bytea), 'utf8'::name)
      END
  END AS decrypted_name
FROM
  public.bank_accounts ba;

CREATE VIEW public.decrypted_transaction_enrichments AS
SELECT
  er.id,
  er.category_slug,
  er.created_at,
  er.name,
  er.system,
  er.team_id,
  CASE
    WHEN er.name IS NULL THEN NULL::text
    ELSE
      CASE
        WHEN er.name IS NULL THEN NULL::text
        ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(er.name, 'base64'::text), convert_to(''::text, 'utf8'::name), 'e11e1140-67b0-4230-968b-4293b6b23162', NULL::bytea), 'utf8'::name)
      END
  END AS decrypted_name
FROM
  public.transaction_enrichments er;


CREATE VIEW public.decrypted_transactions AS
SELECT
  tr.id,
  tr.amount,
  tr.assigned_id,
  tr.balance,
  tr.bank_account_id,
  tr.category,
  tr.category_slug,
  tr.currency,
  tr.currency_rate,
  tr.currency_source,
  tr.created_at,
  tr.date,
  tr.description,
  tr.internal_id,
  tr.manual,
  tr.method,
  tr.name,
  tr.note,
  tr.status,
  tr.team_id,
  CASE
    WHEN tr.name IS NULL THEN NULL::text
    ELSE
      CASE
        WHEN tr.name IS NULL THEN NULL::text
        ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(tr.name, 'base64'::text), convert_to(''::text, 'utf8'::name), 'e11e1140-67b0-4230-968b-4293b6b23162', NULL::bytea), 'utf8'::name)
      END
  END AS decrypted_name,
  CASE
    WHEN tr.description IS NULL THEN NULL::text
    ELSE
      CASE
        WHEN tr.description IS NULL THEN NULL::text
        ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(tr.description, 'base64'::text), convert_to(''::text, 'utf8'::name), 'e11e1140-67b0-4230-968b-4293b6b23162', NULL::bytea), 'utf8'::name)
      END
  END AS decrypted_description
FROM
  public.transactions tr