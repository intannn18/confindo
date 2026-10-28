/**
 * CONFindo - Supabase Configuration & Guide
 * Relational PostgreSQL Backend Integration
 */

const SUPABASE_CONFIG = {
  // Masukkan Supabase Project URL & Anon Public Key jika ingin menghubungkan ke cloud Supabase
  url: window.ENV_SUPABASE_URL || 'https://your-project-id.supabase.co',
  anonKey: window.ENV_SUPABASE_ANON_KEY || 'your-anon-public-key',
  
  // Flag aktif jika kredensial sudah diisi nyata
  isConfigured: function() {
    return this.url && !this.url.includes('your-project-id') && this.anonKey && !this.anonKey.includes('your-anon-public-key');
  }
};

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
