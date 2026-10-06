"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
// Attempt to use service role key to bypass RLS. If not provided, fallback to the anon key (though anon key will likely be blocked by RLS for updates/deletes).
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function fetchAllReviewsAction() {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function approveReviewAction(id: number) {
  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ approved: true })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteReviewAction(id: number) {
  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}
