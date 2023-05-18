import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://jlkjygdllpgjekvnkdsa.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa2p5Z2RsbHBnamVrdm5rZHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MDA2ODEsImV4cCI6MTk5OTk3NjY4MX0.I_BGKVQ0LgeHgdHxnQRQR_YI05MA7bkDudBgBzSGQCE'
export const supabase = createClient(supabaseUrl, supabaseKey)