import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, UserProfile, Gender, RelationshipStatus, SwingingExperience } from '../types';
import { motion } from 'framer-motion';
import { User as UserIcon, ArrowRight } from 'lucide-react';

const UserSetup: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    relationshipStatus: '',
    swingingExperience: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create user data
      const user: User = {
        id: `user_${Date.now()}`,
        email: `${formData.username}@tension.local`,
        username: formData.username,
        profileCompleted: false,
        createdAt: new Date(),
        lastActive: new Date()
      };

      // Create profile data
      const profile: UserProfile = {
        userId: user.id,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender as Gender || undefined,
        sexualOrientation: undefined,
        relationshipStatus: formData.relationshipStatus as RelationshipStatus || undefined,
        swingingExperience: formData.swingingExperience as SwingingExperience || undefined,
        boundaries: [],
        interests: [],
        personalityArchetype: undefined,
        communicationStyle: undefined,
        isAnonymous: false
      };

      // Set user data
      setUserData(user, profile);
      
      // Navigate to onboarding
      navigate('/onboarding');
    } catch (error) {
      console.error('Failed to set user data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already authenticated, redirect to appropriate page
  if (isAuthenticated) {
    navigate('/onboarding');
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-800 rounded-2xl p-8 shadow-2xl border border-dark-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-dark-900" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ustawienia Gry</h1>
            <p className="text-gray-400">Wprowadź swoje dane, aby rozpocząć przygodę</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="input-field w-full"
                placeholder="Wprowadź swoją nazwę użytkownika"
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                Wiek
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                className="input-field w-full"
                placeholder="Twój wiek"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                Płeć
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz płeć</option>
                <option value="male">Męska</option>
                <option value="female">Żeńska</option>
                <option value="non-binary">Niebinarna</option>
                <option value="other">Inna</option>
              </select>
            </div>

            {/* Relationship Status */}
            <div>
              <label htmlFor="relationshipStatus" className="block text-sm font-medium text-gray-300 mb-2">
                Status związku
              </label>
              <select
                id="relationshipStatus"
                name="relationshipStatus"
                value={formData.relationshipStatus}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz status</option>
                <option value="single">Wolny/Wolna</option>
                <option value="in-relationship">W związku</option>
                <option value="married">Żonaty/Zamężna</option>
                <option value="complicated">Skomplikowane</option>
              </select>
            </div>

            {/* Swinging Experience */}
            <div>
              <label htmlFor="swingingExperience" className="block text-sm font-medium text-gray-300 mb-2">
                Doświadczenie w swingu
              </label>
              <select
                id="swingingExperience"
                name="swingingExperience"
                value={formData.swingingExperience}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Wybierz poziom doświadczenia</option>
                <option value="none">Brak doświadczenia</option>
                <option value="beginner">Początkujący</option>
                <option value="intermediate">Średnio zaawansowany</option>
                <option value="experienced">Doświadczony</option>
                <option value="expert">Ekspert</option>
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.username}
              className="w-full bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 font-semibold py-3 px-6 rounded-xl hover:from-gold-500 hover:to-rose-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Przetwarzanie...</span>
                </>
              ) : (
                <>
                  <span>Rozpocznij przygodę</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Twoje dane są przechowywane lokalnie i nie są wysyłane na serwer
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSetup;
