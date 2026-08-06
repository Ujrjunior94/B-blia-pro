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

      // If real generator wasn't successful, build a beautiful Unsplash fallback URL
      let finalImageUrl = imageBase64;
      if (!finalImageUrl) {
        const keywords = (metadata.unsplashSearchKeywords || ['bible', 'spiritual', 'light']).join(',');
        // We can append a random key or use a deterministic seed based on book and chapter to fetch a consistent image
        const seed = `${bookId.toLowerCase()}-${chapter}`;
        finalImageUrl = `https://images.unsplash.com/featured/800x450/?${encodeURIComponent(keywords)}&sig=${encodeURIComponent(seed)}`;
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
        const keywords = (metadata.unsplashSearchKeywords || ['nature', 'sunrise', 'peace']).join(',');
        const seed = `${bookName.toLowerCase()}-${chapter}-${verseNum}`;
        finalImageUrl = `https://images.unsplash.com/featured/1080x1920/?${encodeURIComponent(keywords)}&sig=${encodeURIComponent(seed)}`;
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
