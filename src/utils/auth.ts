import { useAuthStore } from '../store/authStore';

export const handleGoogleSuccess = async (credentialResponse: any) => {
  try {
    // Decode the JWT token to get user information
    const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    
    // In a real application, you would:
    // 1. Send this token to your backend
    // 2. Verify the token on the server
    // 3. Create/update user in your database
    // 4. Return user data and JWT token
    
    // For now, we'll simulate a successful login
    useAuthStore.getState().login({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      role: 'worker', // Default role, should be determined by your backend
      avatar: decoded.picture,
    });
    
    return true;
  } catch (error) {
    console.error('Google authentication error:', error);
    return false;
  }
};