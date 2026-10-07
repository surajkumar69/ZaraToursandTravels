"use server";

import { createClient } from "@supabase/supabase-js";

// Ensure URL format is correct
const cleanEnv = (val?: string) => val ? val.replace(/^["']|["']$/g, '').trim() : '';
const cleanUrl = (val?: string) => {
  let url = cleanEnv(val);
  if (!url) return '';
  if (!url.includes('.') && url.length === 20) {
    url = `${url}.supabase.co`;
  }
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  } else if (!url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/$/, '');
};

const supabaseUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) || "https://placeholder.supabase.co";
const supabaseServiceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) || "placeholder-key";

// Create an admin client using the service role key to securely bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function submitReviewAction(name: string, rating: number, reviewText: string) {
  // Use the admin client to insert the review with approved: true, bypassing the RLS restriction
  const { error } = await supabaseAdmin
    .from("reviews")
    .insert([{ 
      name, 
      rating, 
      review: reviewText, 
      approved: true, 
      created_at: new Date().toISOString() 
    }]);

  if (error) {
    throw new Error(error.message);
  }
  
  return { success: true };
}
