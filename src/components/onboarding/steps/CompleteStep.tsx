import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Brain, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../../../contexts/OnboardingContext';

const CompleteStep: React.FC = () => {
  const { state } = useOnboarding();
  const { data } = state;

  const summary = [
    {
      icon: Users,
      title: 'Profile Information',
      value: data.basicInfo.age ? `${data.basicInfo.age} years old` : 'Set up',
      detail: data.basicInfo.gender ? `${data.basicInfo.gender}, ${data.basicInfo.sexualOrientation}` : 'Profile configured',
    },
    {
      icon: Shield,
      title: 'Boundaries',
      value: `${data.preferences.boundaries?.length || 0} boundaries`,
      detail: 'Safety guidelines established',
    },
    {
      icon: Heart,
      title: 'Interests',
      value: `${data.preferences.interests?.length || 0} interests`,
      detail: 'Preferences recorded',
    },
    {
      icon: Brain,
      title: 'Privacy Level',
      value: data.privacy.privacyLevel,
      detail: 'Security configured',
    },
  ];

  const nextSteps = [
    {
      icon: Brain,
      title: 'AI Psychological Profiling',
      description: 'Complete your psychological assessment to unlock deep insights about your personality and relationship patterns.',
      action: 'Start Assessment',
    },
    {
      icon: Users,
      title: 'Partner Connection',
      description: 'Invite your partner to join and discover your compatibility through our advanced matching algorithms.',
      action: 'Invite Partner',
    },
    {
      icon: Sparkles,
      title: 'Explore Features',
      description: 'Discover tension mapping, shadow desires analysis, and personalized growth recommendations.',
      action: 'Explore Now',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Animation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative mx-auto mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 w-24 h-24 border-4 border-gold-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold text-gold-100 mb-4"
          >
            Welcome to Tensions!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gold-200 leading-relaxed"
          >
            Your profile is complete and your journey of self-discovery begins now. 
            You're ready to explore the depths of your psychological landscape.
          </motion.p>
        </div>

        {/* Setup Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gold-100 mb-6 text-center">
            Setup Summary
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {summary.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg border border-gold-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gold-100 font-medium">{item.title}</h3>
                  <p className="text-gold-400 font-semibold">{item.value}</p>
                  <p className="text-gold-200 text-sm">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gold-100 mb-6 text-center">
            What's Next?
          </h2>
          
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="card p-6 hover:border-gold-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gold-100 mb-1">{step.title}</h3>
                      <p className="text-gold-200 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gold-400 group-hover:text-gold-300 transition-colors">
                    <span className="text-sm font-medium">{step.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center p-8 bg-gradient-to-r from-rose-500/10 to-gold-500/10 border border-gold-500/30 rounded-xl"
        >
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gold-100 mb-3">
            Your Journey Begins
          </h3>
          <p className="text-gold-200 leading-relaxed max-w-2xl mx-auto">
            You've taken the first step toward deeper self-understanding and more fulfilling relationships. 
            Our AI will guide you through psychological territories you may have never explored, 
            revealing insights that can transform how you connect with yourself and others.
          </p>
        </motion.div>

        {/* Privacy Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 p-4 bg-dark-700/30 border border-gold-500/20 rounded-lg text-center"
        >
          <Shield className="w-5 h-5 text-gold-400 mx-auto mb-2" />
          <p className="text-gold-200 text-sm">
            <strong>Your privacy is protected.</strong> All information is encrypted and only you control who sees what.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompleteStep;