import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qfpcpjpzdxyrlrdfcchx.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcGNwanB6ZHh5cmxyZGZjY2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MjY2NTMsImV4cCI6MjAxNDQwMjY1M30.GVi4Slo0cdJQsqMT_QgqGx4ImR7fRJjn9vmKwDQ2w2c';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
