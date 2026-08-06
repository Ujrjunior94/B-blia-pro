import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { getStrongEntry } from './src/data/strongsLexicon';
import { getBookStudyGuide } from './src/data/bibleJourneyData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Initialize Gemini AI client lazily/safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não foi configurada nos segredos.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Jornada da Bíblia', timestamp: new Date().toISOString() });
  });

  // Strong's Lookup API
  app.get('/api/theology/strongs/:id', (req, res) => {
    const strongId = req.params.id;
    const entry = getStrongEntry(strongId);
    if (entry) {
      res.json({ success: true, entry });
    } else {
      res.status(404).json({ success: false, message: `Número de Strong ${strongId} não encontrado.` });
    }
  });

  // Book Study Guide Lookup API
  app.get('/api/theology/book-study/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const study = getBookStudyGuide(bookId);
    res.json({ success: true, study });
  });

  // AI Theological Assistant Chat Endpoint
  app.post('/api/theology/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Mensagem inválida.' });
        return;
      }

      const ai = getAiClient();
      const systemInstruction = `Você é um Teólogo e Educador Cristão Sênior especializado no aplicativo "Jornada da Bíblia".
Seu conhecimento bíblico é profundo, preciso, exegético e puramente centrado em Jesus Cristo e na história da redenção.
Você domina os 66 livros da Bíblia canônica, línguas originais (Hebraico, Aramaico e Grego Koiné), história do Oriente Próximo, contexto cultural do século I e hermenêutica reformada.

Instruções de Estilo e Resposta:
- Linguagem pastoral, didática, acolhedora, respeitosa e clara em Português do Brasil.
- Evite jargões desnecessários, mas explique com precisão palavras originais quando relevante.
- Mantenha SEMPRE o foco na Pessoa e Obra de Jesus Cristo (Cristocentrismo).
- Sempre inclua: 1. Contexto bíblico/histórico, 2. Análise do texto/palavra original (se aplicável), 3. Como o assunto aponta para Cristo, 4. Aplicação prática para a vida espiritual do leitor.`;

      // Build conversation or single prompt
      const prompt = `Pergunta do leitor da Bíblia: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Não foi possível gerar uma resposta teológica no momento.';
      res.json({ success: true, reply: replyText });
    } catch (error: any) {
      console.error('Erro no assistente teológico:', error);
      res.status(500).json({
        error: error.message || 'Erro ao processar consulta teológica.',
        details: 'Verifique se a chave GEMINI_API_KEY está configurada no painel de Segredos.',
      });
    }
  });

  // AI Verse Exegesis & Explanation Endpoint
  app.post('/api/theology/verse-explain', async (req, res) => {
    try {
      const { bookName, chapter, verse, verseText } = req.body;
      const ai = getAiClient();

      const prompt = `Forneça um estudo exegético e devocional profundo do versículo ${bookName} ${chapter}:${verse}:
"${verseText}"

