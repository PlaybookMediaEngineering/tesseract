/**
 * This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
 */

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    id, 
    avatar_url, 
    created_at, 
    email, 
    full_name, 
    locale, 
    team_id, 
    week_starts_on_monday
  )
  VALUES (
    NEW.id, 
    new.raw_user_meta_data ->> 'avatar_url', 
    NOW(), 
    NEW.email, 
    new.raw_user_meta_data ->> 'full_name', 
    'en', 
    NULL, 
    TRUE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();