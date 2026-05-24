"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// use this in Client Components that need Supabase access
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
