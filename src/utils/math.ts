// Funções matemáticas para Análise Combinatória

export function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Permutação simples: P(n) = n!
export function permutation(n: number): number {
  return factorial(n);
}

// Arranjo: A(n,p) = n! / (n-p)!
export function arrangement(n: number, p: number): number {
  if (p > n) return 0;
  return factorial(n) / factorial(n - p);
}

// Combinação: C(n,p) = n! / (p! * (n-p)!)
export function combination(n: number, p: number): number {
  if (p > n) return 0;
  return factorial(n) / (factorial(p) * factorial(n - p));
}

// PFC com repetição: n^p
export function pfcWithRepetition(n: number, p: number): number {
  return Math.pow(n, p);
}

// PFC sem repetição: n * (n-1) * (n-2) * ... * (n-p+1)
export function pfcWithoutRepetition(n: number, p: number): number {
  let result = 1;
  for (let i = 0; i < p; i++) {
    result *= (n - i);
  }
  return result;
}

// Formatar número com separadores de milhar
export function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}
