import { createClient } from '@supabase/supabase-js';

// Public anon key is safe to include in the frontend
const supabaseUrl = 'https://gqtvshliaqmthjciuodp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdHZzaGxpYXFtdGhqY2l1b2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4ODc5MjEsImV4cCI6MjA3MDQ2MzkyMX0.XM7KK13ZRNN3R25DP71BCR8X5Gh-WDZ2yjemWDBB9tg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
