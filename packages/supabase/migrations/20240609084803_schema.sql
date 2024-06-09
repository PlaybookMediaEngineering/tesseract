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
  bc.name AS decrypted_name
FROM
  public.bank_connections bc
LEFT JOIN
  public.teams t ON bc.team_id = t.id;

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
  dbc.decrypted_name
FROM
  public.bank_accounts ba
LEFT JOIN
  public.decrypted_bank_connections dbc ON ba.bank_connection_id = dbc.id
LEFT JOIN
  public.bank_connections bc ON ba.bank_connection_id = bc.id
LEFT JOIN
  public.users u ON ba.created_by = u.id
LEFT JOIN
  public.teams t ON ba.team_id = t.id;