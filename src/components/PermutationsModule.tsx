import { useState } from 'react';
import { permutation, factorial, formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

export default function PermutationsModule({ onBack }: Props) {
  const [n, setN] = useState(4);
  const [elements, setElements] = useState<string[]>(['A', 'B', 'C', 'D']);
  const [showPermutations, setShowPermutations] = useState(false);
  const [repeatedGroups, setRepeatedGroups] = useState<{char: string, count: number}[]>([]);
  const [showRepetitionCalc, setShowRepetitionCalc] = useState(false);

  const generatePermutations = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const restPerms = generatePermutations(rest);
      for (const perm of restPerms) {
        result.push([arr[i], ...perm]);
      }
    }
    return result;
  };

  const updateElement = (index: number, value: string) => {
    const newElements = [...elements];
    newElements[index] = value.toUpperCase().slice(0, 1) || '?';
    setElements(newElements);
    setShowPermutations(false);
  };

  const addElement = () => {
    if (elements.length < 6) {
      const nextChar = String.fromCharCode(65 + elements.length);
      setElements([...elements, nextChar]);
      setN(elements.length + 1);
      setShowPermutations(false);
    }
  };

  const removeElement = () => {
    if (elements.length > 2) {
      setElements(elements.slice(0, -1));
      setN(elements.length - 1);
      setShowPermutations(false);
    }
  };

  const permutations = elements.length <= 6 ? generatePermutations(elements) : [];
  const result = permutation(n);

  const addRepeatedGroup = () => {
    setRepeatedGroups([...repeatedGroups, { char: 'A', count: 2 }]);
    setShowRepetitionCalc(false);
  };

  const updateRepeatedGroup = (index: number, field: 'char' | 'count', value: string | number) => {
    const newGroups = [...repeatedGroups];
    if (field === 'char') {
      newGroups[index].char = (value as string).toUpperCase().slice(0, 1);
    } else {
      newGroups[index].count = Math.max(1, Math.min(n, value as number));
    }
    setRepeatedGroups(newGroups);
    setShowRepetitionCalc(false);
  };

  const removeRepeatedGroup = (index: number) => {
    setRepeatedGroups(repeatedGroups.filter((_, i) => i !== index));
    setShowRepetitionCalc(false);
  };

  const repetitionResult = () => {
    const totalRepeated = repeatedGroups.reduce((sum, g) => sum + g.count, 0);
    if (totalRepeated > n) return 0;
    let denom = 1;
    for (const g of repeatedGroups) {
      denom *= factorial(g.count);
    }
    return Math.round(factorial(n) / denom);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔄</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Permutações</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Permutação é o ato de rearranjar todos os elementos de um conjunto. A permutação simples de n elementos é n!
        </p>
      </div>

      {/* Theory */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">📚 Teoria</h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-purple-50 rounded-xl p-4">
            <h3 className="font-semibold text-purple-800 mb-2">💡 O que é Permutação?</h3>
            <p>Permutação é o número de maneiras de <strong>organizar TODOS</strong> os elementos de um conjunto em uma sequência ordenada.</p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">🔢 Permutação Simples</h3>
            <div className="text-center text-xl font-mono font-bold text-indigo-700 mt-2">
              P(n) = n! = n × (n-1) × (n-2) × ... × 2 × 1
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p>• P(3) = 3! = 3 × 2 × 1 = <strong>6</strong></p>
              <p>• P(4) = 4! = 4 × 3 × 2 × 1 = <strong>24</strong></p>
              <p>• P(5) = 5! = 5 × 4 × 3 × 2 × 1 = <strong>120</strong></p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">🔁 Permutação com Repetição</h3>
            <p className="mb-2">Quando alguns elementos são iguais, dividimos pelo fatorial das repetições:</p>
            <div className="text-center text-lg font-mono font-bold text-green-700 mt-2">
              P(n; a₁, a₂, ...) = n! / (a₁! × a₂! × ...)
            </div>
            <p className="text-sm text-green-600 mt-2">
              Exemplo: Quantos anagramas tem a palavra ARARA? (5 letras, A aparece 3x, R aparece 2x)
            </p>
            <p className="text-sm text-green-700 font-mono mt-1">
              P(5; 3, 2) = 5! / (3! × 2!) = 120 / (6 × 2) = 10
            </p>
          </div>
        </div>
      </div>

      {/* Interactive - Simple Permutation */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧪 Permutação Simples - Interativa</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-3">Ajuste os elementos que deseja permutar:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {elements.map((el, i) => (
              <input
                key={i}
                type="text"
                value={el}
                onChange={(e) => updateElement(i, e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none bg-purple-50"
                maxLength={1}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={addElement} disabled={elements.length >= 6}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 disabled:opacity-50">
              + Elemento
            </button>
            <button onClick={removeElement} disabled={elements.length <= 2}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 disabled:opacity-50">
              − Elemento
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-600 mb-2">Cálculo:</p>
          <div className="flex flex-wrap items-center gap-1 text-lg font-mono">
            <span className="font-bold text-purple-700">P({n})</span>
            <span className="text-gray-400">=</span>
            <span className="font-bold text-purple-700">{n}!</span>
            <span className="text-gray-400">=</span>
            {Array.from({ length: n }, (_, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="text-gray-400 mx-1">×</span>}
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">{n - i}</span>
              </span>
            ))}
            <span className="text-gray-400">=</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-xl">
              {formatNumber(result)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowPermutations(!showPermutations)}
          className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
        >
          {showPermutations ? 'Ocultar' : 'Ver'} todas as permutações
        </button>

        {showPermutations && permutations.length > 0 && (
          <div className="mt-4 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-500 mb-2">Total: {permutations.length} permutações</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {permutations.map((perm, i) => (
                <div key={i} className="bg-purple-50 rounded-lg p-2 text-center font-mono text-sm text-purple-700">
                  {perm.join('')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Permutation with Repetition */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔁 Permutação com Repetição - Calculadora</h2>
        
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Número total de elementos (n):</label>
          <input
            type="number"
            min={2}
            max={10}
            value={n}
            onChange={(e) => { setN(parseInt(e.target.value) || 2); setShowRepetitionCalc(false); }}
            className="w-24 h-10 text-center border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">Grupos de elementos repetidos:</p>
          {repeatedGroups.map((group, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">Elemento:</span>
              <input
                type="text"
                value={group.char}
                onChange={(e) => updateRepeatedGroup(i, 'char', e.target.value)}
                className="w-12 h-8 text-center border border-green-200 rounded focus:border-green-500 focus:outline-none"
                maxLength={1}
              />
              <span className="text-sm text-gray-500">repete</span>
              <input
                type="number"
                min={1}
                max={n}
                value={group.count}
                onChange={(e) => updateRepeatedGroup(i, 'count', parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center border border-green-200 rounded focus:border-green-500 focus:outline-none"
              />
              <span className="text-sm text-gray-500">vezes</span>
              <button onClick={() => removeRepeatedGroup(i)} className="text-red-400 hover:text-red-600 ml-2">✕</button>
            </div>
          ))}
          <button onClick={addRepeatedGroup}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 mt-2">
            + Adicionar grupo repetido
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-600 mb-2">Fórmula:</p>
          <div className="text-center font-mono text-lg">
            <span className="text-green-700 font-bold">P({n}</span>
            {repeatedGroups.length > 0 && (
              <span className="text-green-600">; {repeatedGroups.map(g => g.count).join(', ')}</span>
            )}
            <span className="text-green-700 font-bold">)</span>
            <span className="text-gray-400"> = </span>
            <span className="text-green-700">{n}!</span>
            {repeatedGroups.length > 0 && (
              <>
                <span className="text-gray-400"> / </span>
                <span className="text-green-600">(
                  {repeatedGroups.map((g, i) => (
                    <span key={i}>
                      {i > 0 && ' × '}
                      {g.count}!
                    </span>
                  ))}
                )</span>
              </>
            )}
            <span className="text-gray-400"> = </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-xl">
              {formatNumber(repetitionResult())}
            </span>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-2">📝 Exemplos clássicos:</h3>
          <div className="space-y-2 text-sm">
            <p className="text-green-700">• Anagramas de <strong>ARARA</strong>: P(5; 3, 2) = 5!/(3!×2!) = <strong>10</strong></p>
            <p className="text-green-700">• Anagramas de <strong>AMAR</strong>: P(4; 2) = 4!/2! = <strong>12</strong></p>
            <p className="text-green-700">• Anagramas de <strong>OSSO</strong>: P(4; 2, 2) = 4!/(2!×2!) = <strong>6</strong></p>
            <p className="text-green-700">• Anagramas de <strong>MATEMÁTICA</strong>: P(10; 3, 2, 2) = 10!/(3!×2!×2!) = <strong>151.200</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
