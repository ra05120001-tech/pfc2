type Module = 'home' | 'pfc' | 'permutations' | 'arrangements' | 'combinations' | 'password' | 'quiz';

interface HomeProps {
  onNavigate: (module: Module) => void;
}

const modules = [
  {
    id: 'pfc' as Module,
    title: 'Princípio Fundamental da Contagem',
    shortTitle: 'PFC',
    icon: '🧮',
    description: 'Aprenda a base da análise combinatória: como contar possibilidades multiplicando escolhas sucessivas.',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'permutations' as Module,
    title: 'Permutações',
    shortTitle: 'Permutações',
    icon: '🔄',
    description: 'Estude as permutações simples e com repetição. Descubra quantas formas existem de organizar elementos.',
    color: 'from-purple-500 to-purple-700',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    id: 'arrangements' as Module,
    title: 'Arranjos',
    shortTitle: 'Arranjos',
    icon: '📋',
    description: 'Aprenda sobre arranjos simples: escolher e ordenar elementos de um conjunto. A ordem importa!',
    color: 'from-green-500 to-green-700',
    bgLight: 'bg-green-50',
    textColor: 'text-green-700',
  },
  {
    id: 'combinations' as Module,
    title: 'Combinações',
    shortTitle: 'Combinações',
    icon: '🎯',
    description: 'Entenda as combinações simples: escolher elementos onde a ordem NÃO importa. Fundamental!',
    color: 'from-orange-500 to-orange-700',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
  {
    id: 'password' as Module,
    title: 'Desafio da Senha',
    shortTitle: '🔐 Senha',
    icon: '🔐',
    description: 'Coloque em prática seus conhecimentos! Descubra senhas calculando quantas combinações são possíveis.',
    color: 'from-red-500 to-red-700',
    bgLight: 'bg-red-50',
    textColor: 'text-red-700',
  },
  {
    id: 'quiz' as Module,
    title: 'Quiz de Revisão',
    shortTitle: '📝 Quiz',
    icon: '📝',
    description: 'Teste seus conhecimentos com questões de Análise Combinatória e veja sua pontuação!',
    color: 'from-indigo-500 to-indigo-700',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="text-6xl mb-4">📐</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Análise Combinatória
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-6">
              Aprenda PFC, Permutações, Arranjos e Combinações de forma interativa e divertida!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                📚 Teoria Completa
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🧪 Exercícios Interativos
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🔐 Desafios de Senha
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Módulos de Estudo</h2>
        <p className="text-gray-500 text-center mb-8">Escolha um módulo para começar a aprender</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onNavigate(mod.id)}
              className="card-hover bg-white rounded-2xl p-6 text-left border border-gray-100 shadow-sm hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className={`text-4xl p-3 rounded-xl ${mod.bgLight}`}>
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-indigo-500 text-sm font-medium">
                Começar estudo →
              </div>
            </button>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📖 Referência Rápida</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="font-bold text-blue-700 mb-1">PFC</h3>
              <p className="text-sm text-blue-600">n₁ × n₂ × n₃ × ...</p>
              <p className="text-xs text-blue-500 mt-1">Multiplica as escolhas</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-bold text-purple-700 mb-1">Permutação</h3>
              <p className="text-sm text-purple-600">P(n) = n!</p>
              <p className="text-xs text-purple-500 mt-1">Organiza todos os elementos</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-bold text-green-700 mb-1">Arranjo</h3>
              <p className="text-sm text-green-600">A(n,p) = n!/(n-p)!</p>
              <p className="text-xs text-green-500 mt-1">Escolhe e ordena</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-orange-700 mb-1">Combinação</h3>
              <p className="text-sm text-orange-600">C(n,p) = n!/(p!(n-p)!)</p>
              <p className="text-xs text-orange-500 mt-1">Só escolhe (ordem não importa)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
