// src/services/authService.js
import api, { getCsrfToken } from "../../api/axiosInstance";
import Cookies from "js-cookie";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      // Get CSRF token first (required for Sanctum SPA auth)
      await getCsrfToken();
      
      const response = await api.post('/auth/login', credentials);
      
      if (response.status === 200 || response.status === 201) {
        const { user, access_token } = response.data.data;
        
        // Store token in cookie
        if (access_token) {
          Cookies.set('access_token', access_token, { 
            expires: 1, // 1 day
            secure: window.location.protocol === 'https:',
            sameSite: 'strict'
          });
        }
        
        return {
          success: true,
          data: { user, access_token },
          message: response.data.message || "Login successful"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again."
      };
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all tokens regardless of API response
      this.clearTokens();
    }
  },

  // Check if user is authenticated
  async checkAuth() {
    try {
      await getCsrfToken();
      const response = await api.get("/auth/me");
      
      if (response.status === 200) {
        return {
          success: true,
          user: response.data.data.user
        };
      }
    } catch (error) {
      // If auth check fails, clear any stale tokens
      this.clearTokens();
      return {
        success: false,
        error: error.response?.data?.message || "Authentication failed"
      };
    }
  },

  // Clear all tokens
  clearTokens() {
    Cookies.remove('access_token');
    Cookies.remove('laravel_session');
    Cookies.remove('XSRF-TOKEN');
  },

  // Get access token
  getAccessToken() {
    return Cookies.get('access_token');
  },

  // Check if user has valid token
  isAuthenticated() {
    return !!this.getAccessToken();
  }
};
