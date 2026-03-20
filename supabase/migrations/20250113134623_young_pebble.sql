/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `exchange_reservations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `from_amount` (numeric)
      - `from_currency` (text)
      - `to_amount` (numeric)
      - `to_currency` (text)
      - `rate` (numeric)
      - `exchange_date` (date)
      - `status` (text)
      - `card_number` (text)
      - `card_holder` (text)
      - `expiry_date` (text)
      - `bank_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users and admins
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create exchange_reservations table
CREATE TABLE exchange_reservations (
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

-- Create admin role
CREATE ROLE admin;

-- Admin policies for profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO admin
  USING (true);

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO admin
  USING (true);

-- Admin policies for exchange_reservations
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

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();