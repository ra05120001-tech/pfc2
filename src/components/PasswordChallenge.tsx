import { useState, useCallback } from 'react';
import { pfcWithRepetition, pfcWithoutRepetition, arrangement, formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

interface Level {
  id: number;
  title: string;
  description: string;
  passwordLength: number;
  availableDigits: number;
  allowRepetition: boolean;
  hint: string;
  formula: string;
  answer: number;
}

const levels: Level[] = [
  {
    id: 1,
    title: 'Nível 1 - Cadeado Simples',
    description: 'Um cadeado tem 4 rodas, cada uma com dígitos de 0 a 9. Os dígitos PODEM se repetir. Quantas senhas diferentes existem?',
    passwordLength: 4,
    availableDigits: 10,
    allowRepetition: true,
    hint: 'Cada posição tem 10 opções. Pelo PFC: multiplique as opções de cada posição.',
    formula: '10 × 10 × 10 × 10 = 10⁴',
    answer: 10000,
  },
  {
    id: 2,
    title: 'Nível 2 - Senha sem Repetição',
    description: 'Uma senha de 4 dígitos (0-9) onde os dígitos NÃO podem se repetir. Quantas senhas diferentes são possíveis?',
    passwordLength: 4,
    availableDigits: 10,
    allowRepetition: false,
    hint: 'Na 1ª posição: 10 opções. Na 2ª: 9 (uma já foi usada). Na 3ª: 8. Na 4ª: 7.',
    formula: '10 × 9 × 8 × 7 = A(10,4)',
    answer: 5040,
  },
  {
    id: 3,
    title: 'Nível 3 - Senha Alfanumérica',
    description: 'Uma senha de 3 caracteres usando letras (A-F, 6 opções) e números (0-9, 10 opções), totalizando 16 caracteres possíveis. Pode repetir. Quantas senhas?',
    passwordLength: 3,
    availableDigits: 16,
    allowRepetition: true,
    hint: 'São 16 opções para cada uma das 3 posições. Use PFC com repetição.',
    formula: '16 × 16 × 16 = 16³',
    answer: 4096,
  },
  {
    id: 4,
    title: 'Nível 4 - Senha de 6 dígitos',
    description: 'Um banco usa senhas de 6 dígitos (0-9) com repetição permitida. Quantas senhas diferentes existem?',
    passwordLength: 6,
    availableDigits: 10,
    allowRepetition: true,
    hint: 'São 10 opções para cada uma das 6 posições.',
    formula: '10⁶ = 10 × 10 × 10 × 10 × 10 × 10',
    answer: 1000000,
  },
  {
    id: 5,
    title: 'Nível 5 - PIN sem repetição',
    description: 'Um PIN de 5 dígitos (0-9) onde NENHUM dígito pode se repetir. Quantos PINs diferentes são possíveis?',
    passwordLength: 5,
    availableDigits: 10,
    allowRepetition: false,
    hint: 'É um arranjo! A(10,5) = 10 × 9 × 8 × 7 × 6',
    formula: 'A(10, 5) = 10!/5!',
    answer: 30240,
  },
  {
    id: 6,
    title: 'Nível 6 - Senha com Restrição',
    description: 'Uma senha de 4 dígitos (0-9) com repetição, mas o primeiro dígito NÃO pode ser 0. Quantas senhas são possíveis?',
    passwordLength: 4,
    availableDigits: 10,
    allowRepetition: true,
    hint: 'Primeira posição: 9 opções (1-9). Demais posições: 10 opções cada.',
    formula: '9 × 10 × 10 × 10',
    answer: 9000,
  },
  {
    id: 7,
    title: 'Nível 7 - Senha Complexa',
    description: 'Uma senha de 4 posições usando apenas os dígitos 1, 2, 3, 4, 5 (sem repetição). Quantas senhas? (Dica: é uma permutação parcial!)',
    passwordLength: 4,
    availableDigits: 5,
    allowRepetition: false,
    hint: 'A(5,4) = 5 × 4 × 3 × 2 = 5!/1!',
    formula: 'A(5, 4) = 5!/1!',
    answer: 120,
  },
  {
    id: 8,
    title: 'Nível 8 - Desafio Final',
    description: 'Uma senha de 8 caracteres usando 26 letras minúsculas, com repetição permitida. Quantas senhas possíveis? (Responda em notação científica ou exato)',
    passwordLength: 8,
    availableDigits: 26,
    allowRepetition: true,
    hint: '26⁸ - Cada posição tem 26 opções e são 8 posições.',
    formula: '26⁸',
    answer: 208827064576,
  },
];

export default function PasswordChallenge({ onBack }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  const level = levels[currentLevel];

  const checkAnswer = useCallback(() => {
    const userNum = parseFloat(userAnswer.replace(/\./g, '').replace(',', '.'));
    setAttempts(prev => prev + 1);
    
    if (Math.abs(userNum - level.answer) < 1 || userNum === level.answer) {
      setFeedback('correct');
      if (!completedLevels.includes(level.id)) {
        setScore(prev => prev + (attempts === 0 ? 10 : attempts < 2 ? 7 : 5));
        setCompletedLevels(prev => [...prev, level.id]);
      }
    } else {
      setFeedback('wrong');
    }
  }, [userAnswer, level, completedLevels, attempts]);

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowFormula(false);
      setAttempts(0);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowFormula(false);
      setAttempts(0);
    }
  };

  const resetAll = () => {
    setCurrentLevel(0);
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    setShowFormula(false);
    setScore(0);
    setCompletedLevels([]);
    setAttempts(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔐</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Desafio da Senha</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Calcule quantas senhas diferentes são possíveis em cada nível. Use seus conhecimentos de PFC, Arranjos e Permutações!
        </p>
      </div>

      {/* Score Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Pontuação</p>
              <p className="text-2xl font-bold text-indigo-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Completos</p>
              <p className="text-2xl font-bold text-green-600">{completedLevels.length}/{levels.length}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {levels.map((l, i) => (
              <div
                key={l.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  completedLevels.includes(l.id)
                    ? 'bg-green-500 text-white'
                    : i === currentLevel
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {completedLevels.includes(l.id) ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button
            onClick={resetAll}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Level Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{level.title}</h2>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            Nível {currentLevel + 1}/{levels.length}
          </span>
        </div>

        {/* Problem */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-gray-700 text-lg">{level.description}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              📏 {level.passwordLength} dígitos
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              🔢 {level.availableDigits} opções por posição
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              level.allowRepetition 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {level.allowRepetition ? '✅ Pode repetir' : '🚫 Sem repetição'}
            </span>
          </div>
        </div>

        {/* Visual representation */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-indigo-700 font-medium mb-2">Visualização das posições:</p>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: level.passwordLength }, (_, i) => (
              <div key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-indigo-300 text-sm">×</span>}
                <div className="bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 text-center">
                  <div className="text-lg font-bold text-indigo-600">
                    {level.allowRepetition ? level.availableDigits : level.availableDigits - i}
                  </div>
                  <div className="text-xs text-indigo-400">pos. {i + 1}</div>
                </div>
              </div>
            ))}
            <span className="text-indigo-400 text-xl">=</span>
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold text-yellow-700">?</div>
              <div className="text-xs text-yellow-600">total</div>
            </div>
          </div>
        </div>

        {/* Answer Input */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Sua resposta (número total de senhas possíveis):</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => { setUserAnswer(e.target.value); setFeedback(null); }}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Digite o número..."
              className="flex-1 h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <button
              onClick={checkAnswer}
              className="px-6 h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Verificar
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback === 'correct' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 success-bounce">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <p className="font-bold text-green-700">Correto! Parabéns!</p>
                <p className="text-sm text-green-600">
                  A resposta é {formatNumber(level.answer)} senhas diferentes.
                  {attempts === 0 && ' (+10 pontos - acertou de primeira!)'}
                  {attempts > 0 && attempts < 2 && ' (+7 pontos)'}
                  {attempts >= 2 && ' (+5 pontos)'}
                </p>
              </div>
            </div>
          </div>
        )}

        {feedback === 'wrong' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 shake">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❌</span>
              <div>
                <p className="font-bold text-red-700">Incorreto! Tente novamente.</p>
                <p className="text-sm text-red-600">
                  Dica: Releia o problema e pense em qual fórmula usar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hint & Formula */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
          >
            💡 {showHint ? 'Ocultar' : 'Ver'} Dica
          </button>
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            📐 {showFormula ? 'Ocultar' : 'Ver'} Fórmula
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-50 rounded-xl p-4 mb-4 fade-in">
            <p className="text-yellow-800"><strong>💡 Dica:</strong> {level.hint}</p>
          </div>
        )}

        {showFormula && (
          <div className="bg-blue-50 rounded-xl p-4 mb-4 fade-in">
            <p className="text-blue-800"><strong>📐 Fórmula:</strong></p>
            <p className="text-blue-700 font-mono text-lg mt-1">{level.formula}</p>
            <p className="text-blue-600 text-sm mt-1">
              {level.allowRepetition
                ? `PFC com repetição: ${level.availableDigits}^${level.passwordLength} = ${formatNumber(level.answer)}`
                : `Arranjo A(${level.availableDigits}, ${level.passwordLength}) = ${formatNumber(level.answer)}`
              }
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevLevel}
          disabled={currentLevel === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Nível Anterior
        </button>
        <button
          onClick={nextLevel}
          disabled={currentLevel === levels.length - 1}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Próximo Nível →
        </button>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Resumo dos Níveis</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2">Nível</th>
                <th className="text-left py-2 px-2">Tipo</th>
                <th className="text-center py-2 px-2">Posições</th>
                <th className="text-center py-2 px-2">Opções</th>
                <th className="text-center py-2 px-2">Repete?</th>
                <th className="text-center py-2 px-2">Fórmula</th>
                <th className="text-right py-2 px-2">Resposta</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((l, i) => (
                <tr key={l.id} className={`border-b border-gray-100 ${i === currentLevel ? 'bg-indigo-50' : ''}`}>
                  <td className="py-2 px-2 font-medium">{i + 1}</td>
                  <td className="py-2 px-2 text-gray-600">{l.title.split(' - ')[1]}</td>
                  <td className="py-2 px-2 text-center">{l.passwordLength}</td>
                  <td className="py-2 px-2 text-center">{l.availableDigits}</td>
                  <td className="py-2 px-2 text-center">{l.allowRepetition ? '✅' : '🚫'}</td>
                  <td className="py-2 px-2 text-center font-mono text-xs">{l.formula}</td>
                  <td className="py-2 px-2 text-right font-bold text-indigo-600">
                    {completedLevels.includes(l.id) ? formatNumber(l.answer) : '???'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
