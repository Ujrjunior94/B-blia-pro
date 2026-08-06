import { getCacheKey, getFromCache, setToCache } from './cache';

export interface PlanRequest {
  tipo?: 'tema' | 'emocao' | 'personagem' | 'livro' | 'palavraChave' | 'quantidadeDias';
  valor?: string;
  dias?: number;
  topic?: string;
}

export interface PlanDay {
  dia: number;
  titulo: string;
  passageRef: string;
  bookId: string;
  chapter: number;
  verses?: string;
  reflexao: string;
  oracao?: string;
  desafioDiario?: string;
}

export interface PlanResponse {
  titulo: string;
  descricao: string;
  objetivo: string;
  tema: string;
  cronograma: PlanDay[];
}

export async function generateAiReadingPlan(req: PlanRequest, forceRefresh = false): Promise<PlanResponse> {
  const cacheKey = getCacheKey('plan', req);

  if (!forceRefresh) {
    const cached = getFromCache<PlanResponse>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch('/api/ai/reading-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao gerar plano de leitura com IA.');
  }

  const data = await response.json();
  const planResult: PlanResponse = data.plan;

  setToCache(cacheKey, planResult);
  return planResult;
}
