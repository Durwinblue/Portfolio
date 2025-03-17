import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bioybyhhwqhkwbmqdaqm.supabase.co";  // 🔹 Replace with your actual Supabase Project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpb3lieWhod3Foa3dibXFkYXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDg0ODgsImV4cCI6MjA1NzcyNDQ4OH0.SvWjGESGVjwm9_pEN7WSWRVAnSdzkeMIktndHxgKVlk";  // 🔹 Replace with your Supabase Public API Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
