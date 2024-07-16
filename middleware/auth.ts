// middleware/auth.ts



export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = localStorage.getItem('token')

  // If no token found and trying to access a protected route, redirect to login page
  if (!token && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Example: Check if token is expired or invalid
  // Replace with actual logic to verify token validity using your API or JWT library
  if (token && tokenInvalidOrExpired(token)) {
    // Clear invalid token from localStorage and redirect to login
    localStorage.removeItem('token')
    return navigateTo('/login')
  }
})

// Example function to simulate token validation
function tokenInvalidOrExpired(token: string | null): boolean {
  if (!token) return true; // No token is considered invalid/expired for this example
  // Replace this with actual logic to verify JWT token validity (e.g., decoding and expiration check)
  return false; // Return true if token is invalid/expired
}
