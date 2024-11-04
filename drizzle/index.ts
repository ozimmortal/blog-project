
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema';
// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Initialize Drizzle ORM with Supabase client
export const db = drizzle(process.env.DATABASE_URL!,{schema:schema});


