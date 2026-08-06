import { getCacheKey, getFromCache, setToCache } from './cache';

export interface ImageRequest {
  tipo: 'capa' | 'mapa' | 'linhaDoTempo' | 'objeto' | 'cidade' | 'templo' | 'infografico' | 'ilustracao' | 'decorativo';
  descricao: string;
  estilo?: string;
  resolucao?: '16:9' | '1:1' | '9:16' | '4:3' | '3:4' | '2:3' | '3:2' | string;
}

export interface ImageResponse {
  imageUrl: string;
  titulo: string;
  descricao: string;
  avisoIsencao: string;
  usedRealGenerator: boolean;
  estilo?: string;
  resolucao?: string;
}

const ALLOWED_TIPOS = [
  'capa',
  'mapa',
  'linhaDoTempo',
  'objeto',
  'cidade',
  'templo',
  'infografico',
  'ilustracao',
  'decorativo',
];

const ALLOWED_RESOLUTIONS = ['16:9', '1:1', '9:16', '4:3', '3:4', '2:3', '3:2'];

/**
 * Normalizes and ensures the raw image URL payload is a safe string (Data URL, HTTP URL, or Blob URL).
 */
function normalizeImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  const trimmed = rawUrl.trim();

  // If it's already a Data URL or HTTP/HTTPS URL or Blob URL, return as-is
  if (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // If it's raw base64 without prefix, prepend base64 PNG data header
  if (/^[A-Za-z0-9+/=]+$/.test(trimmed.slice(0, 100))) {
    return `data:image/png;base64,${trimmed}`;
  }

  return trimmed;
}

export async function generateAiImage(req: ImageRequest, forceRefresh = false): Promise<ImageResponse> {
  // 1. Client-side input validation
  if (!req || typeof req !== 'object') {
    throw new Error('Parâmetros de requisição inválidos.');
  }

  const descricao = typeof req.descricao === 'string' ? req.descricao.trim() : '';
  if (!descricao) {
    throw new Error('A descrição da imagem é obrigatória e não pode estar vazia.');
  }
  if (descricao.length < 3) {
    throw new Error('A descrição da imagem deve conter pelo menos 3 caracteres.');
  }

  const tipo = ALLOWED_TIPOS.includes(req.tipo) ? req.tipo : 'ilustracao';
  const estilo = typeof req.estilo === 'string' && req.estilo.trim() ? req.estilo.trim() : 'Arte Sacra Histórica';
  const resolucao = ALLOWED_RESOLUTIONS.includes(req.resolucao || '') ? req.resolucao : '16:9';

  const sanitizedReq: ImageRequest = {
    tipo,
    descricao,
    estilo,
    resolucao,
  };

  // 2. Cache lookup
  const cacheKey = getCacheKey('image', sanitizedReq);
  if (!forceRefresh) {
    const cached = getFromCache<ImageResponse>(cacheKey);
    if (cached && cached.imageUrl) {
      return cached;
    }
  }

  // 3. API Dispatch
  const response = await fetch('/api/ai/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sanitizedReq),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro (${response.status}) ao comunicar com o servidor de IA.`);
  }

  const data = await response.json();
  if (!data || !data.imageUrl) {
    throw new Error('O servidor não retornou uma imagem válida.');
  }

  // 4. Normalize image URL payload (Data URL / Blob / HTTPS)
  const safeImageUrl = normalizeImageUrl(data.imageUrl);

  const imageResult: ImageResponse = {
    imageUrl: safeImageUrl,
    titulo: data.titulo || 'Ilustração Bíblica',
    descricao: data.descricao || 'Conceito visual gerado para meditação bíblica.',
    avisoIsencao: data.avisoIsencao || 'Esta imagem é uma ilustração conceitual gerada por Inteligência Artificial.',
    usedRealGenerator: !!data.usedRealGenerator,
    estilo: data.estilo || sanitizedReq.estilo,
    resolucao: data.resolucao || sanitizedReq.resolucao,
  };

  setToCache(cacheKey, imageResult);
  return imageResult;
}


