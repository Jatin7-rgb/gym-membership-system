// Authentication and general utilities

function checkAuthToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return false;
  }
  return token;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('user');
  window.location.href = '/';
}

function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

async function validateToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Redirect to login if token is invalid
window.addEventListener('load', async () => {
  const path = window.location.pathname;
  if (path.includes('dashboard') || path.includes('questionnaire') || path.includes('membership')) {
    const isValid = await validateToken();
    if (!isValid) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
});
