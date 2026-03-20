/*
  # Initial Schema Setup

  1. New Tables
    - `users_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `notification_preferences` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS users_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  notification_preferences jsonb DEFAULT '{"email": true, "sms": false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE users_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON users_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON users_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON users_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);