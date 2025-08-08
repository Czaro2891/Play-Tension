import { clsx, type ClassValue } from 'clsx';

// CSS Class utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Date utilities
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const timeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Privacy and security utilities
export const anonymizeData = (data: any): any => {
  const sensitiveFields = ['email', 'phone', 'address', 'fullName', 'socialSecurityNumber'];
  
  const anonymized = { ...data };
  
  sensitiveFields.forEach(field => {
    if (anonymized[field]) {
      delete anonymized[field];
    }
  });
  
  return anonymized;
};

export const generateSecureToken = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

export const hashSensitiveData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Scoring and analytics utilities
export const calculateCompatibilityScore = (factors: { score: number; weight: number }[]): number => {
  const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
  const weightedSum = factors.reduce((sum, factor) => sum + (factor.score * factor.weight), 0);
  
  return Math.round(weightedSum / totalWeight);
};

export const normalizeScore = (score: number, min: number = 0, max: number = 100): number => {
  return Math.max(min, Math.min(max, score));
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

export const getCompatibilityLevel = (score: number): string => {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'High';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Moderate';
  if (score >= 50) return 'Fair';
  return 'Low';
};

// Text processing utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatEnumValue = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// URL and routing utilities
export const createShareableLink = (profileId: string, token?: string): string => {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/shared-profile/${profileId}`;
  return token ? `${url}?token=${token}` : url;
};

export const parseURLParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};

// Local storage utilities with encryption
export const setSecureStorage = async (key: string, value: any): Promise<void> => {
  const jsonString = JSON.stringify(value);
  const encryptedValue = await hashSensitiveData(jsonString);
  localStorage.setItem(`tension_${key}`, encryptedValue);
};

export const getSecureStorage = (key: string): any => {
  try {
    const storedValue = localStorage.getItem(`tension_${key}`);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Failed to retrieve secure storage:', error);
    return null;
  }
};

export const removeSecureStorage = (key: string): void => {
  localStorage.removeItem(`tension_${key}`);
};

// Theme utilities
export const toggleDarkMode = (): void => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('tension_theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('tension_theme', 'dark');
  }
};

export const initializeTheme = (): void => {
  const savedTheme = localStorage.getItem('tension_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
};

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// AI and token optimization utilities
export const estimateTokenCount = (text: string): number => {
  // Rough estimation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
};

export const optimizePromptLength = (prompt: string, maxTokens: number): string => {
  const estimatedTokens = estimateTokenCount(prompt);
  
  if (estimatedTokens <= maxTokens) {
    return prompt;
  }
  
  const targetLength = maxTokens * 4; // Convert back to characters
  return truncateText(prompt, targetLength);
};

export const compressConversationHistory = (messages: any[], maxTokens: number): any[] => {
  let totalTokens = 0;
  const compressed: any[] = [];
  
  // Start from the most recent messages
  for (let i = messages.length - 1; i >= 0; i--) {
    const messageTokens = estimateTokenCount(messages[i].content);
    
    if (totalTokens + messageTokens <= maxTokens) {
      compressed.unshift(messages[i]);
      totalTokens += messageTokens;
    } else {
      break;
    }
  }
  
  return compressed;
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

export const logError = (error: any, context?: string): void => {
  console.error(context ? `[${context}]` : '[Error]', error);
  
  // In production, you might want to send this to an error reporting service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error);
  }
};

// Form validation utilities
export const validateForm = (data: Record<string, any>, rules: Record<string, any>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${field} must be no more than ${rule.maxLength} characters`;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};