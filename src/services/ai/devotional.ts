import { getCacheKey, getFromCache, setToCache } from './cache';

export interface DevotionalRequest {
  planoAtual?: string;
  historicoUsuario?: string;
  tempoDisponivel?: string;
  temaOuEmocao?: string;
}

export interface DevotionalResponse {
  versiculoDoDia: {
    referencia: string;
    texto: string;
  };
  reflexao: string;
  aplicacao: string;
  oracao: string;
  desafioPratico: string;
  leituraComplementar: string;
}

export async function generateAiDevotional(req: DevotionalRequest, forceRefresh = false): Promise<DevotionalResponse> {
  const cacheKey = getCacheKey('devotional', req);

  if (!forceRefresh) {
    const cached = getFromCache<DevotionalResponse>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch('/api/ai/devotional', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao gerar devocional com IA.');
  }

  const data = await response.json();
  const devotionalResult: DevotionalResponse = data.devotional;

  setToCache(cacheKey, devotionalResult);
  return devotionalResult;
}
