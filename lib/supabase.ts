import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  // Fixed: Access process.env directly; window.process is not standard in browser environments.
  if (typeof process !== 'undefined' && process.env && (process.env as any)[key]) {
    return (process.env as any)[key];
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL') || 'https://omxkfsgvmgrjhbnzmfay.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || 'sb_publishable_CxTnUkhOZiFw6Hms2wb4zQ_QHvpfqdZ';

// Only create the client if we have a valid URL format to avoid internal errors
let supabaseClient;
try {
  if (supabaseUrl.startsWith('http')) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Fallback for missing/invalid config
    supabaseClient = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Auth service unconfigured' } }),
        signUp: async () => ({ error: { message: 'Auth service unconfigured' } }),
        signOut: async () => ({})
      }
    } as any;
  }
} catch (e) {
  console.warn("Supabase initialization deferred:", e);
}

export const supabase = supabaseClient;
