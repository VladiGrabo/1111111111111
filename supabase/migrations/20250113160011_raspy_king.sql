/*
  # Create Base Tables
  
  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - name (text)
      - phone (text)
      - role (text, default 'client')
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - exchange_reservations
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - from_amount (numeric)
      - from_currency (text)
      - to_amount (numeric)
      - to_currency (text)
      - rate (numeric)
      - exchange_date (date)
      - status (text)
      - card details (text fields)
      - timestamps
*/

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

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_reservations ENABLE ROW LEVEL SECURITY;