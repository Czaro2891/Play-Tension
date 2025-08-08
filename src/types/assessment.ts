// src/types/assessment.ts

// Typy pytań
export enum QuestionType {
  MULTIPLE_CHOICE = "multiple-choice",
  SCALE = "scale",
  TEXT = "text",
  BOOLEAN = "boolean",
  IMAGE_CHOICE = "image-choice"
}

// Kategorie pytań
export enum QuestionCategory {
  EMOTIONAL_INTELLIGENCE = "emotional-intelligence",
  INTIMACY_PATTERNS = "intimacy-patterns",
  RELATIONSHIP_GOALS = "relationship-goals",
  COMMUNICATION_STYLE = "communication-style",
  PERSONALITY = "personality"
}

// Opcja pytania
export interface QuestionOption {
  id: string;
  text: string;
  value?: any;
}

// Bazowy interfejs pytania
export interface BaseQuestion {
  id: string;
  text: string;
  required: boolean;
  category: QuestionCategory;
}

// Pytanie wielokrotnego wyboru
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: QuestionOption[];
}

// Pytanie skalowe
export interface ScaleQuestion extends BaseQuestion {
  type: QuestionType.SCALE;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
}

// Pytanie tekstowe
export interface TextQuestion extends BaseQuestion {
  type: QuestionType.TEXT;
  placeholder?: string;
  maxLength?: number;
}

// Pytanie typu boolean (tak/nie)
export interface BooleanQuestion extends BaseQuestion {
  type: QuestionType.BOOLEAN;
  yesLabel?: string;
  noLabel?: string;
}

// Pytanie z wyborem obrazu
export interface ImageChoiceQuestion extends BaseQuestion {
  type: QuestionType.IMAGE_CHOICE;
  options: Array<QuestionOption & { imageUrl: string }>;
}

// Typ unii dla wszystkich rodzajów pytań
export type Question = 
  | MultipleChoiceQuestion 
  | ScaleQuestion 
  | TextQuestion 
  | BooleanQuestion 
  | ImageChoiceQuestion;

// Odpowiedź na pytanie
export interface Answer {
  questionId: string;
  value: any;
}

// Sesja oceny
export interface AssessmentSession {
  id: string;
  userId: string;
  type: string;
  personalityMode?: string;
  startedAt: Date;
  completedAt?: Date;
  answers: Answer[];
}

// Cechy osobowości
export interface PersonalityTrait {
  name: string;
  score: number;
  description: string;
}

// Wzorce emocjonalne
export interface EmotionalPattern {
  name: string;
  level: number;
  description: string;
}

// Profil seksualny
export interface SexualProfile {
  libido: number;
  preferences: string[];
  description: string;
}

// Wzorce bliskości
export interface IntimacyPattern {
  type: string;
  description: string;
  strength: number;
}

// Styl komunikacji
export interface CommunicationStyle {
  primary: string;
  secondary: string;
  description: string;
}

// Cele związku
export interface RelationshipGoal {
  name: string;
  priority: number;
  description: string;
}

// Profil psychologiczny
export interface PsychologicalProfile {
  userId: string;
  personalityType: string;
  personalityTraits: PersonalityTrait[];
  emotionalPatterns: EmotionalPattern[];
  sexualProfile: SexualProfile;
  intimacyPatterns: IntimacyPattern[];
  communicationStyle: CommunicationStyle;
  relationshipGoals: RelationshipGoal[];
  compatibilityScore?: number;
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Typ dla częściowego profilu psychologicznego (używany podczas tworzenia profilu)
export type PartialPsychologicalProfile = Partial<PsychologicalProfile>;

// Odpowiedź z API AI
export interface AIResponse {
  done: boolean;
  question?: Question;
  insights?: PartialPsychologicalProfile;
}
