import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://aavzeakhygwgiapupllm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhdnplYWtoeWd3Z2lhcHVwbGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTM0OTQsImV4cCI6MjA3MjcyOTQ5NH0.i3Wlq2cdsuiTRYMTepmSIOmzkwdpW00MWltjb95eexs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
