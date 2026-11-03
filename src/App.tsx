import { useState } from 'react';
import Home from './components/Home';
import PFCModule from './components/PFCModule';
import PermutationsModule from './components/PermutationsModule';
import ArrangementsModule from './components/ArrangementsModule';
import CombinationsModule from './components/CombinationsModule';
import PasswordChallenge from './components/PasswordChallenge';
import QuizModule from './components/QuizModule';

type Module = 'home' | 'pfc' | 'permutations' | 'arrangements' | 'combinations' | 'password' | 'quiz';

function App() {
  const [currentModule, setCurrentModule] = useState<Module>('home');

  const renderModule = () => {
    switch (currentModule) {
      case 'home':
        return <Home onNavigate={setCurrentModule} />;
      case 'pfc':
        return <PFCModule onBack={() => setCurrentModule('home')} />;
      case 'permutations':
        return <PermutationsModule onBack={() => setCurrentModule('home')} />;
      case 'arrangements':
        return <ArrangementsModule onBack={() => setCurrentModule('home')} />;
      case 'combinations':
        return <CombinationsModule onBack={() => setCurrentModule('home')} />;
      case 'password':
        return <PasswordChallenge onBack={() => setCurrentModule('home')} />;
      case 'quiz':
        return <QuizModule onBack={() => setCurrentModule('home')} />;
      default:
        return <Home onNavigate={setCurrentModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentModule !== 'home' && (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setCurrentModule('home')}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar ao Menu
            </button>
            <div className="flex gap-2">
              {(['pfc', 'permutations', 'arrangements', 'combinations', 'password', 'quiz'] as Module[]).map((mod) => (
                <button
                  key={mod}
                  onClick={() => setCurrentModule(mod)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    currentModule === mod
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {mod === 'pfc' && 'PFC'}
                  {mod === 'permutations' && 'Permutações'}
                  {mod === 'arrangements' && 'Arranjos'}
                  {mod === 'combinations' && 'Combinações'}
                  {mod === 'password' && '🔐 Senha'}
                  {mod === 'quiz' && '📝 Quiz'}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
      <main className="fade-in">
        {renderModule()}
      </main>
    </div>
  );
}

export default App;
