import { createClient } from '@supabase/supabase-js';

const cleanEnv = (val?: string) => val ? val.replace(/^["']|["']$/g, '').trim() : '';
const cleanUrl = (val?: string) => {
  let url = cleanEnv(val);
  if (!url) return '';
  
  // Auto-correct if user accidentally pasted just the project ID
  if (!url.includes('.') && url.length === 20) {
    url = `${url}.supabase.co`;
  }
  
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  } else if (!url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/$/, ''); // remove trailing slash
};

export const supabaseUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) || 'https://placeholder.supabase.co';
export const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
