import { createClient } from '@supabase/supabase-js';

const cleanEnv = (val?: string) => val ? val.replace(/^["']|["']$/g, '').trim() : '';

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) || 'https://placeholder.supabase.co';
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
