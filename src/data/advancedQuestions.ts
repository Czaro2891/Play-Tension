import { Question, QuestionType, QuestionCategory } from '../types';

export const advancedQuestions: Question[] = [
  // Image Choice Questions
  {
    id: 'img_desire_1',
    type: QuestionType.IMAGE_CHOICE,
    category: QuestionCategory.SUBCONSCIOUS_DESIRES,
    text: 'Which image most strongly evokes desire in you?',
    metadata: {
      instruction: 'Choose instinctively - your first reaction reveals your deepest desires',
      images: [
        {
          id: 'desire_power',
          value: 'power_dynamic',
          emotion: 'power',
          intensity: 4,
          title: 'Control & Command',
          description: 'The thrill of being in control',
          tags: ['dominance', 'control', 'power'],
          url: null // Will use color gradient
        },
        {
          id: 'desire_vulnerability',
          value: 'vulnerability_embrace',
          emotion: 'vulnerability',
          intensity: 5,
          title: 'Open Vulnerability',
          description: 'The beauty of complete openness',
          tags: ['vulnerability', 'trust', 'intimacy'],
          url: null
        },
        {
          id: 'desire_mystery',
          value: 'mystery_intrigue',
          emotion: 'mystery',
          intensity: 3,
          title: 'Hidden Depths',
          description: 'The allure of the unknown',
          tags: ['mystery', 'intrigue', 'discovery'],
          url: null
        },
        {
          id: 'desire_passion',
          value: 'raw_passion',
          emotion: 'passion',
          intensity: 5,
          title: 'Raw Intensity',
          description: 'Pure, unfiltered passion',
          tags: ['passion', 'intensity', 'fire'],
          url: null
        }
      ]
    },
    phase: 'shadow_exploration',
    weight: 3,
    required: true
  },

  // Emotion Wheel Questions
  {
    id: 'emotion_intimacy_1',
    type: QuestionType.EMOTION_WHEEL,
    category: QuestionCategory.INTIMACY_PATTERNS,
    text: 'When you think about true intimacy, what emotion arises most powerfully?',
    metadata: {
      instruction: 'Select the emotion and adjust the intensity to match your inner experience',
      timeLimit: 60,
      requiresIntensity: true
    },
    phase: 'emotional_patterns',
    weight: 4,
    required: true
  },

  {
    id: 'emotion_power_1',
    type: QuestionType.EMOTION_WHEEL,
    category: QuestionCategory.POWER_DYNAMICS,
    text: 'In moments of conflict or negotiation, what emotion drives you?',
    metadata: {
      instruction: 'Be honest about your emotional drivers in power situations',
      timeLimit: 45,
      requiresIntensity: true
    },
    phase: 'relationship_dynamics',
    weight: 3,
    required: true
  },

  // Word Association Questions
  {
    id: 'word_assoc_1',
    type: QuestionType.WORD_ASSOCIATION,
    category: QuestionCategory.PSYCHOLOGICAL_TRIGGERS,
    text: 'Rapid Word Association - Subconscious Mapping',
    metadata: {
      triggerWords: [
        'intimacy', 'power', 'control', 'vulnerability', 'desire', 'trust',
        'passion', 'fear', 'love', 'dominance', 'submission', 'freedom',
        'betrayal', 'safety', 'risk', 'pleasure', 'pain', 'connection'
      ],
      timeLimit: 45,
      maxAssociations: 12,
      instruction: 'Respond with the very first word that comes to mind - no filtering'
    },
    phase: 'shadow_exploration',
    weight: 5,
    required: true
  },

  {
    id: 'word_assoc_sexual',
    type: QuestionType.WORD_ASSOCIATION,
    category: QuestionCategory.SEXUAL_PSYCHOLOGY,
    text: 'Sexual Psychology - Deep Association Mapping',
    metadata: {
      triggerWords: [
        'attraction', 'fantasy', 'forbidden', 'taboo', 'ecstasy', 'surrender',
        'tease', 'hunger', 'worship', 'devour', 'melt', 'consume'
      ],
      timeLimit: 30,
      maxAssociations: 8,
      instruction: 'Let your sexual psyche speak without censorship'
    },
    phase: 'sexual_preferences',
    weight: 4,
    required: true
  },

  // Advanced Scenario Questions
  {
    id: 'scenario_jealousy_1',
    type: QuestionType.SCENARIO,
    category: QuestionCategory.RELATIONSHIP_TRAUMA,
    text: 'Your partner is deeply engaged in conversation with someone attractive at a party. They\'re laughing, touching occasionally, completely absorbed in each other.',
    metadata: {
      scenario: 'You notice your partner across the room, completely engrossed in conversation with someone you find attractive. Their body language is open, they\'re laughing frequently, and there\'s an undeniable chemistry in the air.',
      reflection: 'What does your immediate emotional reaction reveal about your deepest fears?',
      psychologicalFocus: 'attachment_style'
    },
    options: [
      {
        id: 'jealousy_secure',
        text: 'Feel curious and maybe slightly excited by their connection',
        value: 'secure_attachment',
        metadata: { archetype: 'secure', defensiveness: 0 }
      },
      {
        id: 'jealousy_anxious',
        text: 'Experience intense anxiety and need immediate reassurance',
        value: 'anxious_attachment',
        metadata: { archetype: 'anxious', defensiveness: 3 }
      },
      {
        id: 'jealousy_avoidant',
        text: 'Feel emotionally distant and start planning your exit',
        value: 'avoidant_attachment',
        metadata: { archetype: 'avoidant', defensiveness: 4 }
      },
      {
        id: 'jealousy_control',
        text: 'Need to interrupt and reclaim their attention immediately',
        value: 'controlling_response',
        metadata: { archetype: 'anxious', defensiveness: 5 }
      }
    ],
    phase: 'relationship_dynamics',
    weight: 4,
    required: true
  },

  {
    id: 'scenario_power_1',
    type: QuestionType.SCENARIO,
    category: QuestionCategory.POWER_DYNAMICS,
    text: 'In an intimate moment, your partner asks you to take complete control and "do whatever you want" to them.',
    metadata: {
      scenario: 'You\'re in an intimate setting. Your partner looks into your eyes and whispers: "I trust you completely. Take control. Do whatever you want with me."',
      reflection: 'How does this offer of complete surrender affect you psychologically?',
      psychologicalFocus: 'power_dynamics'
    },
    options: [
      {
        id: 'power_embrace',
        text: 'Feel energized and naturally take charge with confidence',
        value: 'natural_dominant',
        metadata: { powerStyle: 'dominant', comfort: 5 }
      },
      {
        id: 'power_gentle',
        text: 'Take control but focus on their pleasure and responses',
        value: 'service_dominant',
        metadata: { powerStyle: 'service_dom', comfort: 4 }
      },
      {
        id: 'power_uncomfortable',
        text: 'Feel uncomfortable with the responsibility and prefer to share control',
        value: 'collaborative',
        metadata: { powerStyle: 'switch', comfort: 2 }
      },
      {
        id: 'power_reverse',
        text: 'Find yourself wanting them to take control instead',
        value: 'natural_submissive',
        metadata: { powerStyle: 'submissive', comfort: 3 }
      }
    ],
    phase: 'sexual_preferences',
    weight: 5,
    required: true
  },

  // Complex Multiple Choice with Psychological Depth
  {
    id: 'trauma_response_1',
    type: QuestionType.MULTIPLE_CHOICE,
    category: QuestionCategory.RELATIONSHIP_TRAUMA,
    text: 'When someone you care about suddenly becomes emotionally distant, your first instinct is to:',
    options: [
      {
        id: 'trauma_pursue',
        text: 'Pursue them harder and try to reconnect immediately',
        value: 'anxious_pursuit',
        metadata: { 
          attachmentStyle: 'anxious',
          traumaResponse: 'hypervigilance',
          defensiveness: 4
        }
      },
      {
        id: 'trauma_mirror',
        text: 'Mirror their distance and protect yourself emotionally',
        value: 'avoidant_withdrawal',
        metadata: { 
          attachmentStyle: 'avoidant',
          traumaResponse: 'emotional_shutdown',
          defensiveness: 5
        }
      },
      {
        id: 'trauma_communicate',
        text: 'Gently ask what\'s happening and offer support',
        value: 'secure_communication',
        metadata: { 
          attachmentStyle: 'secure',
          traumaResponse: 'healthy_inquiry',
          defensiveness: 1
        }
      },
      {
        id: 'trauma_analyze',
        text: 'Analyze what you might have done wrong',
        value: 'self_blame_pattern',
        metadata: { 
          attachmentStyle: 'anxious',
          traumaResponse: 'self_criticism',
          defensiveness: 3
        }
      }
    ],
    phase: 'relationship_dynamics',
    weight: 4,
    required: true,
    metadata: {
      psychologicalFocus: 'attachment_trauma',
      followUpTriggers: ['anxious_pursuit', 'avoidant_withdrawal']
    }
  }
];

