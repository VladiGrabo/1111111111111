-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.exchange_reservations CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table with proper constraints
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'client',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create exchange_reservations table with proper constraints
CREATE TABLE public.exchange_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  from_amount numeric NOT NULL CHECK (from_amount > 0),
  from_currency text NOT NULL,
  to_amount numeric NOT NULL CHECK (to_amount > 0),
  to_currency text NOT NULL,
  rate numeric NOT NULL CHECK (rate > 0),
  exchange_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  card_number text NOT NULL,
  card_holder text NOT NULL,
  expiry_date text NOT NULL,
  bank_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
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

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
    COALESCE(new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    'client',
    now(),
    now()
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_exchange_reservations_user_id ON public.exchange_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_exchange_reservations_status ON public.exchange_reservations(status);

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