import { createClient } from "@supabase/supabase-js";

function getClient() {
  const url = import.meta.env.VITE_APP_SUPABASE_URL;
  const key = import.meta.env.VITE_APP_SUPABASE_KEY;

  const supabase = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return supabase;
}

export const supa = getClient();

export async function dbSignUp(supa, email, password) {
  const { data, error } = await supa.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function dbSignIn(client, email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  // has session and user
  return data;
}

export async function dbSignOut(client) {
  const { error } = await client.auth.signOut();
  if (error) {
    throw error;
  }
  return true;
}

// TODO: check later if we need this
export async function getCurrentUser(client) {
  const { data, error } = await client.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
}
