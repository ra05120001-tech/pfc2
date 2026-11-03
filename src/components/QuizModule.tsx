import { useState } from 'react';
import { formatNumber } from '../utils/math';

interface Props {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Uma senha de 4 dígitos (0-9) permite repetição. Quantas senhas diferentes existem?',
    options: ['4.000', '10.000', '5.040', '40.000'],
    correctIndex: 1,
    explanation: 'PFC com repetição: 10 × 10 × 10 × 10 = 10⁴ = 10.000',
    topic: 'PFC',
  },
  {
    id: 2,
    question: 'De quantas formas 5 pessoas podem se organizar em uma fila?',
    options: ['25', '120', '60', '20'],
    correctIndex: 1,
    explanation: 'Permutação simples: P(5) = 5! = 5 × 4 × 3 × 2 × 1 = 120',
    topic: 'Permutação',
  },
  {
    id: 3,
    question: 'Quantos anagramas tem a palavra ARARA?',
    options: ['120', '60', '10', '20'],
    correctIndex: 2,
    explanation: 'Permutação com repetição: P(5; 3, 2) = 5!/(3! × 2!) = 120/12 = 10',
    topic: 'Permutação',
  },
  {
    id: 4,
    question: 'De quantas formas podemos escolher 3 livros entre 8 para levar numa viagem? (A ordem não importa)',
    options: ['336', '56', '24', '8'],
    correctIndex: 1,
    explanation: 'Combinação: C(8, 3) = 8!/(3! × 5!) = (8×7×6)/(3×2×1) = 56',
    topic: 'Combinação',
  },
  {
    id: 5,
    question: 'Quantas senhas de 3 dígitos (0-9) podemos criar SEM repetir nenhum dígito?',
    options: ['1.000', '720', '504', '240'],
    correctIndex: 1,
    explanation: 'Arranjo: A(10, 3) = 10 × 9 × 8 = 720',
    topic: 'Arranjo',
  },
  {
    id: 6,
    question: 'Em uma eleição com 6 candidatos, de quantas formas podemos escolher presidente e vice?',
    options: ['15', '30', '36', '720'],
    correctIndex: 1,
    explanation: 'Arranjo: A(6, 2) = 6 × 5 = 30 (a ordem importa: presidente ≠ vice)',
    topic: 'Arranjo',
  },
  {
    id: 7,
    question: 'Quantas combinações diferentes existem na Mega-Sena (escolher 6 entre 60)?',
    options: ['50.063.860', '42.312.720', '30.240', '1.000.000'],
    correctIndex: 0,
    explanation: 'C(60, 6) = 60!/(6! × 54!) = 50.063.860',
    topic: 'Combinação',
  },
  {
    id: 8,
    question: 'Um restaurante oferece 4 entradas, 5 pratos principais e 3 sobremesas. De quantas formas posso fazer uma refeição completa?',
    options: ['12', '60', '120', '360'],
    correctIndex: 1,
    explanation: 'PFC: 4 × 5 × 3 = 60 combinações de refeição',
    topic: 'PFC',
  },
  {
    id: 9,
    question: 'Quantos subconjuntos de 2 elementos podemos formar com o conjunto {A, B, C, D, E}?',
    options: ['20', '10', '25', '60'],
    correctIndex: 1,
    explanation: 'Combinação: C(5, 2) = 5!/(2! × 3!) = (5×4)/(2×1) = 10',
    topic: 'Combinação',
  },
  {
    id: 10,
    question: 'Quantas placas de carro podemos formar com 3 letras (26 opções) e 4 algarismos (10 opções)?',
    options: ['175.760', '175.760.000', '360.000', '26.000.000'],
    correctIndex: 1,
    explanation: 'PFC: 26³ × 10⁴ = 17.576 × 10.000 = 175.760.000',
    topic: 'PFC',
  },
  {
    id: 11,
    question: 'A diferença fundamental entre Arranjo e Combinação é:',
    options: [
      'O arranjo usa mais elementos',
      'No arranjo a ordem importa, na combinação não',
      'A combinação permite repetição',
      'Não há diferença prática'
    ],
    correctIndex: 1,
    explanation: 'Arranjo: escolhe E ordena (ordem importa). Combinação: só escolhe (ordem não importa).',
    topic: 'Teoria',
  },
  {
    id: 12,
    question: 'Quantas palavras de 4 letras distintas podemos formar com as 26 letras do alfabeto?',
    options: ['358.800', '456.976', '14.950', '26.000'],
    correctIndex: 0,
    explanation: 'Arranjo: A(26, 4) = 26 × 25 × 24 × 23 = 358.800 (sem repetição)',
    topic: 'Arranjo',
  },
];

