-- Create tables with error handling
DO $$ 
BEGIN
  -- Create profiles table
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

  -- Create exchange_reservations table
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

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error creating tables: %', SQLERRM;
END $$;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating new ones
DO $$ 
BEGIN
  -- Drop profiles policies
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can view own reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can insert own reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can update own pending reservations" ON exchange_reservations;
  DROP POLICY IF EXISTS "Users can delete own pending reservations" ON exchange_reservations;
END $$;

-- Create user policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reservations" ON exchange_reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations" ON exchange_reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending reservations" ON exchange_reservations
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can delete own pending reservations" ON exchange_reservations
  FOR DELETE USING (auth.uid() = user_id AND status = 'pending');

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