-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function with better error handling and logging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _name text;
  _phone text;
BEGIN
  -- Extract and validate metadata
  _name := COALESCE(
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1),
    'New User'
  );
  
  _phone := COALESCE(
    new.raw_user_meta_data->>'phone',
    ''
  );

  -- Insert profile with detailed error handling
  BEGIN
    INSERT INTO public.profiles (
      user_id,
      name,
      phone,
      role,
      created_at,
      updated_at
    ) VALUES (
      new.id,
      _name,
      _phone,
      'client',
      now(),
      now()
    );
    
    RAISE LOG 'Profile created successfully for user % with name %', new.id, _name;
  EXCEPTION 
    WHEN unique_violation THEN
      RAISE WARNING 'Profile already exists for user %', new.id;
    WHEN OTHERS THEN
      RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
  END;

  -- Insert user settings
  BEGIN
    INSERT INTO public.users_settings (
      user_id,
      notification_preferences,
      created_at,
      updated_at
    ) VALUES (
      new.id,
      '{"email": true, "sms": false}'::jsonb,
      now(),
      now()
    );
    
    RAISE LOG 'Settings created successfully for user %', new.id;
  EXCEPTION 
    WHEN unique_violation THEN
      RAISE WARNING 'Settings already exist for user %', new.id;
    WHEN OTHERS THEN
      RAISE WARNING 'Failed to create settings for user %: %', new.id, SQLERRM;
  END;

  RETURN new;
END;
$$;

-- Recreate trigger with AFTER INSERT
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_settings ENABLE ROW LEVEL SECURITY;

-- Ensure policies exist
DO $$
BEGIN
  -- For profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile" ON profiles
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" ON profiles
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  -- For users_settings
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users_settings' AND policyname = 'Users can view own settings'
  ) THEN
    CREATE POLICY "Users can view own settings" ON users_settings
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users_settings' AND policyname = 'Users can update own settings'
  ) THEN
    CREATE POLICY "Users can update own settings" ON users_settings
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END
$$;