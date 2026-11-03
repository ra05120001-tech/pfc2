import { useState } from 'react';
import { pfcWithRepetition, pfcWithoutRepetition, formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

export default function PFCModule({ onBack }: Props) {
  const [steps, setSteps] = useState<number[]>([10, 10, 10, 10]);
  const [allowRepetition, setAllowRepetition] = useState(true);
  const [showSolution, setShowSolution] = useState(false);

  const updateStep = (index: number, value: number) => {
    const newSteps = [...steps];
    newSteps[index] = Math.max(1, Math.min(36, value));
    setSteps(newSteps);
    setShowSolution(false);
  };

  const addStep = () => {
    if (steps.length < 8) {
      setSteps([...steps, 10]);
      setShowSolution(false);
    }
  };

  const removeStep = () => {
    if (steps.length > 2) {
      setSteps(steps.slice(0, -1));
      setShowSolution(false);
    }
  };

  const result = allowRepetition
    ? pfcWithRepetition(steps[0], steps.length)
    : pfcWithoutRepetition(steps[0], steps.length);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🧮</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Princípio Fundamental da Contagem</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          O PFC diz que se um evento pode ocorrer de n₁ maneiras, e para cada uma dessas o próximo evento pode ocorrer de n₂ maneiras, 
          o total de possibilidades é n₁ × n₂ × n₃ × ...
        </p>
      </div>

      {/* Theory Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">📚 Teoria</h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Ideia Central</h3>
            <p>Se temos uma sequência de decisões independentes, o número total de resultados possíveis é o <strong>produto</strong> do número de opções em cada decisão.</p>
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">🔢 Com Repetição</h3>
            <p>Se em cada etapa temos <strong>n</strong> opções e são <strong>p</strong> etapas:</p>
            <div className="text-center text-xl font-mono font-bold text-indigo-700 mt-2">
              Total = n × n × n × ... (p vezes) = n<sup>p</sup>
            </div>
            <p className="text-sm text-indigo-600 mt-2">Exemplo: Senha de 4 dígitos (0-9) = 10⁴ = 10.000</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">🚫 Sem Repetição</h3>
            <p>Se em cada etapa as opções diminuem (não podemos repetir):</p>
            <div className="text-center text-xl font-mono font-bold text-green-700 mt-2">
              Total = n × (n-1) × (n-2) × ... × (n-p+1)
            </div>
            <p className="text-sm text-green-600 mt-2">Exemplo: Senha de 4 dígitos sem repetir (0-9) = 10×9×8×7 = 5.040</p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧪 Calculadora Interativa</h2>
        
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowRepetition}
              onChange={(e) => { setAllowRepetition(e.target.checked); setShowSolution(false); }}
              className="w-5 h-5 rounded text-indigo-600"
            />
            <span className="text-gray-700 font-medium">
              {allowRepetition ? '✅ Permite repetição' : '🚫 Não permite repetição'}
            </span>
          </label>
        </div>

        <div className="space-y-3 mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-24">Etapa {index + 1}:</span>
              <input
                type="range"
                min="1"
                max="36"
                value={step}
                onChange={(e) => updateStep(index, parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="w-12 text-right font-bold text-indigo-600">{step}</span>
              <span className="text-sm text-gray-400">opções</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={addStep}
            disabled={steps.length >= 8}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 disabled:opacity-50 transition-colors"
          >
            + Adicionar etapa
          </button>
          <button
            onClick={removeStep}
            disabled={steps.length <= 2}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 disabled:opacity-50 transition-colors"
          >
            − Remover etapa
          </button>
        </div>

        {/* Visual representation */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Visualização do cálculo:</h3>
          <div className="flex flex-wrap items-center gap-2">
            {allowRepetition ? (
              steps.map((step, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-gray-400 font-bold">×</span>}
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold">
                    {step}
                  </span>
                </span>
              ))
            ) : (
              steps.map((_, i) => {
                const value = steps[0] - i;
                return (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gray-400 font-bold">×</span>}
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold">
                      {value > 0 ? value : 0}
                    </span>
                  </span>
                );
              })
            )}
            <span className="text-gray-400 font-bold">=</span>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-lg font-bold text-lg">
              {formatNumber(result)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowSolution(true)}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Calcular Total de Possibilidades
        </button>

        {showSolution && (
          <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 success-bounce">
            <div className="text-center">
              <p className="text-gray-600 mb-1">Total de possibilidades:</p>
              <p className="text-3xl font-bold text-indigo-700">{formatNumber(result)}</p>
              <p className="text-sm text-gray-500 mt-2">
                {allowRepetition
                  ? `Com ${steps.length} etapas de ${steps[0]} opções cada (com repetição) = ${steps[0]}^${steps.length}`
                  : `Com ${steps.length} etapas a partir de ${steps[0]} opções (sem repetição)`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Exemplos Práticos</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🍦 Sorveteria</h3>
            <p className="text-gray-600 text-sm">Uma sorveteria oferece 5 sabores e 3 coberturas. De quantas formas posso pedir um sorvete?</p>
            <p className="text-blue-600 font-mono mt-1">5 × 3 = 15 combinações</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">👕 Roupa</h3>
            <p className="text-gray-600 text-sm">Tenho 4 camisas, 3 calças e 2 sapatos. Quantas combinações de roupa posso fazer?</p>
            <p className="text-green-600 font-mono mt-1">4 × 3 × 2 = 24 combinações</p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🔢 Placa de Carro</h3>
            <p className="text-gray-600 text-sm">Uma placa tem 3 letras (26 opções) e 4 números (10 opções). Quantas placas existem?</p>
            <p className="text-purple-600 font-mono mt-1">26³ × 10⁴ = 175.760.000 placas</p>
          </div>
          <div className="border-l-4 border-orange-400 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">🍕 Pizza</h3>
            <p className="text-gray-600 text-sm">Uma pizzaria oferece 8 sabores. Posso escolher 2 massas e 1 tamanho. Quantas opções?</p>
            <p className="text-orange-600 font-mono mt-1">8 × 2 × 1 = 16 opções (se massa e tamanho forem fixos)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
