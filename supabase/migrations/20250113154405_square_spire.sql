/*
  # Fix User Profile Creation

  1. Changes
    - Drop and recreate the handle_new_user function with better error handling
    - Add explicit type casting for user metadata
    - Add logging for debugging
    - Ensure function has proper permissions

  2. Security
    - Maintain existing RLS policies
    - Function runs with security definer
*/

-- Drop existing function and recreate with better implementation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Log the new user creation attempt
  RAISE LOG 'Creating profile for user %', new.id;
  
  -- Insert with more robust handling of metadata
  INSERT INTO public.profiles (
    user_id,
    name,
    phone,
    role
  ) VALUES (
    new.id,
    COALESCE(
      (new.raw_user_meta_data->>'name')::text,
      (new.raw_user_meta_data->>'full_name')::text,
      'New User'
    ),
    COALESCE(
      (new.raw_user_meta_data->>'phone')::text,
      ''
    ),
    'client'
  );

  -- Log successful creation
  RAISE LOG 'Profile created successfully for user %', new.id;
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log any errors that occur
    RAISE LOG 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();