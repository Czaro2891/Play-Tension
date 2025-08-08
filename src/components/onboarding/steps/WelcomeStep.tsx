import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Brain, Users, Sparkles, Lock } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Deep Psychological Insights',
      description: 'AI-powered analysis of your relationship patterns and desires',
    },
    {
      icon: Heart,
      title: 'Compatibility Mapping',
      description: 'Discover how you connect on emotional and intimate levels',
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Your journey remains confidential with end-to-end encryption',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-gold-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 w-24 h-24 border-2 border-gold-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-100 mb-6">
          Welcome to Your Journey
        </h1>
        
        <p className="text-xl text-gold-200 mb-8 leading-relaxed">
          You're about to embark on a profound exploration of your authentic self. 
          This process will help us understand your psychological patterns, desires, 
          and relationship dynamics to create a personalized experience just for you.
        </p>

        {/* What to Expect */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gold-100 mb-6">
            What to Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-gold-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-gold-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gold-200 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-dark-700/30 border border-gold-500/20 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-gold-400 mr-2" />
            <h3 className="text-lg font-semibold text-gold-100">
              Your Privacy is Sacred
            </h3>
          </div>
          <p className="text-gold-200 text-sm leading-relaxed">
            Everything you share with us is encrypted and remains completely confidential. 
            You control what information you provide, and you can modify or delete your data at any time. 
            We never share personal details with third parties.
          </p>
        </motion.div>

        {/* Time Estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gold-300 text-sm">
            <Users className="w-4 h-4 inline mr-1" />
            This process takes about 10-15 minutes to complete
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;