Estruture a resposta em 4 tópicos claros com marcação Markdown:
1. **Contexto Histórico e Literário**: Quem escreveu, para quem e em que momento.
2. **Estudo de Palavras Originais**: Palavras-chave em Hebraico/Grego e seus significados lexicais ricos.
3. **Cristocentrismo**: Como este versículo se conecta ao plano de salvação em Jesus Cristo.
4. **Aplicação Prática**: Como o cristão de hoje deve viver esta verdade no cotidiano.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Você é um expositor bíblico erudito e pastoral focado no aplicativo Jornada da Bíblia.',
        },
      });

      res.json({ success: true, explanation: response.text });
    } catch (error: any) {
      console.error('Erro na exegese de versículo:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar exegese.' });
    }
  });

  // AI Artistic Illustration Generator Endpoint
  app.post('/api/theology/generate-illustration', async (req, res) => {
    try {
      const { bookId, chapter, style } = req.body;
      if (!bookId || !chapter) {
        res.status(400).json({ error: 'Livro e capítulo são obrigatórios.' });
        return;
      }

      const ai = getAiClient();
      const styleName = style || 'Pintura Clássica a Óleo';

      // 1. Generate visual concept metadata using gemini-3.6-flash
      const promptText = `Crie o conceito de ilustração artística para o livro da Bíblia "${bookId}", capítulo ${chapter} no estilo "${styleName}".
Forneça detalhes teológicos profundos de como os elementos visuais simbolizam a obra redentora de Deus em Cristo Jesus.`;

      const metadataResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um curador de arte sacra, teólogo e exégeta especializado em conceber imagens com alta profundidade simbólica e bíblica baseadas em passagens bíblicas. Suas respostas devem ser exclusivamente em formato JSON válido.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              englishArtPrompt: {
                type: Type.STRING,
                description: 'A detailed, poetic and descriptive single-sentence image generation prompt in English, describing the visual setup, lighting, and elements, optimized for an AI image generator (e.g. Imagen 3). Mention the specific art style requested. Do not include text, signature or watermarks.'
              },
              portugueseTitle: {
                type: Type.STRING,
                description: 'A beautiful, majestic title in Portuguese for this artwork.'
              },
              portugueseArtPromptDesc: {
                type: Type.STRING,
                description: 'A poetic and descriptive summary in Portuguese of the artistic scene we are generating.'
              },
              theologicalMeaning: {
                type: Type.STRING,
                description: 'A deep, 2-3 sentence theological exegesis of the visual elements, explaining how the scenery, colors, or subjects symbolize God\'s attributes or point directly to Christ Jesus (Christocentrism).'
              },
              unsplashSearchKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 to 4 precise English nouns for finding a high-quality atmospheric Unsplash photo matching this event (e.g. ["shepherd", "pasture", "glowing-light"]).'
              }
            },
            required: ['englishArtPrompt', 'portugueseTitle', 'portugueseArtPromptDesc', 'theologicalMeaning', 'unsplashSearchKeywords']
          }
        }
      });

      const metadata = JSON.parse(metadataResponse.text || '{}');

      // 2. Try to generate real image using gemini-3.1-flash-lite-image
      let imageBase64: string | null = null;
      let usedRealGenerator = false;

      try {
        const imageGenResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [
              {
                text: metadata.englishArtPrompt || `A beautiful religious illustration of bible book ${bookId} chapter ${chapter} in ${styleName} style, highly detailed.`
              }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: '16:9',
            }
          }
        });

        if (imageGenResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageGenResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              imageBase64 = `data:image/png;base64,${part.inlineData.data}`;
              usedRealGenerator = true;
              break;
            }
          }
        }
      } catch (imageError: any) {
        console.warn('Real image generator failed or quota exceeded, falling back to dynamic Unsplash visual asset:', imageError.message);
      }

      // If real generator wasn't successful, build a high-quality Pollinations AI generated image URL from prompt
      let finalImageUrl = imageBase64;
      if (!finalImageUrl) {
        const artPrompt = metadata.englishArtPrompt || `Biblical illustration of ${bookId} chapter ${chapter}, ${styleName} style, dramatic lighting, detailed art`;
        const seed = Math.floor(Math.random() * 1000000);
        finalImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(artPrompt)}?width=1024&height=576&seed=${seed}&nologo=true`;
        usedRealGenerator = true;
      }

      res.json({
        success: true,
        title: metadata.portugueseTitle || `${bookId} ${chapter}`,
        artPromptDesc: metadata.portugueseArtPromptDesc || 'Ilustração artística inspiradora baseada na passagem bíblica.',
        theologicalMeaning: metadata.theologicalMeaning || 'Meditação espiritual e simbólica sobre a revelação divina na passagem.',
        imageUrl: finalImageUrl,
        englishPrompt: metadata.englishArtPrompt,
        usedRealGenerator,
        style: styleName
      });

    } catch (error: any) {
      console.error('Erro ao gerar ilustração do capítulo:', error);
      res.status(500).json({
        error: error.message || 'Erro ao gerar ilustração artística do capítulo.',
        details: 'Verifique se a chave GEMINI_API_KEY está configurada no painel de Segredos.'
      });
    }
  });

  // AI Verse Devotional Card Generator Endpoint
  app.post('/api/theology/generate-verse-card', async (req, res) => {
    try {
      const { verseText, bookName, chapter, verseNum, style } = req.body;
      if (!verseText || !bookName) {
        res.status(400).json({ error: 'Texto do versículo e nome do livro são obrigatórios.' });
        return;
      }

      const ai = getAiClient();
      const styleName = style || 'Amanhecer Espiritual';

      // 1. Generate prompt concept for background artwork
      const promptText = `Crie o conceito visual de um fundo de card devocional para o versículo bíblico: "${verseText}" (${bookName} ${chapter}:${verseNum}). Estilo desejado: "${styleName}".
