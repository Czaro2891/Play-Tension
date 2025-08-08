import React, { useState } from 'react';
import { Question, QuestionType } from '../../types/assessment';

interface QuestionDisplayProps {
  question: Question;
  onSubmit: (value: any) => void;
  loading: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, onSubmit, loading }) => {
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (question.required && (value === null || value === '')) {
      setError('To pytanie jest wymagane');
      return;
    }
    
    setError(null);
    onSubmit(value);
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name={question.id}
                  value={option.value || option.id}
                  checked={value === (option.value || option.id)}
                  onChange={() => setValue(option.value || option.id)}
                  className="mr-2"
                />
                <label htmlFor={option.id}>{option.text}</label>
              </div>
            ))}
          </div>
        );
      
      case QuestionType.SCALE:
        return (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{question.minLabel || question.min}</span>
              <span>{question.maxLabel || question.max}</span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={value || question.min}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center font-bold">
              {value || ''}
            </div>
          </div>
        );
      
      case QuestionType.TEXT:
        return (
          <div>
            <textarea
              placeholder={question.placeholder}
              maxLength={question.maxLength}
              value={value || ''}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border rounded"
              rows={5}
            />
          </div>
        );
      
      case QuestionType.BOOLEAN:
        return (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setValue(true)}
              className={`px-4 py-2 rounded ${value === true ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {question.yesLabel || 'Tak'}
            </button>
            <button
              type="button"
              onClick={() => setValue(false)}
              className={`px-4 py-2 rounded ${value === false ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {question.noLabel || 'Nie'}
            </button>
          </div>
        );
      
      case QuestionType.IMAGE_CHOICE:
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <div 
                key={option.id} 
                className={`p-2 border rounded cursor-pointer ${value === (option.value || option.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setValue(option.value || option.id)}
              >
                <img src={(option as any).imageUrl} alt={option.text} className="w-full h-auto mb-2" />
                <div className="text-center">{option.text}</div>
              </div>
            ))}
          </div>
        );
      
      default:
        return <div>Nieobsługiwany typ pytania</div>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question.text}</h2>
      
      {renderQuestionContent()}
      
      {error && (
        <div className="mt-3 text-red-500">{error}</div>
      )}
      
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Przetwarzanie...' : 'Dalej'}
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;