// Advanced Question Generator Functions
export const generateFollowUpQuestion = (
  previousAnswer: any,
  category: QuestionCategory,
  detectedPattern: string
): Question | null => {
  // Dynamic question generation based on detected patterns
  const followUpMap: Record<string, Partial<Question>> = {
    'anxious_attachment': {
      type: QuestionType.SCALE,
      text: 'How often do you find yourself needing reassurance in relationships?',
      category: QuestionCategory.ATTACHMENT_STYLE,
      metadata: {
        scaleLabels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly'],
        psychologicalFocus: 'attachment_anxiety'
      }
    },
    'power_dominant': {
      type: QuestionType.EMOTION_WHEEL,
      text: 'When you take control in intimate situations, what emotion do you feel most strongly?',
      category: QuestionCategory.POWER_DYNAMICS,
      metadata: {
        instruction: 'Focus on your internal emotional experience of power'
      }
    },
    'high_defensiveness': {
      type: QuestionType.WORD_ASSOCIATION,
      text: 'Vulnerability Mapping - Quick Association',
      category: QuestionCategory.PSYCHOLOGICAL_TRIGGERS,
      metadata: {
        triggerWords: ['vulnerable', 'exposed', 'weak', 'open', 'raw', 'naked'],
        timeLimit: 20,
        maxAssociations: 6
      }
    }
  };

  const template = followUpMap[detectedPattern];
  if (!template) return null;

  return {
    id: `followup_${detectedPattern}_${Date.now()}`,
    phase: 'validation',
    weight: 2,
    required: false,
    ...template
  } as Question;
};