A imagem deve ser um plano de fundo atmosférico, sereno, com espaço central adequado para sobreposição de texto, sem frases escancaradas nem marcas d'água.`;

      const metadataResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um designer gráfico e artista sacro especializado em cards devocionais evangélicos de alta estética para redes sociais. Suas respostas devem ser em formato JSON válido.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              englishArtPrompt: {
                type: Type.STRING,
                description: 'A detailed prompt in English for generating a serene background image (landscape/nature/abstract/sacred art) suitable for placing text on top. Soft lighting, artistic, no written text or signatures.'
              },
              portugueseTitle: {
                type: Type.STRING,
                description: 'A short devotional title for this verse card (e.g. "Promessa de Paz").'
              },
              devotionalReflection: {
                type: Type.STRING,
                description: 'A 1-2 sentence inspiring devotional thought on this verse to accompany the social media post.'
              },
              unsplashSearchKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 English keywords for finding matching nature/spiritual photos if needed.'
              }
            },
            required: ['englishArtPrompt', 'portugueseTitle', 'devotionalReflection', 'unsplashSearchKeywords']
          }
        }
      });

      const metadata = JSON.parse(metadataResponse.text || '{}');

      // 2. Try real image generation with gemini-3.1-flash-lite-image
      let imageBase64: string | null = null;
      let usedRealGenerator = false;

      try {
        const imageGenResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [{ text: metadata.englishArtPrompt || `A serene background illustration for bible verse ${bookName} ${chapter}:${verseNum}, style ${styleName}, soft atmospheric lighting, minimal texture, no text.` }]
          },
          config: {
            imageConfig: {
              aspectRatio: '9:16',
            }
          }
        });

        if (imageGenResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageGenResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              imageBase64 = `data:image/png;base64,${part.inlineData.data}`;
              usedRealGenerator = true;
              break;
            }
          }
        }
      } catch (imgErr: any) {
        console.warn('Real image generator failed or quota exceeded:', imgErr.message);
      }

      let finalImageUrl = imageBase64;
      if (!finalImageUrl) {
        const artPrompt = metadata.englishArtPrompt || `Vertical devotional background card of ${bookName} ${chapter}:${verseNum}, ${styleName} style, atmospheric lighting`;
        const seed = Math.floor(Math.random() * 1000000);
        finalImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(artPrompt)}?width=720&height=1280&seed=${seed}&nologo=true`;
        usedRealGenerator = true;
      }

      res.json({
        success: true,
        title: metadata.portugueseTitle || `${bookName} ${chapter}:${verseNum}`,
        reflection: metadata.devotionalReflection || 'Meditação diária no poder e na graça da Palavra de Deus.',
        imageUrl: finalImageUrl,
        usedRealGenerator,
        style: styleName
      });

    } catch (error: any) {
      console.error('Erro ao gerar card de versículo:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar card devocional.' });
    }
  });

  // AI Personalized Reading Plan Generator Endpoint
  app.post('/api/theology/generate-reading-plan', async (req, res) => {
    try {
      const { topic, durationDays = 30, focusLevel = 'Devocional Prático' } = req.body;
      if (!topic || typeof topic !== 'string') {
        res.status(400).json({ error: 'O tema ou interesse teológico é obrigatório.' });
        return;
      }

      const ai = getAiClient();
      const promptText = `Crie um plano de leitura bíblica personalizado de exatamente ${durationDays} dias sobre o tema/interesse: "${topic}". Foco: "${focusLevel}".
