"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function checkAuthAction() {
  const session = cookies().get("admin_session");
  return session?.value === "true";
}

export async function loginAction(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  if (password === adminPassword) {
    cookies().set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logoutAction() {
  cookies().delete("admin_session");
  return { success: true };
}

function requireAuth() {
  const session = cookies().get("admin_session");
  if (!session || session.value !== "true") {
    throw new Error("Unauthorized");
  }
}

export async function fetchAllReviewsAction() {
  requireAuth();
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function approveReviewAction(id: number) {
  requireAuth();
  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ approved: true })
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteReviewAction(id: number) {
  requireAuth();
  const { error } = await supabaseAdmin
    .from("reviews")
    .delete()
    .eq("id", id);
    
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}
