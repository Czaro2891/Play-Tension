// src/types/api.ts
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    }
    
    export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
    }
    
    export interface User {
    id: string;
    email: string;
    username: string;
    profileCompleted: boolean;
    createdAt: string;
    lastActive: string;
    }
    
    export interface UserProfile {
    id: string;
    userId: string;
    age?: number;
    gender?: string;
    sexualOrientation?: string;
    relationshipStatus?: string;
    swingingExperience?: string;
    boundaries?: any;
    interests?: any;
    personalityArchetype?: string;
    communicationStyle?: string;
    isAnonymous: boolean;
    privacyLevel: 'minimal' | 'balanced' | 'maximum';
    }
    
    export interface Assessment {
    id: string;
    userId: string;
    type: string;
    questions: any;
    answers: any;
    results?: any;
    completedAt?: string;
    createdAt: string;
    }
    
    // Error types
    export interface ApiError {
    message: string;
    code?: string;
    details?: any;
    }