Certifique-se de que os livros bíblicos fornecidos usem os IDs de 3 letras padrão em maiúsculas (ex: GEN, EXO, LEV, NUM, DEU, PSA, PRO, ISA, JER, MAT, MRK, LUK, JHN, ACT, ROM, 1CO, 2CO, GAL, EPH, PHP, COL, 1TH, 2TH, 1TI, 2TI, HEB, JAS, 1PE, 2PE, 1JN, REV, etc).`;

      const metadataResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um pastor e teólogo erudito especializado no ensino das Escrituras Sagradas. Monte planos de leitura bíblica pedagogicamente perfeitos, edificantes e centrados em Cristo.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'Título marcante e edificante para o plano de leitura em português.'
              },
              description: {
                type: Type.STRING,
                description: 'Uma introdução pastoral inspiradora de 2 a 3 frases explicando os objetivos espirituais do plano.'
              },
              theme: {
                type: Type.STRING,
                description: 'A categoria ou tema teológico principal (ex: "Saúde Emocional", "Espiritualidade", "Doutrina").'
              },
              days: {
                type: Type.ARRAY,
                description: 'Lista contendo exatamente as leituras de cada um dos dias do plano.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER, description: 'Número do dia (1..N)' },
                    title: { type: Type.STRING, description: 'Título devocional do dia' },
                    bookId: { type: Type.STRING, description: 'ID de 3 letras do livro bíblico em maiúsculas (ex: PHP, PSA, MAT, ROM)' },
                    chapter: { type: Type.INTEGER, description: 'Número do capítulo bíblico para leitura' },
                    verses: { type: Type.STRING, description: 'Versículos específicos ou trecho (ex: "v. 1-8" ou "v. 6-7")' },
                    passageRef: { type: Type.STRING, description: 'Referência legível em português (ex: "Filipenses 4:6-7" ou "Salmos 23:1-6")' },
                    reflection: { type: Type.STRING, description: 'Pensamento devocional curto ou direcionamento de oração para o dia (1-2 frases).' }
                  },
                  required: ['day', 'title', 'bookId', 'chapter', 'passageRef', 'reflection']
                }
              }
            },
            required: ['title', 'description', 'theme', 'days']
          }
        }
      });

      const planData = JSON.parse(metadataResponse.text || '{}');

      res.json({
        success: true,
        plan: planData
      });

    } catch (error: any) {
      console.error('Erro ao gerar plano de leitura com IA:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar plano de leitura personalizado.' });
    }
  });

  // ==========================================
  // MÓDULOS DE IA UNIFICADOS (/api/ai/*)
  // ==========================================

  // MÓDULO 2 — GERADOR DE ESTUDOS
  app.post('/api/ai/study', async (req, res) => {
    try {
      const { tema, livro, capitulo, versiculos, duracao = '15 min', nivelUsuario = 'Intermediário', objetivoEstudo } = req.body;
      if (!tema && !livro) {
        res.status(400).json({ error: 'Informe um tema ou uma passagem bíblica para o estudo.' });
        return;
      }

      const ai = getAiClient();
      const promptText = `Gere um estudo bíblico completo, profundo e altamente estruturado em JSON sobre:
Tema: "${tema || 'Estudo Geral'}"
Livro/Capítulo/Versículos: "${livro || ''} ${capitulo || ''} ${versiculos || ''}"
Nível do Usuário: "${nivelUsuario}"
Duração de Leitura: "${duracao}"
Objetivo: "${objetivoEstudo || 'Crescimento e edificação espiritual'}"