export const detectPsychologicalPatterns = (answers: any[]): string[] => {
  const patterns: string[] = [];
  
  // Analyze response patterns
  const responseAnalysis = {
    defensiveness: 0,
    powerOrientation: '',
    attachmentStyle: '',
    emotionalRange: 0,
  };

  answers.forEach(answer => {
    // Defensiveness detection
    if (answer.timeSpent && answer.timeSpent > 10000) { // > 10 seconds
      responseAnalysis.defensiveness += 1;
    }
    
    if (answer.confidence && answer.confidence < 50) {
      responseAnalysis.defensiveness += 1;
    }

    // Pattern detection from answer values
    if (typeof answer.value === 'string') {
      if (answer.value.includes('control') || answer.value.includes('dominant')) {
        responseAnalysis.powerOrientation = 'dominant';
      }
      if (answer.value.includes('anxious') || answer.value.includes('pursuit')) {
        responseAnalysis.attachmentStyle = 'anxious';
      }
    }
  });

  // Generate pattern flags
  if (responseAnalysis.defensiveness > 3) {
    patterns.push('high_defensiveness');
  }
  
  if (responseAnalysis.powerOrientation === 'dominant') {
    patterns.push('power_dominant');
  }
  
  if (responseAnalysis.attachmentStyle === 'anxious') {
    patterns.push('anxious_attachment');
  }

  return patterns;
};