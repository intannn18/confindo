/**
 * CONFindo - Supabase Configuration & Guide
 * Relational PostgreSQL Backend Integration
 */

const SUPABASE_CONFIG = {
  url: window.ENV_SUPABASE_URL || 'https://ybswbcurrxehcafvcrdx.supabase.co',
  anonKey: window.ENV_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlic3diY3VycnhlaGNhZnZjcmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNjU1NjQsImV4cCI6MjEwODc0MTU2NH0.JApEVIa0Gx1owGp-g8XVCSD6GdzVpHcaMlPav0mMo-Q',
  
  // Flag aktif jika kredensial sudah diisi nyata
  isConfigured: function() {
    return Boolean(this.url && !this.url.includes('your-project-id') && this.anonKey && !this.anonKey.includes('your-anon-public-key'));
  }
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;

// Petunjuk inisialisasi Supabase JS Client jika SDK disertakan
let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_CONFIG.isConfigured()) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('[CONFindo] Supabase Client Initialized Successfully 🚀');
  } catch (err) {
    console.warn('[CONFindo] Supabase initialization skipped:', err);
  }
}
