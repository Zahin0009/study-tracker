// Replace with YOUR values from Supabase Settings > API
const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_KEY = 'your-anon-public-key';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper to check if user is logged in
async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
    return data.user;
}