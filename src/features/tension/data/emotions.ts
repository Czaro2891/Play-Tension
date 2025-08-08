import { EmotionData, EmotionType } from '../../../types/tension';

export const emotions: EmotionData[] = [
  {
    type: 'Joy',
    color: '#FFD700', // złoty
    icon: 'smile',
    description: 'Uczucie szczęścia i radości, które wypełnia ciało i umysł.'
  },
  {
    type: 'Love',
    color: '#FF69B4', // różowy
    icon: 'heart',
    description: 'Głębokie uczucie przywiązania, intymności i troski.'
  },
  {
    type: 'Excitement',
    color: '#FF4500', // pomarańczowo-czerwony
    icon: 'zap',
    description: 'Intensywne uczucie entuzjazmu i podekscytowania.'
  },
  {
    type: 'Calm',
    color: '#4682B4', // stalowy niebieski
    icon: 'cloud',
    description: 'Stan spokoju, relaksu i wewnętrznego pokoju.'
  },
  {
    type: 'Passion',
    color: '#DC143C', // karmazynowy
    icon: 'flame',
    description: 'Intensywne uczucie pożądania i namiętności.'
  },
  {
    type: 'Trust',
    color: '#32CD32', // limonkowy zielony
    icon: 'shield',
    description: 'Poczucie bezpieczeństwa, pewności i zaufania.'
  }
];

export const getEmotionData = (type: EmotionType): EmotionData => {
  const emotion = emotions.find(e => e.type === type);
  if (!emotion) {
    return emotions[0]; // Domyślnie zwróć Joy
  }
  return emotion;
};
