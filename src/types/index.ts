// Core User Types
export interface User {
  id: string;
  email: string;
  username: string;
  profileCompleted: boolean;
  partnerId?: string;
  createdAt: Date;
  lastActive: Date;
}

export interface UserProfile {
  userId: string;
  age?: number;
  gender?: Gender;
  sexualOrientation?: SexualOrientation;
  relationshipStatus?: RelationshipStatus;
  swingingExperience?: SwingingExperience;
  boundaries: string[];
  interests: string[];
  personalityArchetype?: PersonalityArchetype;
  communicationStyle?: CommunicationStyle;
  isAnonymous: boolean;
}

// Enums
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say'
}

export enum SexualOrientation {
  HETEROSEXUAL = 'heterosexual',
  HOMOSEXUAL = 'homosexual',
  BISEXUAL = 'bisexual',
  PANSEXUAL = 'pansexual',
  QUEER = 'queer',
  OTHER = 'other'
}

export enum RelationshipStatus {
  SINGLE = 'single',
  COMMITTED = 'committed',
  MARRIED = 'married',
  OPEN_RELATIONSHIP = 'open-relationship',
  POLYAMOROUS = 'polyamorous',
  COMPLICATED = 'complicated'
}

export enum SwingingExperience {
  CURIOUS = 'curious',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERIENCED = 'experienced',
  EXPERT = 'expert'
}

export enum PersonalityArchetype {
  EXPLORER = 'explorer',
  GUARDIAN = 'guardian',
  HEDONIST = 'hedonist',
  ROMANTIC = 'romantic',
  DOMINANT = 'dominant',
  SUBMISSIVE = 'submissive',
  SWITCH = 'switch',
  VOYEUR = 'voyeur',
  EXHIBITIONIST = 'exhibitionist'
}

export enum CommunicationStyle {
  DIRECT = 'direct',
  GENTLE = 'gentle',
  PLAYFUL = 'playful',
  INTELLECTUAL = 'intellectual',
  EMOTIONAL = 'emotional',
  MYSTERIOUS = 'mysterious'
}

// Psychological Assessment Types
export interface Question {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  text: string;
  options?: QuestionOption[];
  metadata?: Record<string, any>;
  followUpQuestions?: string[];
  scoringWeights?: Record<string, number>;
  phase?: string;
  weight?: number;
  required?: boolean;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  SCALE = 'scale',
  TEXT = 'text',
  BINARY = 'binary',
  RANKING = 'ranking',
  SCENARIO = 'scenario',
  IMAGE_CHOICE = 'image-choice',
  SLIDER_RANGE = 'slider-range',
  MATRIX = 'matrix',
  CARD_SORT = 'card-sort',
  EMOTION_WHEEL = 'emotion-wheel',
  TIMELINE = 'timeline',
  WORD_ASSOCIATION = 'word-association',
  ROLE_PLAY = 'role-play'
}

export enum QuestionCategory {
  PERSONALITY = 'personality',
  SEXUAL_PREFERENCES = 'sexual-preferences',
  EMOTIONAL_INTELLIGENCE = 'emotional-intelligence',
  COMMUNICATION = 'communication',
  BOUNDARIES = 'boundaries',
  FANTASY = 'fantasy',
  RELATIONSHIP_STYLE = 'relationship-style',
  CONFLICT_RESOLUTION = 'conflict-resolution',
  PSYCHOLOGICAL_TRIGGERS = 'psychological-triggers',
  INTIMACY_PATTERNS = 'intimacy-patterns',
  POWER_DYNAMICS = 'power-dynamics',
  ATTACHMENT_STYLE = 'attachment-style',
  SEXUAL_PSYCHOLOGY = 'sexual-psychology',
  BEHAVIORAL_PATTERNS = 'behavioral-patterns',
  SUBCONSCIOUS_DESIRES = 'subconscious-desires',
  RELATIONSHIP_TRAUMA = 'relationship-trauma'
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number | string;
  metadata?: Record<string, any>;
}

export interface Answer {
  questionId: string;
  userId: string;
  value: any;
  timestamp: Date;
  confidence?: number;
  timeSpent?: number;
  emotionalState?: EmotionalState;
  behavioralMarkers?: BehavioralMarkers;
  inconsistencyFlags?: string[];
  followUpTriggered?: boolean;
}

export interface EmotionalState {
  arousal: number; // 0-100
  valence: number; // -100 to 100 (negative to positive)
  dominance: number; // 0-100
  confidence: number; // 0-100
  detected_emotions: string[];
}

export interface BehavioralMarkers {
  responseTime: number;
  hesitation: boolean;
  changeCount: number; // how many times user changed answer
  skipAttempts: number;
  confidencePattern: number[];
  textAnalysis?: {
    wordCount: number;
    emotionalTone: string;
    defensiveness: number;
    authenticity: number;
  };
}

// AI Analysis Types
export interface PsychologicalProfile {
  userId: string;
  personalityTraits: PersonalityTrait[];
  emotionalPatterns: EmotionalPattern[];
  sexualProfile: SexualProfile;
  communicationProfile: CommunicationProfile;
  compatibilityFactors: CompatibilityFactor[];
  tensionPoints: TensionPoint[];
  shadowDesires: ShadowDesire[];
  generatedAt: Date;
  confidence: number;
}

export interface PersonalityTrait {
  name: string;
  score: number; // 0-100
  description: string;
  category: string;
  evidence: string[];
}

export interface EmotionalPattern {
  type: string;
  intensity: number;
  triggers: string[];
  responses: string[];
  description: string;
}

