/*
  # Create Boxing Topics and Roles Tables

  1. New Tables
    - `boxing_topics`
      - `id` (uuid, primary key)
      - `title` (text) - Topic title
      - `description` (text) - Full description
      - `icon` (text) - Lucide icon name
      - `image_url` (text) - Pexels image URL
      - `gradient` (text) - Tailwind gradient classes
      - `order_index` (integer) - Display order
      - `published` (boolean) - Visibility flag
      - `created_at` (timestamptz)
    
    - `service_roles`
      - `id` (uuid, primary key)
      - `role_key` (text, unique) - Key for code reference
      - `title` (text) - Display title
      - `description` (text) - Role description
      - `icon` (text) - Lucide icon name
      - `order_index` (integer) - Display order
      - `active` (boolean) - Availability flag
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - No write access for public users
*/

-- Create boxing_topics table
CREATE TABLE IF NOT EXISTS boxing_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  image_url text NOT NULL,
  gradient text NOT NULL,
  order_index integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create service_roles table
CREATE TABLE IF NOT EXISTS service_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  order_index integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE boxing_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_roles ENABLE ROW LEVEL SECURITY;

-- Policies for boxing_topics
CREATE POLICY "Anyone can view published boxing topics"
  ON boxing_topics
  FOR SELECT
  USING (published = true);

-- Policies for service_roles
CREATE POLICY "Anyone can view active service roles"
  ON service_roles
  FOR SELECT
  USING (active = true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_boxing_topics_order ON boxing_topics(order_index, published);
CREATE INDEX IF NOT EXISTS idx_service_roles_order ON service_roles(order_index, active);
