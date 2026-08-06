import { getCacheKey, getFromCache, setToCache } from './cache';

export interface StudyRequest {
  tema: string;
  livro?: string;
  capitulo?: number;
  versiculos?: string;
  duracao?: string;
  nivelUsuario?: string;
  objetivoEstudo?: string;
}

export interface StudyResponse {
  titulo: string;
  resumo: string;
  introducao: string;
  contextoHistorico: string;
  contextoGeografico?: string;
  personagens?: string[];
  analiseTexto: string;
  palavrasChave: string[];
  referenciasCruzadas: string[];
  aplicacoesPraticas: string[];
  perguntasReflexao: string[];
  oracaoSugerida: string;
  planoComplementar?: string;
  fontesBiblicas: string[];
}

export async function generateAiStudy(req: StudyRequest, forceRefresh = false): Promise<StudyResponse> {
  const cacheKey = getCacheKey('study', req);

  if (!forceRefresh) {
    const cached = getFromCache<StudyResponse>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch('/api/ai/study', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Erro ao gerar estudo bíblico com IA.');
  }

  const data = await response.json();
  const studyResult: StudyResponse = data.study;

  setToCache(cacheKey, studyResult);
  return studyResult;
}
