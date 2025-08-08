import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';
import { httpPost, httpGet } from '../services/http';
import { LoginResponse, ApiResponse } from '../types/api';

type AuthState = {
  isAuthenticated: boolean;
  user: any | null;
  profile: any | null;
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUserData: (user: User, profile: UserProfile) => void;
  clearUserData: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const ACCESS_KEY = "tension_access";
const REFRESH_KEY = "tension_refresh";

function persistTokens(access?: string | null, refresh?: string | null) {
  if (access) localStorage.setItem(ACCESS_KEY, access); else localStorage.removeItem(ACCESS_KEY);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh); else localStorage.removeItem(REFRESH_KEY);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    profile: null,
    accessToken: null,
    refreshToken: null,
  });

  // Load tokens and validate on app start
  useEffect(() => {
    const at = localStorage.getItem(ACCESS_KEY);
    const rt = localStorage.getItem(REFRESH_KEY);
    if (at) {
      // Validate token
      httpGet<ApiResponse<{ valid: boolean }>>('/api/auth/validate', at)
        .then(response => {
          if (response.success && response.data?.valid) {
            setState(s => ({ ...s, isAuthenticated: true, accessToken: at, refreshToken: rt }));
          } else if (rt) {
            // Try to refresh token
            httpPost<ApiResponse<{ accessToken: string; refreshToken: string }>>('/api/auth/refresh', { refreshToken: rt })
              .then(refreshResponse => {
                if (refreshResponse.success && refreshResponse.data) {
                  const { accessToken } = refreshResponse.data;
                  persistTokens(accessToken, rt);
                  setState(s => ({ ...s, isAuthenticated: true, accessToken }));
                } else {
                  logout();
                }
              })
              .catch(() => logout());
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await httpPost<ApiResponse<LoginResponse>>('/api/auth/login', {
        email,
        password
      });
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        persistTokens(token, refreshToken);
        setState({ 
          isAuthenticated: true, 
          user, 
          profile: null, 
          accessToken: token, 
          refreshToken 
        });
        return { success: true };
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      const response = await httpPost<ApiResponse<LoginResponse>>('/api/auth/register', {
        email,
        username,
        password
      });
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;
        persistTokens(token, refreshToken);
        setState({ 
          isAuthenticated: true, 
          user, 
          profile: null, 
          accessToken: token, 
          refreshToken 
        });
        return { success: true };
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  const logout = () => {
    persistTokens(null, null);
    setState({ isAuthenticated: false, user: null, profile: null, accessToken: null, refreshToken: null });
  };

  const setUserData = (userData: User, profileData: UserProfile) => {
    setState(s => ({ ...s, user: userData, profile: profileData, isAuthenticated: true }));
  };

  const clearUserData = logout;

  const updateProfile = (profileData: Partial<UserProfile>) => {
    if (state.profile) {
      const updatedProfile = { ...state.profile, ...profileData };
      setState(s => ({ ...s, profile: updatedProfile }));
    }
  };

  const value: AuthContextType = {
    user: state.user,
    profile: state.profile,
    isAuthenticated: state.isAuthenticated,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    login,
    register,
    logout,
    setUserData,
    clearUserData,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};