import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id: string;
  role: 'peleador' | 'arbitro' | 'entrenador' | 'club' | 'federacion';
  name: string;
  email: string;
  phone: string;
  organization?: string;
  city: string;
  country: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  capacity: number;
  gallery: string[];
  highlights: string[];
  status: 'realizado' | 'pronto';
  created_at: string;
};

export type Partner = {
  id: string;
  name: string;
  type: 'club' | 'federacion' | 'partner';
  city: string;
  logo_url: string;
  website?: string;
  featured: boolean;
  created_at: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  file_url: string;
  created_at: string;
};

export type Product = {
  sku: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  published: boolean;
  created_at: string;
};

export type BoxingTopic = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  gradient: string;
  order_index: number;
  published: boolean;
  created_at: string;
};

export type ServiceRole = {
  id: string;
  role_key: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  active: boolean;
  created_at: string;
};
