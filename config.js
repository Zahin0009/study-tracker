// config.js
const SUPABASE_URL = 'https://msrkilirjgocwgvkrxgc.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmtpbGlyamdvY3dndmtyeGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MTE1MzksImV4cCI6MjA4ODE4NzUzOX0.qJFn6QoF8BnH_YQJ7AKd5fMs1JAt1delRb4iTE2Ivf4';

// Change 'const supabase' to 'const supabaseClient'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkUser() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (!data?.user) {
        if (!window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }
    return data.user;
}