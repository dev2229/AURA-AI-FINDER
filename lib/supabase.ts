
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase - using provided credentials
const supabaseUrl = (process.env as any).SUPABASE_URL || 'https://omxkfsgvmgrjhbnzmfay.supabase.co';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || 'sb_publishable_CxTnUkhOZiFw6Hms2wb4zQ_QHvpfqdZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
