import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Calendar, Users, Heart } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';
import { Gender, SexualOrientation, RelationshipStatus, SwingingExperience } from '../../../types';
import { cn } from '../../../utils';

interface FormData {
  age?: number;
  gender?: Gender;
  sexualOrientation?: SexualOrientation;
  relationshipStatus?: RelationshipStatus;
  swingingExperience?: SwingingExperience;
  isAnonymous?: boolean;
}

const BasicInfoStep: React.FC = () => {
  const { state, updateData } = useOnboarding();
  const { data } = state;
  const [isAnonymous, setIsAnonymous] = useState(data.basicInfo.isAnonymous || false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<FormData>({
    defaultValues: {
      age: data.basicInfo.age || undefined,
      gender: data.basicInfo.gender || undefined,
      sexualOrientation: data.basicInfo.sexualOrientation || undefined,
      relationshipStatus: data.basicInfo.relationshipStatus || undefined,
      swingingExperience: data.basicInfo.swingingExperience || undefined,
      isAnonymous: data.basicInfo.isAnonymous || false,
    },
  });

  useEffect(() => {
    // Auto-save form data as user types
    const subscription = watch((value) => {
      updateData({
        basicInfo: {
          ...data.basicInfo,
          ...value,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData, data.basicInfo]);

  const onSubmit = (formData: FormData) => {
    updateData({
      basicInfo: {
        ...data.basicInfo,
        ...formData,
      },
    });
  };

  const formatEnumValue = (value: string): string => {
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gold-100 mb-2">
            Tell Us About Yourself
          </h1>
          <p className="text-gold-200">
            This basic information helps us personalize your experience and ensure appropriate matching.
          </p>
        </div>

        {/* Anonymous Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold-100">Anonymous Mode</h3>
                  <p className="text-sm text-gold-200">Keep your identity completely private</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(!isAnonymous);
                  updateData({
                    basicInfo: {
                      ...data.basicInfo,
                      isAnonymous: !isAnonymous,
                    },
                  });
                }}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900',
                  isAnonymous ? 'bg-gold-500' : 'bg-dark-600'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    isAnonymous ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Age */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Age</label>
            </div>
            <input
              type="number"
              {...register('age', { 
                min: { value: 18, message: 'Must be at least 18 years old' },
                max: { value: 100, message: 'Please enter a valid age' }
              })}
              className="input-field"
              placeholder="Enter your age"
            />
            {formErrors.age && (
              <p className="text-rose-400 text-sm mt-1">{formErrors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Gender</label>
            </div>
            <select {...register('gender')} className="input-field">
              <option value="">Select gender</option>
              {Object.values(Gender).map((gender) => (
                <option key={gender} value={gender}>
                  {formatEnumValue(gender)}
                </option>
              ))}
            </select>
          </div>

          {/* Sexual Orientation */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Sexual Orientation</label>
            </div>
            <select {...register('sexualOrientation')} className="input-field">
              <option value="">Select orientation</option>
              {Object.values(SexualOrientation).map((orientation) => (
                <option key={orientation} value={orientation}>
                  {formatEnumValue(orientation)}
                </option>
              ))}
            </select>
          </div>

          {/* Relationship Status */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Relationship Status</label>
            </div>
            <select {...register('relationshipStatus')} className="input-field">
              <option value="">Select status</option>
              {Object.values(RelationshipStatus).map((status) => (
                <option key={status} value={status}>
                  {formatEnumValue(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Swinging Experience */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-gold-400" />
              </div>
              <label className="text-lg font-semibold text-gold-100">Swinging Experience</label>
            </div>
            <select {...register('swingingExperience')} className="input-field">
              <option value="">Select experience level</option>
              {Object.values(SwingingExperience).map((experience) => (
                <option key={experience} value={experience}>
                  {formatEnumValue(experience)}
                </option>
              ))}
            </select>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default BasicInfoStep;