export default function QuizModule({ onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
      setAnsweredQuestions(prev => [...prev, question.id]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizFinished(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'Perfeito! Você é um mestre em Análise Combinatória!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excelente! Você domina muito bem o assunto!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Bom trabalho! Continue estudando para melhorar!' };
    if (percentage >= 40) return { emoji: '📚', message: 'Regular. Revise os conceitos e tente novamente!' };
    return { emoji: '💪', message: 'Não desista! Revise a teoria e pratique mais!' };
  };

  if (quizFinished) {
    const { emoji, message } = getScoreMessage();
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Finalizado!</h1>
          <p className="text-xl text-gray-600 mb-6">{message}</p>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
            <p className="text-gray-600 mb-1">Sua pontuação:</p>
            <p className="text-5xl font-bold text-indigo-600">{score}/{questions.length}</p>
            <p className="text-gray-500 mt-2">
              ({Math.round((score / questions.length) * 100)}% de acerto)
            </p>
          </div>

          {/* Review */}
          <div className="text-left mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Revisão das questões:</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {questions.map((q, i) => (
                <div key={q.id} className={`flex items-center gap-3 p-2 rounded-lg ${
                  answeredQuestions.includes(q.id) ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    answeredQuestions.includes(q.id) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {answeredQuestions.includes(q.id) ? '✓' : '✕'}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">{q.question.substring(0, 60)}...</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{q.topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              🔄 Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📝</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz de Revisão</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Teste seus conhecimentos em Análise Combinatória com {questions.length} questões!
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Questão {currentQuestion + 1} de {questions.length}</span>
          <span className="text-sm font-medium text-indigo-600">Pontos: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
            {question.topic}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
            
            if (showResult) {
              if (index === question.correctIndex) {
                buttonClass = 'border-green-500 bg-green-50';
              } else if (index === selectedAnswer && index !== question.correctIndex) {
                buttonClass = 'border-red-500 bg-red-50';
              } else {
                buttonClass = 'border-gray-200 opacity-50';
              }
            } else if (index === selectedAnswer) {
              buttonClass = 'border-indigo-500 bg-indigo-50';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all ${buttonClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult && index === question.correctIndex
                      ? 'bg-green-500 text-white'
                      : showResult && index === selectedAnswer && index !== question.correctIndex
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-gray-700">{option}</span>
                  {showResult && index === question.correctIndex && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctIndex && (
                    <span className="ml-auto text-red-500">✕</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`mt-4 rounded-xl p-4 fade-in ${
            selectedAnswer === question.correctIndex ? 'bg-green-50' : 'bg-orange-50'
          }`}>
            <p className={`font-bold ${
              selectedAnswer === question.correctIndex ? 'text-green-700' : 'text-orange-700'
            }`}>
              {selectedAnswer === question.correctIndex ? '🎉 Correto!' : '📖 Explicação:'}
            </p>
            <p className={`text-sm mt-1 ${
              selectedAnswer === question.correctIndex ? 'text-green-600' : 'text-orange-600'
            }`}>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showResult && (
          <button
            onClick={nextQuestion}
            className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima Questão →' : 'Ver Resultado Final'}
          </button>
        )}
      </div>

      {/* Question navigator */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Navegação rápida:</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestion(i);
                setSelectedAnswer(null);
                setShowResult(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i === currentQuestion
                  ? 'bg-indigo-500 text-white'
                  : answeredQuestions.includes(q.id)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