Divida o texto em seções curtas e de fácil leitura.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um teólogo, exégeta e professor de teologia bíblica. Gere estudos estruturados estritamente em JSON no schema solicitado.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              titulo: { type: Type.STRING },
              resumo: { type: Type.STRING },
              introducao: { type: Type.STRING },
              contextoHistorico: { type: Type.STRING },
              contextoGeografico: { type: Type.STRING },
              personagens: { type: Type.ARRAY, items: { type: Type.STRING } },
              analiseTexto: { type: Type.STRING },
              palavrasChave: { type: Type.ARRAY, items: { type: Type.STRING } },
              referenciasCruzadas: { type: Type.ARRAY, items: { type: Type.STRING } },
              aplicacoesPraticas: { type: Type.ARRAY, items: { type: Type.STRING } },
              perguntasReflexao: { type: Type.ARRAY, items: { type: Type.STRING } },
              oracaoSugerida: { type: Type.STRING },
              planoComplementar: { type: Type.STRING },
              fontesBiblicas: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'titulo',
              'resumo',
              'introducao',
              'contextoHistorico',
              'analiseTexto',
              'palavrasChave',
              'referenciasCruzadas',
              'aplicacoesPraticas',
              'perguntasReflexao',
              'oracaoSugerida',
              'fontesBiblicas'
            ]
          }
        }
      });

      const study = JSON.parse(response.text || '{}');
      res.json({ success: true, study });
    } catch (error: any) {
      console.error('Erro em /api/ai/study:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar estudo bíblico.' });
    }
  });

  // MÓDULO 3 — DEVOCIONAL INTELIGENTE
  app.post('/api/ai/devotional', async (req, res) => {
    try {
      const { planoAtual, historicoUsuario, tempoDisponivel = '10 min', temaOuEmocao = 'Paz e Esperança' } = req.body;
      const ai = getAiClient();

      const promptText = `Gere um devocional personalizado diário para o leitor:
Tema/Emoção: "${temaOuEmocao}"
Tempo disponível: "${tempoDisponivel}"
Plano Atual: "${planoAtual || 'Leitura Diária Geral'}"
Histórico/Contexto: "${historicoUsuario || 'Busca crescimento cristão e direção espiritual'}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um pastor e escritor devocional. Gere devocionais inspiradores, breves e centrados nas Escrituras estritamente em JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              versiculoDoDia: {
                type: Type.OBJECT,
                properties: {
                  referencia: { type: Type.STRING },
                  texto: { type: Type.STRING }
                },
                required: ['referencia', 'texto']
              },
              reflexao: { type: Type.STRING },
              aplicacao: { type: Type.STRING },
              oracao: { type: Type.STRING },
              desafioPratico: { type: Type.STRING },
              leituraComplementar: { type: Type.STRING },
            },
            required: ['versiculoDoDia', 'reflexao', 'aplicacao', 'oracao', 'desafioPratico', 'leituraComplementar']
          }
        }
      });

      const devotional = JSON.parse(response.text || '{}');
      res.json({ success: true, devotional });
    } catch (error: any) {
      console.error('Erro em /api/ai/devotional:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar devocional inteligente.' });
    }
  });

  // MÓDULO 4 — ASSISTENTE BÍBLICO
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Mensagem inválida.' });
        return;
      }

      const ai = getAiClient();
      const systemInstruction = `Você é um Teólogo e Educador Bíblico Sênior especializado no "Bíblia-Pro".
Suas diretrizes fundamentais:
1. Responda a dúvidas bíblicas com profundidade, precisão exegética e tom respeitoso e acolhedor.
2. Explique o contexto histórico, cultural e literário dos textos bíblicos.
3. Diferencie claramente entre:
   - Fatos explícitos no texto sagrado;
   - Contexto histórico-cultural;
   - Interpretações e tradições teológicas.
4. Quando houver diferentes interpretações cristãs tradicionais e relevantes sobre um tema, apresente-as de forma respeitosa, neutra e edificante, sem afirmar que apenas uma visão é a correta.
5. Cite SEMPRE as referências bíblicas utilizadas (Livro Capítulo:Versículo).
6. Sugira leituras complementares relevantes ao final.`;

      const prompt = `Pergunta do usuário: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const replyText = response.text || 'Não foi possível gerar uma resposta teológica no momento.';
      res.json({ success: true, reply: replyText });
    } catch (error: any) {
      console.error('Erro em /api/ai/chat:', error);
      res.status(500).json({ error: error.message || 'Erro no assistente bíblico.' });
    }
  });

  // MÓDULO 5 — PLANOS COM IA (Alias unificado)
  app.post('/api/ai/reading-plan', async (req, res) => {
    try {
      const { tipo = 'tema', valor = 'Crescimento Espiritual', dias = 30, topic, durationDays } = req.body;
      const actualTopic = topic || valor;
      const actualDays = durationDays || dias;

      const ai = getAiClient();
      const promptText = `Crie um plano de leitura bíblica personalizado de exatamente ${actualDays} dias baseado em:
Tipo/Categoria: "${tipo}"
Valor/Tema: "${actualTopic}"

Certifique-se de que os livros bíblicos fornecidos usem os IDs de 3 letras padrão em maiúsculas (ex: GEN, EXO, LEV, NUM, DEU, PSA, PRO, ISA, JER, MAT, MRK, LUK, JHN, ACT, ROM, 1CO, 2CO, GAL, EPH, PHP, COL, 1TH, 2TH, 1TI, 2TI, HEB, JAS, 1PE, 2PE, 1JN, REV, etc).`;

      const metadataResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um teólogo e educador bíblico. Monte planos de leitura pedagógicos, edificantes e centrados em Cristo estritamente em JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              titulo: { type: Type.STRING },
              descricao: { type: Type.STRING },
              objetivo: { type: Type.STRING },
              tema: { type: Type.STRING },
              cronograma: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dia: { type: Type.INTEGER },
                    titulo: { type: Type.STRING },
                    passageRef: { type: Type.STRING },
                    bookId: { type: Type.STRING },
                    chapter: { type: Type.INTEGER },
                    verses: { type: Type.STRING },
                    reflexao: { type: Type.STRING },
                    oracao: { type: Type.STRING },
                    desafioDiario: { type: Type.STRING },
                  },
                  required: ['dia', 'titulo', 'passageRef', 'bookId', 'chapter', 'reflexao']
                }
              }
            },
            required: ['titulo', 'descricao', 'objetivo', 'tema', 'cronograma']
          }
        }
      });

      const planData = JSON.parse(metadataResponse.text || '{}');
      res.json({ success: true, plan: planData });
    } catch (error: any) {
      console.error('Erro em /api/ai/reading-plan:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar plano de leitura.' });
    }
  });

  // MÓDULO 6 — GERAÇÃO DE IMAGENS
  app.post('/api/ai/image', async (req, res) => {
    try {
      const { tipo = 'ilustracao', descricao, estilo = 'Arte Sacra Histórica', resolucao = '16:9' } = req.body;
      if (!descricao || typeof descricao !== 'string' || !descricao.trim()) {
        res.status(400).json({ error: 'Descrição da imagem é obrigatória.' });
        return;
      }

      const cleanDesc = descricao.trim();
      const cleanEstilo = (typeof estilo === 'string' && estilo.trim()) ? estilo.trim() : 'Arte Sacra Histórica';
      const cleanTipo = typeof tipo === 'string' ? tipo : 'ilustracao';
      const validAspectRatio = ['16:9', '1:1', '9:16', '4:3', '3:4', '2:3', '3:2'].includes(resolucao) ? resolucao : '16:9';

      const ai = getAiClient();
      const promptText = `Crie o conceito visual e descrição detalhada em inglês para a geração de imagem bíblica do tipo "${cleanTipo}":
Descrição: "${cleanDesc}"
Estilo desejado: "${cleanEstilo}"
Proporção visual/Resolução: "${validAspectRatio}"`;

      const metadataResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Você é um diretor de arte e historiador bíblico. Forneça prompts poéticos e detalhados em inglês para gerador de imagem.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              englishArtPrompt: { type: Type.STRING },
              portugueseTitle: { type: Type.STRING },
              portugueseDesc: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['englishArtPrompt', 'portugueseTitle', 'portugueseDesc', 'keywords']
          }
        }
      });

      const metadata = JSON.parse(metadataResponse.text || '{}');

      let imageBase64: string | null = null;
      let usedRealGenerator = false;

      try {
        const imageGenResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [{ text: metadata.englishArtPrompt || `A detailed biblical illustration of ${cleanDesc} in ${cleanEstilo} style.` }]
          },
          config: {
            imageConfig: {
              aspectRatio: validAspectRatio,
            }
          }
        });

        if (imageGenResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageGenResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              imageBase64 = `data:image/png;base64,${part.inlineData.data}`;
              usedRealGenerator = true;
              break;
            }
          }
        }
      } catch (imgErr: any) {
        console.warn('Gerador real de imagem indisponível no momento:', imgErr.message);
      }

      let finalImageUrl = imageBase64;
      if (!finalImageUrl) {
        const artPrompt = metadata.englishArtPrompt || `Biblical artwork of ${cleanDesc}, ${cleanEstilo} style, dramatic lighting, masterpiece`;
        const seed = Math.floor(Math.random() * 1000000);
        
        let width = 1024;
        let height = 576;
        if (validAspectRatio === '1:1') { width = 1024; height = 1024; }
        else if (validAspectRatio === '9:16') { width = 576; height = 1024; }
        else if (validAspectRatio === '4:3') { width = 1024; height = 768; }

        finalImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(artPrompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
        usedRealGenerator = true;
      }

      res.json({
        success: true,
        imageUrl: finalImageUrl,
        titulo: metadata.portugueseTitle || 'Ilustração Bíblica',
        descricao: metadata.portugueseDesc || 'Conceito visual para edificação e estudo bíblico.',
        avisoIsencao: 'Esta imagem é uma ilustração conceitual gerada por Inteligência Artificial.',
        usedRealGenerator,
        estilo: cleanEstilo,
        resolucao: validAspectRatio,
      });

    } catch (error: any) {
      console.error('Erro em /api/ai/image:', error);
      res.status(500).json({ error: error.message || 'Erro ao gerar ilustração bíblica.' });
    }
  });

  // Vite Middleware integration for development mode vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Jornada da Bíblia] Servidor rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
