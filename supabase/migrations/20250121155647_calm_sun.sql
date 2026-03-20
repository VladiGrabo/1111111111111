/*
  # Database Setup with Test Data

  1. Tables
    - profiles
    - exchange_reservations
  
  2. Security
    - RLS policies for users and admins
  
  3. Test Data
    - Admin user
    - Test user
    - Sample exchange reservations
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.exchange_reservations CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create tables
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text,
  phone text,
  role text DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE public.exchange_reservations (
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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_reservations ENABLE ROW LEVEL SECURITY;

-- Create user policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reservations" ON public.exchange_reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations" ON public.exchange_reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending reservations" ON public.exchange_reservations
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can delete own pending reservations" ON public.exchange_reservations
  FOR DELETE USING (auth.uid() = user_id AND status = 'pending');

-- Create admin role
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;
END $$;

-- Create admin policies
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

-- Create trigger function
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

-- Set up trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert test data
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@example.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"name": "Admin User", "phone": "+447123456789"}'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (
  user_id,
  name,
  phone,
  role
)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Admin User',
  '+447123456789',
  'admin'
)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
)
VALUES (
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'user@example.com',
  crypt('user123', gen_salt('bf')),
  now(),
  '{"name": "Test User", "phone": "+447987654321"}'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (
  user_id,
  name,
  phone,
  role
)
VALUES (
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'Test User',
  '+447987654321',
  'client'
)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.exchange_reservations (
  user_id,
  from_amount,
  from_currency,
  to_amount,
  to_currency,
  rate,
  exchange_date,
  status,
  card_number,
  card_holder,
  expiry_date,
  bank_name
)
VALUES
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  5000.00,
  'USDT',
  4350.00,
  'EUR',
  0.87,
  CURRENT_DATE + INTERVAL '2 days',
  'pending',
  '4111 1111 1111 1111',
  'Test User',
  '12/25',
  'Deutsche Bank'
),
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  3000.00,
  'USDT',
  2610.00,
  'EUR',
  0.87,
  CURRENT_DATE - INTERVAL '2 days',
  'completed',
  '4111 1111 1111 1111',
  'Test User',
  '12/25',
  'Deutsche Bank'
);