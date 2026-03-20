/*
  # Initial Database Setup

  1. Tables
    - `profiles` table for user profiles
    - `exchange_reservations` table for currency exchange bookings

  2. Security
    - Enable RLS on all tables
    - Create policies for users and admins
    - Set up triggers for automatic profile creation

  3. Changes
    - Add policies for CRUD operations
    - Add admin role and policies
*/

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text,
  phone text,
  role text DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS exchange_reservations (
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

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Profiles policies
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
  DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

  -- Exchange reservations policies
  DROP POLICY IF EXISTS "Users can view own reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can insert own reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can update own pending reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can delete own pending reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Admins can view all reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Admins can update all reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Admins can delete all reservations" ON exchange_reservations;
END $$;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for exchange_reservations
CREATE POLICY "Users can view own reservations"
  ON exchange_reservations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations"
  ON exchange_reservations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending reservations"
  ON exchange_reservations FOR UPDATE
  USING (
    auth.uid() = user_id AND 
    status = 'pending'
  );

CREATE POLICY "Users can delete own pending reservations"
  ON exchange_reservations FOR DELETE
  USING (
    auth.uid() = user_id AND 
    status = 'pending'
  );

-- Create admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;
END $$;

-- Admin policies
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO admin
  USING (true);

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO admin
  USING (true);

CREATE POLICY "Admins can view all reservations"
  ON exchange_reservations FOR SELECT
  TO admin
  USING (true);

CREATE POLICY "Admins can update all reservations"
  ON exchange_reservations FOR UPDATE
  TO admin
  USING (true);

CREATE POLICY "Admins can delete all reservations"
  ON exchange_reservations FOR DELETE
  TO admin
  USING (true);

-- Create or replace function for handling new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, phone)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();