import { useState } from 'react';
import { arrangement, formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

export default function ArrangementsModule({ onBack }: Props) {
  const [n, setN] = useState(5);
  const [p, setP] = useState(3);
  const [showDetail, setShowDetail] = useState(false);

  const result = arrangement(n, p);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📋</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Arranjos</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Arranjo é escolher p elementos de n elementos disponíveis, onde a <strong>ORDEM IMPORTA</strong>.
        </p>
      </div>

      {/* Theory */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">📚 Teoria</h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">💡 Quando usar Arranjo?</h3>
            <p>Usamos arranjo quando precisamos <strong>escolher E ordenar</strong> elementos. A ordem dos elementos escolhidos faz diferença!</p>
            <div className="mt-2 text-sm text-green-700">
              <p>Exemplo: Eleger presidente e vice entre 5 candidatos.</p>
              <p className="text-green-600">→ (A presidente, B vice) é DIFERENTE de (B presidente, A vice)</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">🔢 Fórmula do Arranjo Simples</h3>
            <div className="text-center text-xl font-mono font-bold text-indigo-700 mt-2">
              A(n, p) = n! / (n - p)!
            </div>
            <div className="text-center text-sm text-indigo-600 mt-2">
              ou equivalentemente: A(n, p) = n × (n-1) × (n-2) × ... × (n-p+1)
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p>• A(5, 2) = 5! / 3! = 5 × 4 = <strong>20</strong></p>
              <p>• A(5, 3) = 5! / 2! = 5 × 4 × 3 = <strong>60</strong></p>
              <p>• A(10, 4) = 10! / 6! = 10 × 9 × 8 × 7 = <strong>5.040</strong></p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Arranjo vs Permutação</h3>
            <p>Quando p = n, o arranjo vira permutação! A(n, n) = P(n) = n!</p>
            <p className="text-sm text-yellow-700 mt-1">O arranjo é uma "permutação parcial" - escolhemos apenas alguns elementos.</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-semibold text-orange-800 mb-2">🆚 Arranjo vs Combinação</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-orange-700 text-sm">Arranjo</p>
                <p className="text-xs text-gray-600">A ordem <strong>IMPORTA</strong></p>
                <p className="text-xs text-gray-500 mt-1">Ex: Senha, podio, cargos</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-bold text-blue-700 text-sm">Combinação</p>
                <p className="text-xs text-gray-600">A ordem <strong>NÃO importa</strong></p>
                <p className="text-xs text-gray-500 mt-1">Ex: Equipes, sabores, subconjuntos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧪 Calculadora de Arranjos</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">n (total de elementos):</label>
            <input
              type="range"
              min={2}
              max={12}
              value={n}
              onChange={(e) => { setN(parseInt(e.target.value)); setShowDetail(false); }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="text-center text-2xl font-bold text-green-600 mt-2">{n}</div>
          </div>
          <div>
            <label className="block text-gray-600 mb-2 font-medium">p (elementos a escolher):</label>
            <input
              type="range"
              min={1}
              max={n}
              value={p}
              onChange={(e) => { setP(parseInt(e.target.value)); setShowDetail(false); }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="text-center text-2xl font-bold text-green-600 mt-2">{p}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-600 mb-2">Cálculo passo a passo:</p>
          <div className="space-y-2">
            <div className="font-mono text-center">
              <span className="text-green-700 font-bold">A({n}, {p})</span>
              <span className="text-gray-400"> = </span>
              <span className="text-green-700">{n}! / ({n} - {p})!</span>
              <span className="text-gray-400"> = </span>
              <span className="text-green-700">{n}! / {n - p}!</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 text-lg">
              <span className="text-gray-400">=</span>
              {Array.from({ length: p }, (_, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && <span className="text-gray-400 mx-1">×</span>}
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{n - i}</span>
                </span>
              ))}
              <span className="text-gray-400">=</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-xl">
                {formatNumber(result)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
        >
          {showDetail ? 'Ocultar' : 'Ver'} explicação detalhada
        </button>

        {showDetail && (
          <div className="mt-4 bg-green-50 rounded-xl p-4 fade-in">
            <h3 className="font-semibold text-green-800 mb-2">📖 Explicação:</h3>
            <p className="text-green-700 text-sm mb-2">
              Temos <strong>{n}</strong> elementos e queremos escolher <strong>{p}</strong> deles, onde a ordem importa.
            </p>
            <div className="space-y-1 text-sm text-green-700">
              <p>• Para a 1ª posição: temos <strong>{n}</strong> opções</p>
              <p>• Para a 2ª posição: temos <strong>{n - 1}</strong> opções (uma já foi usada)</p>
              {p > 2 && <p>• Para a 3ª posição: temos <strong>{n - 2}</strong> opções</p>}
              {p > 3 && <p>• ... e assim por diante até a {p}ª posição</p>}
              <p className="mt-2">• Total: {Array.from({ length: p }, (_, i) => n - i).join(' × ')} = <strong>{formatNumber(result)}</strong></p>
            </div>
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Exemplos Práticos</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-green-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🏆 Pódio</h3>
            <p className="text-gray-600 text-sm">De quantas formas 8 corredores podem ocupar o pódio (1º, 2º e 3º lugar)?</p>
            <p className="text-green-600 font-mono mt-1">A(8, 3) = 8 × 7 × 6 = 336 formas</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🔐 Senha</h3>
            <p className="text-gray-600 text-sm">Uma senha de 4 dígitos sem repetição usando 10 algarismos:</p>
            <p className="text-blue-600 font-mono mt-1">A(10, 4) = 10 × 9 × 8 × 7 = 5.040 senhas</p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">👔 Cargos</h3>
            <p className="text-gray-600 text-sm">Eleger presidente, vice e tesoureiro entre 10 membros:</p>
            <p className="text-purple-600 font-mono mt-1">A(10, 3) = 10 × 9 × 8 = 720 chapas</p>
          </div>
          <div className="border-l-4 border-orange-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">📚 Anagrama parcial</h3>
            <p className="text-gray-600 text-sm">Quantas "palavras" de 3 letras podemos formar com as letras de COMPUTADOR (10 letras distintas)?</p>
            <p className="text-orange-600 font-mono mt-1">A(10, 3) = 10 × 9 × 8 = 720 palavras</p>
          </div>
        </div>
      </div>
    </div>
  );
}
