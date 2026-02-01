import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL') || 'https://omxkfsgvmgrjhbnzmfay.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || 'sb_publishable_CxTnUkhOZiFw6Hms2wb4zQ_QHvpfqdZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);