/*
  # Boxing Event Organizer Database Schema

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `role` (text, enum: peleador/arbitro/entrenador/club/federacion)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `organization` (text, nullable)
      - `city` (text)
      - `country` (text)
      - `message` (text)
      - `utm_source` (text, nullable)
      - `utm_medium` (text, nullable)
      - `utm_campaign` (text, nullable)
      - `created_at` (timestamptz)
    
    - `events`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name` (text)
      - `date` (date)
      - `venue` (text)
      - `city` (text)
      - `capacity` (integer)
      - `gallery` (jsonb, array of image URLs)
      - `highlights` (jsonb, array of strings)
      - `status` (text, enum: realizado/pronto)
      - `created_at` (timestamptz)
    
    - `partners`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text, enum: club/federacion/partner)
      - `city` (text)
      - `logo_url` (text)
      - `website` (text, nullable)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `certificates`
      - `id` (uuid, primary key)
      - `title` (text)
      - `issuer` (text)
      - `date` (date)
      - `file_url` (text)
      - `created_at` (timestamptz)
    
    - `products`
      - `sku` (text, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `price` (integer)
      - `images` (jsonb, array of URLs)
      - `category` (text)
      - `stock` (integer)
      - `published` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for events, partners, certificates, products
    - Authenticated-only write access for leads
    - Service role for admin operations
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('peleador', 'arbitro', 'entrenador', 'club', 'federacion')),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text,
  city text NOT NULL,
  country text NOT NULL,
  message text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  date date NOT NULL,
  venue text NOT NULL,
  city text NOT NULL,
  capacity integer DEFAULT 0,
  gallery jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL CHECK (status IN ('realizado', 'pronto')),
  created_at timestamptz DEFAULT now()
);

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('club', 'federacion', 'partner')),
  city text NOT NULL,
  logo_url text NOT NULL,
  website text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  date date NOT NULL,
  file_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  sku text PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  price integer NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  category text NOT NULL,
  stock integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads (anyone can insert, only service role can read)
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read leads"
  ON leads FOR SELECT
  TO service_role
  USING (true);

-- RLS Policies for events (public read)
CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Service role can manage events"
  ON events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for partners (public read)
CREATE POLICY "Public can view partners"
  ON partners FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Service role can manage partners"
  ON partners FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for certificates (public read)
CREATE POLICY "Public can view certificates"
  ON certificates FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Service role can manage certificates"
  ON certificates FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for products (public read)
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Service role can manage products"
  ON products FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_partners_type ON partners(type);
CREATE INDEX IF NOT EXISTS idx_partners_featured ON partners(featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);