export interface SexualProfile {
  dominanceScale: number; // -100 to 100 (submissive to dominant)
  adventurousness: number; // 0-100
  intimacyStyle: string;
  preferredDynamics: string[];
  boundaries: string[];
  fantasies: string[];
  triggers: string[];
}

export interface CommunicationProfile {
  directness: number; // 0-100
  emotionalExpression: number; // 0-100
  conflictStyle: string;
  preferredChannels: string[];
  communicationNeeds: string[];
}

export interface CompatibilityFactor {
  type: string;
  score: number; // 0-100
  description: string;
  recommendations: string[];
}

export interface TensionPoint {
  area: string;
  intensity: number; // 0-100
  description: string;
  potentialTriggers: string[];
  resolutionStrategies: string[];
}

export interface ShadowDesire {
  type: string;
  confidence: number; // 0-100
  description: string;
  manifestations: string[];
  explorationSuggestions: string[];
}

// Compatibility Analysis
export interface CompatibilityReport {
  partnerIds: string[];
  overallCompatibility: number; // 0-100
  sexualCompatibility: number;
  emotionalCompatibility: number;
  socialCompatibility: number;
  communicationCompatibility: number;
  detailedAnalysis: CompatibilityAnalysis[];
  recommendations: Recommendation[];
  warningAreas: WarningArea[];
  growthOpportunities: GrowthOpportunity[];
  generatedAt: Date;
}

export interface CompatibilityAnalysis {
  area: string;
  score: number;
  description: string;
  supportingEvidence: string[];
  potentialChallenges: string[];
}

export interface Recommendation {
  type: RecommendationType;
  priority: Priority;
  title: string;
  description: string;
  actionItems: string[];
  expectedOutcome: string;
}

export enum RecommendationType {
  COMMUNICATION = 'communication',
  EXPLORATION = 'exploration',
  BOUNDARY_SETTING = 'boundary-setting',
  CONFLICT_RESOLUTION = 'conflict-resolution',
  INTIMACY_BUILDING = 'intimacy-building',
  ADVENTURE = 'adventure'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface WarningArea {
  area: string;
  severity: Priority;
  description: string;
  potentialIssues: string[];
  mitigationStrategies: string[];
}

export interface GrowthOpportunity {
  area: string;
  potential: number; // 0-100
  description: string;
  steps: string[];
  timeline: string;
}

// AI Integration Types
export interface AISession {
  id: string;
  userId: string;
  type: AISessionType;
  status: SessionStatus;
  messages: AIMessage[];
  context: SessionContext;
  tokenUsage: TokenUsage;
  startedAt: Date;
  endedAt?: Date;
}

export enum AISessionType {
  PROFILING = 'profiling',
  THERAPY = 'therapy',
  COMPATIBILITY = 'compatibility',
  EXPLORATION = 'exploration',
  CONFLICT_RESOLUTION = 'conflict-resolution'
}

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  TERMINATED = 'terminated'
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface SessionContext {
  phase: string;
  objectives: string[];
  constraints: string[];
  personalityMode: PersonalityMode;
  sensitivityLevel: number; // 0-100
}

export enum PersonalityMode {
  THERAPIST = 'therapist',
  MENTOR = 'mentor',
  CHALLENGER = 'challenger',
  EXPLORER = 'explorer'
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

// Subscription and Monetization
export interface Subscription {
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  features: string[];
  limits: SubscriptionLimits;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export enum SubscriptionPlan {
  FREE = 'free',
  PREMIUM = 'premium',
  COUPLES = 'couples',
  UNLIMITED = 'unlimited'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended'
}

export interface SubscriptionLimits {
  monthlyAssessments: number;
  aiSessionMinutes: number;
  compatibilityReports: number;
  partnerInvites: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Form Types
export interface OnboardingData {
  basicInfo: {
    age?: number;
    gender?: Gender;
    sexualOrientation?: SexualOrientation;
    relationshipStatus?: RelationshipStatus;
    swingingExperience?: SwingingExperience;
    isAnonymous?: boolean;
  };
  preferences: {
    interests: string[];
    boundaries: string[];
    communicationStyle?: CommunicationStyle;
    personalityArchetype?: PersonalityArchetype;
  };
  privacy: {
    privacyLevel: PrivacyLevel;
    profileVisibility: ProfileVisibility;
    dataSharing: boolean;
    anonymousMode: boolean;
  };
  isComplete: boolean;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notificationSettings: NotificationSettings;
  privacyLevel: PrivacyLevel;
  dataRetention: DataRetentionSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  partnerUpdates: boolean;
  aiInsights: boolean;
}

export enum PrivacyLevel {
  MINIMAL = 'minimal',
  BALANCED = 'balanced',
  MAXIMUM = 'maximum'
}

export interface DataRetentionSettings {
  sessionHistory: number; // days
  assessmentResults: number; // days
  conversationLogs: number; // days
  autoDelete: boolean;
}

export interface PrivacySettings {
  profileVisibility: ProfileVisibility;
  dataSharing: DataSharingSettings;
  encryption: EncryptionSettings;
}

export enum ProfileVisibility {
  PRIVATE = 'private',
  PARTNER_ONLY = 'partner-only',
  COMMUNITY = 'community'
}

export interface DataSharingSettings {
  anonymizedResearch: boolean;
  marketingInsights: boolean;
  platformImprovement: boolean;
}

export interface EncryptionSettings {
  endToEndMessages: boolean;
  encryptedStorage: boolean;
  biometricAccess: boolean;
}