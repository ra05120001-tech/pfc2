import { useState } from 'react';
import { combination, formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

export default function CombinationsModule({ onBack }: Props) {
  const [n, setN] = useState(6);
  const [p, setP] = useState(3);
  const [showDetail, setShowDetail] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const result = combination(n, p);
  const arrResult = n >= p ? (p > 0 ? Array.from({ length: p }, (_, i) => n - i).reduce((a, b) => a * b, 1) : 1) : 0;

  // Generate actual combinations for small sets
  const generateCombinations = (arr: number[], k: number): number[][] => {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];
    const [first, ...rest] = arr;
    const withFirst = generateCombinations(rest, k - 1).map(c => [first, ...c]);
    const withoutFirst = generateCombinations(rest, k);
    return [...withFirst, ...withoutFirst];
  };

  const elements = Array.from({ length: n }, (_, i) => i + 1);
  const combinations = n <= 10 && p <= 6 ? generateCombinations(elements, p) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎯</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Combinações</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Combinação é escolher p elementos de n disponíveis, onde a <strong>ORDEM NÃO IMPORTA</strong>.
        </p>
      </div>

      {/* Theory */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-orange-700 mb-4">📚 Teoria</h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-semibold text-orange-800 mb-2">💡 Quando usar Combinação?</h3>
            <p>Usamos combinação quando precisamos apenas <strong>escolher</strong> elementos. A ordem dos elementos escolhidos <strong>NÃO</strong> faz diferença!</p>
            <div className="mt-2 text-sm text-orange-700">
              <p>Exemplo: Escolher 3 sabores de sorvete entre 10 disponíveis.</p>
              <p className="text-orange-600">→ {`{Morango, Chocolate, Baunilha}`} é IGUAL a {`{Chocolate, Morango, Baunilha}`}</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">🔢 Fórmula da Combinação Simples</h3>
            <div className="text-center text-xl font-mono font-bold text-indigo-700 mt-2">
              C(n, p) = n! / (p! × (n - p)!)
            </div>
            <div className="text-center text-sm text-indigo-600 mt-2">
              Também escrita como: C(n,p) = (n sobre p) ou "n choose p"
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p>• C(6, 2) = 6! / (2! × 4!) = (6×5) / (2×1) = <strong>15</strong></p>
              <p>• C(10, 3) = 10! / (3! × 7!) = (10×9×8) / (3×2×1) = <strong>120</strong></p>
              <p>• C(5, 5) = 5! / (5! × 0!) = <strong>1</strong></p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">🔗 Relação entre Arranjo e Combinação</h3>
            <div className="text-center text-lg font-mono font-bold text-yellow-700 mt-2">
              C(n, p) = A(n, p) / P(p) = A(n, p) / p!
            </div>
            <p className="text-sm text-yellow-700 mt-2">
              A combinação é o arranjo dividido pela permutação dos escolhidos, pois "desordenamos" os resultados.
            </p>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Exemplo: C(6, 3) = A(6, 3) / 3! = 120 / 6 = <strong>20</strong></p>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="font-semibold text-red-800 mb-2">🧠 Como saber se é Arranjo ou Combinação?</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm"><strong>Pergunta chave:</strong> "A ordem dos elementos escolhidos muda o resultado?"</p>
              <p className="text-sm text-green-700">✅ Se SIM → Arranjo (ex: senha, pódio, cargos)</p>
              <p className="text-sm text-red-700">❌ Se NÃO → Combinação (ex: equipe, sabores, subconjunto)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧪 Calculadora de Combinações</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">n (total de elementos):</label>
            <input
              type="range"
              min={2}
              max={12}
              value={n}
              onChange={(e) => { setN(parseInt(e.target.value)); setShowDetail(false); }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="text-center text-2xl font-bold text-orange-600 mt-2">{n}</div>
          </div>
          <div>
            <label className="block text-gray-600 mb-2 font-medium">p (elementos a escolher):</label>
            <input
              type="range"
              min={1}
              max={n}
              value={p}
              onChange={(e) => { setP(parseInt(e.target.value)); setShowDetail(false); }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="text-center text-2xl font-bold text-orange-600 mt-2">{p}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-600 mb-2">Cálculo:</p>
          <div className="space-y-2">
            <div className="font-mono text-center">
              <span className="text-orange-700 font-bold">C({n}, {p})</span>
              <span className="text-gray-400"> = </span>
              <span className="text-orange-700">{n}! / ({p}! × {n - p}!)</span>
            </div>
            <div className="font-mono text-center text-sm text-gray-600">
              <span>= </span>
              <span className="text-orange-600">{formatNumber(arrResult)}</span>
              <span> / </span>
              <span className="text-orange-600">{formatNumber(
                Array.from({ length: p }, (_, i) => p - i).reduce((a, b) => a * b, 1)
              )}</span>
              <span> = </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-xl">
                {formatNumber(result)}
              </span>
            </div>
          </div>
        </div>

        {/* Comparison with Arrangement */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-blue-700 font-medium mb-1">Comparação:</p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Arranjo (ordem importa)</p>
              <p className="text-lg font-bold text-blue-700">{formatNumber(arrResult)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Combinação (ordem não importa)</p>
              <p className="text-lg font-bold text-orange-700">{formatNumber(result)}</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 text-center mt-2">
            C({n},{p}) = A({n},{p}) / {p}! = {formatNumber(arrResult)} / {formatNumber(
              Array.from({ length: p }, (_, i) => p - i).reduce((a, b) => a * b, 1)
            )} = {formatNumber(result)}
          </p>
        </div>

        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors mb-4"
        >
          {showDetail ? 'Ocultar' : 'Ver'} todas as combinações
        </button>

        {showDetail && combinations.length > 0 && (
          <div className="max-h-64 overflow-y-auto fade-in">
            <p className="text-sm text-gray-500 mb-2">Total: {combinations.length} combinações</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {combinations.map((comb, i) => (
                <div key={i} className="bg-orange-50 rounded-lg p-2 text-center font-mono text-sm text-orange-700">
                  {'{' + comb.join(', ') + '}'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Exemplos Práticos</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🍦 Sorveteria</h3>
            <p className="text-gray-600 text-sm">Escolher 3 sabores entre 10 disponíveis (a ordem não importa):</p>
            <p className="text-orange-600 font-mono mt-1">C(10, 3) = 10! / (3! × 7!) = 120 combinações</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🃏 Cartas</h3>
            <p className="text-gray-600 text-sm">Quantas mãos de 5 cartas podemos ter com um baralho de 52?</p>
            <p className="text-blue-600 font-mono mt-1">C(52, 5) = 52! / (5! × 47!) = 2.598.960 mãos</p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">👥 Comissão</h3>
            <p className="text-gray-600 text-sm">Formar uma comissão de 4 pessoas entre 12 disponíveis:</p>
            <p className="text-purple-600 font-mono mt-1">C(12, 4) = 12! / (4! × 8!) = 495 comissões</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🎰 Mega-Sena</h3>
            <p className="text-gray-600 text-sm">Escolher 6 números entre 60 (ordem não importa):</p>
            <p className="text-green-600 font-mono mt-1">C(60, 6) = 60! / (6! × 54!) = 50.063.860 combinações</p>
          </div>
        </div>
      </div>
    </div>
  );
}
