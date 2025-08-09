import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Users, 
  Shield, 
  Star, 
  ArrowRight, 
  Settings,
  Play
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                  Tension
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/onboarding"
                  className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-4 py-2 rounded-lg font-semibold hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Kontynuuj</span>
                </Link>
              ) : (
                <Link
                  to="/user-setup"
                  className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-4 py-2 rounded-lg font-semibold hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Rozpocznij</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Odkryj swoje
              <span className="block bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                psychologiczne głębie
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
            >
              Zaawansowana platforma AI dla par, które chcą eksplorować swoją psychologię, 
              zrozumieć kompatybilność i odkryć ukryte pragnienia.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/user-setup"
                className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-500 hover:to-rose-500 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Rozpocznij przygodę</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Dlaczego Tension?
            </h2>
            <p className="text-xl text-gray-400">
              Unikalne funkcje, które wyróżniają naszą platformę
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-400">
                Zaawansowana analiza psychologiczna wykorzystująca sztuczną inteligencję 
                do odkrywania wzorców behawioralnych i emocjonalnych.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Couple Compatibility
              </h3>
              <p className="text-gray-400">
                Głęboka analiza kompatybilności par z uwzględnieniem psychologicznych 
                wzorców i preferencji intymnych.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-dark-700 p-8 rounded-2xl border border-dark-600"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-dark-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Privacy First
              </h3>
              <p className="text-gray-400">
                Twoje dane są przechowywane lokalnie i nie są wysyłane na serwer. 
                Pełna kontrola nad swoimi informacjami.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Co mówią użytkownicy
            </h2>
            <p className="text-xl text-gray-400">
              Doświadczenia par, które odkryły nowe wymiary swojej relacji
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-dark-800 p-8 rounded-2xl border border-dark-700"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Tension pomogło nam odkryć głębsze aspekty naszej relacji. 
                Analiza była niezwykle dokładna i otworzyła nam oczy na nowe możliwości."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-dark-900" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Anna & Marek</p>
                  <p className="text-gray-400 text-sm">Para z 5-letnim stażem</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-800 p-8 rounded-2xl border border-dark-700"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <Star className="w-5 h-5 text-gold-400 fill-current" />
              </div>
              <p className="text-gray-300 mb-4">
                "Platforma jest intuicyjna i bezpieczna. Czujemy się komfortowo 
                dzieląc się swoimi myślami i odkrywając nowe aspekty naszej intymności."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-dark-900" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Kasia & Piotr</p>
                  <p className="text-gray-400 text-sm">Nowa para</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Twoja prywatność jest priorytetem
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Wszystkie dane są przechowywane lokalnie na Twoim urządzeniu. 
              Nie wysyłamy żadnych informacji na serwer.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Dane lokalne
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Bez rejestracji
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Pełna kontrola
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Gotowy na odkrycie?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Rozpocznij swoją psychologiczną podróż już dziś
          </p>
          <Link
            to="/user-setup"
            className="bg-gradient-to-r from-gold-400 to-rose-400 text-dark-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-500 hover:to-rose-500 transition-all duration-200 inline-flex items-center space-x-2 group"
          >
            <span>Rozpocznij teraz</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* AI Quick Test Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-4">Szybki test AI</h3>
          <p className="text-gray-400 mb-4">Napisz krótką wiadomość, a AI odpowie (mock, do testu działania UI).</p>
          <AIQuickTest />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent mb-4">
              Tension
            </h3>
            <p className="text-gray-400 mb-6">
              Odkrywanie psychologicznych głębi przez AI
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Tension. Wszystkie prawa zastrzeżone.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

// Prosty komponent testowy z polem tekstowym i odpowiedzią AI (mock)
const AIQuickTest: React.FC = React.memo(() => {
  const [message, setMessage] = React.useState<string>('');
  const [response, setResponse] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSend = React.useCallback(async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse('');
    // Symulacja odpowiedzi AI (mock)
    await new Promise((r) => setTimeout(r, 600));
    setResponse(
      `AI: Rozumiem. Napisałeś: "${message.trim()}". ` +
      'Wersja demo potwierdza działanie interfejsu.'
    );
    setLoading(false);
  }, [message]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">Twoja wiadomość</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        className="w-full resize-y bg-dark-900 border border-dark-700 rounded-xl text-gray-100 p-3 outline-none focus:border-gold-400"
        placeholder="Napisz coś do AI... (Ctrl/Cmd + Enter aby wysłać)"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="px-4 py-2 rounded-lg font-semibold text-dark-900 bg-gradient-to-r from-gold-400 to-rose-400 disabled:opacity-50"
        >
          {loading ? 'Wysyłanie…' : 'Wyślij'}
        </button>
        <span className="text-xs text-gray-500">Mock odpowiedzi – bez połączenia z serwerem</span>
      </div>
      {response && (
        <div className="mt-4 bg-dark-900 border border-dark-700 rounded-xl p-3 text-gray-100 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
});