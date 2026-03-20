/*
  # Initial Database Schema

  1. Tables
    - profiles
      - User profile information
      - Links to auth.users
      - Stores name, phone, role
    - exchange_reservations
      - Currency exchange reservations
      - Links to auth.users
      - Stores exchange details and payment info

  2. Security
    - RLS enabled on all tables
    - User policies for own data access
    - Admin policies for full access
    - Secure trigger for new user registration
*/

-- Create tables with error handling
DO $$ 
BEGIN
  -- Create profiles table
  CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    name text,
    phone text,
    role text DEFAULT 'client',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
  );

  -- Create exchange_reservations table
  CREATE TABLE IF NOT EXISTS public.exchange_reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    from_amount numeric NOT NULL,
    from_currency text NOT NULL,
    to_amount numeric NOT NULL,
    to_currency text NOT NULL,
    rate numeric NOT NULL,
    exchange_date date NOT NULL,
    status text NOT NULL,
    card_number text NOT NULL,
    card_holder text NOT NULL,
    expiry_date text NOT NULL,
    bank_name text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error creating tables: %', SQLERRM;
END $$;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_reservations ENABLE ROW LEVEL SECURITY;

-- Create user policies
DO $$ 
BEGIN
  -- Profiles policies
  CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

  CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

  -- Exchange reservations policies
  CREATE POLICY "Users can view own reservations" ON public.exchange_reservations
    FOR SELECT USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert own reservations" ON public.exchange_reservations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update own pending reservations" ON public.exchange_reservations
    FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

  CREATE POLICY "Users can delete own pending reservations" ON public.exchange_reservations
    FOR DELETE USING (auth.uid() = user_id AND status = 'pending');

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error creating user policies: %', SQLERRM;
END $$;

-- Create admin role and policies
DO $$ 
BEGIN
  -- Create admin role if not exists
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;

  -- Admin policies
  CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT TO admin USING (true);

  CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE TO admin USING (true);

  CREATE POLICY "Admins can view all reservations" ON public.exchange_reservations
    FOR SELECT TO admin USING (true);

  CREATE POLICY "Admins can update all reservations" ON public.exchange_reservations
    FOR UPDATE TO admin USING (true);

  CREATE POLICY "Admins can delete all reservations" ON public.exchange_reservations
    FOR DELETE TO admin USING (true);

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error creating admin policies: %', SQLERRM;
END $$;

-- Create trigger function for new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, phone)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', '')
  );
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
  RETURN new;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();