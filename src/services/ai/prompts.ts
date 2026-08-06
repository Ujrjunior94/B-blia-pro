export interface PromptTemplate {
  id: string;
  category: 'estudo' | 'devocional' | 'oracao' | 'plano' | 'sermao' | 'discipulado' | 'criancas' | 'jovens' | 'familia' | 'lideranca';
  title: string;
  description: string;
  template: string;
}

export const SYSTEM_AI_THEOLOGY_INSTRUCTION = `Você é um Teólogo, Exégeta e Educador Cristão Sênior especializado no aplicativo "Bíblia-Pro / Jornada da Bíblia".
Seu conhecimento bíblico é profundo, preciso, exegético, histórico, literário e focado em Jesus Cristo (Cristocentrismo).

Diretrizes Fundamentais:
1. Responda em Português do Brasil com linguagem clara, respeitosa, pastoral e didática.
2. Sempre cite as referências bíblicas (livro, capítulo e versículo) para embasamento.
3. Diferencie claramente entre:
   - Fatos explícitos no texto bíblico;
   - Contexto histórico, cultural e gramatical;
   - Interpretações e perspectivas teológicas tradicionais.
4. Quando houver diferentes interpretações cristãs relevantes (ex: pontos de vista teológicos tradicionais), apresente-as de forma respeitosa, objetiva e edificante, sem impor uma única visão como incontestável.
5. Divida o texto em seções curtas, organizadas e de fácil leitura.`;

export const PROMPT_LIBRARY: PromptTemplate[] = [
  // ESTUDO
  {
    id: 'estudo-exegetico',
    category: 'estudo',
    title: 'Estudo Exegético Profundo',
    description: 'Análise detalhada de versículo ou capítulo considerando línguas originais e contexto.',
    template: 'Realize um estudo exegético profundo de {passagem}. Analise o contexto histórico, termos no original (hebraico/grego), teologia e aplicação.',
  },
  {
    id: 'estudo-teologico-tematico',
    category: 'estudo',
    title: 'Estudo Temático',
    description: 'Exploração bíblica completa sobre um tema específico ao longo da história da redenção.',
    template: 'Forneça um estudo bíblico panorâmico e temático sobre o tema "{tema}". Inclua referências da Torá/Históricos, Profetas, Evangelhos e Epístolas.',
  },

  // DEVOCIONAL
  {
    id: 'devocional-diario',
    category: 'devocional',
    title: 'Devocional Diário Edificante',
    description: 'Reflexão curta com oração e aplicação prática.',
    template: 'Crie uma reflexão devocional inspiradora focada em {temaOuPassagem}. Inclua reflexão, oração e uma ação prática para o dia.',
  },

  // ORAÇÃO
  {
    id: 'oracao-guiada',
    category: 'oracao',
    title: 'Oração Guiada pelas Escrituras',
    description: 'Modelo de oração baseado em promessas e passagens bíblicas.',
    template: 'Escreva uma oração guiada profundamente baseada nas promessas da passagem {passagem}, dividida em Adoração, Confissão, Agradecimento e Súplica (ACTS).',
  },

  // PLANO
  {
    id: 'plano-leitura-tematico',
    category: 'plano',
    title: 'Plano de Leitura Bíblica',
    description: 'Cronograma diário com leituras, reflexões e desafios.',
    template: 'Monte um plano de leitura bíblica de {dias} dias sobre {tema}. Para cada dia, defina passagem, título devocional e reflexão.',
  },

  // SERMÃO
  {
    id: 'esboco-sermao',
    category: 'sermao',
    title: 'Esboço Homilético de Sermão',
    description: 'Estrutura homilética para pregadores e líderes de pequenos grupos.',
    template: 'Crie um esboço de sermão expositivo sobre {passagem} com título cativante, introdução, 3 pontos centrais com ilustrações e conclusão prática.',
  },

  // DISCIPULADO
  {
    id: 'estudo-discipulado',
    category: 'discipulado',
    title: 'Roteiro de Discipulado',
    description: 'Guia de estudo para encontros um a um ou pequenos grupos.',
    template: 'Desenvolva um roteiro de discipulado prático para novo convertido ou grupo pequeno sobre {tema}, contendo perguntas de quebra-gelo, leitura e aplicação.',
  },

  // CRIANÇAS
  {
    id: 'historia-infantil',
    category: 'criancas',
    title: 'Lição Bíblica Infantil',
    description: 'Linguagem simples, lúdica e pedagógica para ensino de crianças.',
    template: 'Adapte a história de {passagemOuPersonagem} para crianças de 6 a 10 anos. Use linguagem simples, perguntas dinâmicas e uma moral cristocêntrica.',
  },

  // JOVENS
  {
    id: 'devocional-jovens',
    category: 'jovens',
    title: 'Estudo Dinâmico para Jovens',
    description: 'Abordagem contextualizada para dilemas e vida acadêmica/profissional.',
    template: 'Crie uma mensagem bíblica impactante para jovens abordando {tema} à luz de {passagem}, com linguagem moderna, sincera e desafiadora.',
  },

  // FAMÍLIA
  {
    id: 'culto-domestico',
    category: 'familia',
    title: 'Roteiro de Culto Doméstico',
    description: 'Estudo familiar curto e inclusivo para todas as idades.',
    template: 'Elabore um roteiro simples de 15 minutos para Culto Doméstico sobre {tema}. Inclua louvor sugerido, leitura curta, reflexão em família e momento de oração.',
  },

  // LIDERANÇA
  {
    id: 'estudo-lideranca',
    category: 'lideranca',
    title: 'Princípios de Liderança Bíblica',
    description: 'Lições de liderança serva a partir de personagens bíblicos.',
    template: 'Analise o modelo de liderança de {personagemOuTexto}. Destaque 4 princípios bíblicos de integridade, visão, serviço e sabedoria espiritual.',
  }
];

export function getPromptsByCategory(category: PromptTemplate['category']): PromptTemplate[] {
  return PROMPT_LIBRARY.filter(p => p.category === category);
}
