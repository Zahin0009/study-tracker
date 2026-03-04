
// 1. SUPABASE CONFIGURATION
const SUPABASE_URL = "https://msrkilirjgocwgvkrxgc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmtpbGlyamdvY3dndmtyeGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MTE1MzksImV4cCI6MjA4ODE4NzUzOX0.qJFn6QoF8BnH_YQJ7AKd5fMs1JAt1delRb4iTE2Ivf4";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. THEME ENGINE (Runs immediately to prevent flicker)
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') document.documentElement.classList.add('dark-mode-init'); 
    // We apply class to body once DOM is ready
    window.addEventListener('DOMContentLoaded', () => {
        if (savedTheme === 'dark') document.body.classList.add('dark');
        updateThemeIcon(savedTheme === 'dark');
    });
})();

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.innerHTML = isDark ? 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
}

// 3. GLOBAL UTILITIES
async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

async function loadNavAvatar() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;
    const { data } = await supabaseClient.from('study_progress').select('avatar_url').eq('user_id', user.id).maybeSingle();
    if (data?.avatar_url) {
        const avatars = document.querySelectorAll('#navAvatar');
        avatars.forEach(img => img.src = data.avatar_url);
    }
}