/*
  # Add Initial Seed Data

  1. Data
    - Insert test admin user
    - Insert sample exchange reservations
    - Insert sample user profiles

  2. Notes
    - All data is for testing purposes only
    - Uses secure password hashing
    - Maintains referential integrity
*/

-- Insert test admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  raw_user_meta_data
)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@example.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  'authenticated',
  '{"name": "Admin User", "phone": "+447123456789"}'
)
ON CONFLICT (id) DO NOTHING;

-- Insert admin profile
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

-- Insert test user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  raw_user_meta_data
)
VALUES (
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'user@example.com',
  crypt('user123', gen_salt('bf')),
  now(),
  'authenticated',
  '{"name": "Test User", "phone": "+447987654321"}'
)
ON CONFLICT (id) DO NOTHING;

-- Insert user profile
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

-- Insert sample exchange reservations
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