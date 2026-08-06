export interface SmartCategoryItem {
  id: string;
  category: 'tema' | 'emoção' | 'personagem' | 'milagre' | 'profecia' | 'parábola' | 'doutrina' | 'pecado' | 'promessa' | 'oração';
  title: string;
  keywords: string[];
  summary: string;
  keyVerses: {
    bookId: string;
    chapter: number;
    verse: number;
    reference: string;
    text: string;
  }[];
}

export const SMART_SEARCH_CATEGORIES: SmartCategoryItem[] = [
  // Emoção / Sentimentos
  {
    id: 'emo-ansiedade',
    category: 'emoção',
    title: 'Ansiedade & Preocupação',
    keywords: ['ansioso', 'ansiedade', 'preocupação', 'medo', 'inquietação', 'pânico', 'estresse'],
    summary: 'Instruções e promessas bíblicas sobre lançar as ansiedades sobre Deus e encontrar paz interior.',
    keyVerses: [
      { bookId: 'PHP', chapter: 4, verse: 6, reference: 'Filipenses 4:6-7', text: 'Não andeis ansiosos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças.' },
      { bookId: '1PE', chapter: 5, verse: 7, reference: '1 Pedro 5:7', text: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.' },
      { bookId: 'PSA', chapter: 94, verse: 19, reference: 'Salmos 94:19', text: 'Na multiplicidade dos meus pensamentos dentro de mim, as tuas consolações recreiam a minha alma.' },
      { bookId: 'MAT', chapter: 6, verse: 34, reference: 'Mateus 6:34', text: 'Não vos inquieteis, pois, pelo dia de amanhã, porque o dia de amanhã cuidará de si mesmo.' }
    ]
  },
  {
    id: 'emo-tristeza',
    category: 'emoção',
    title: 'Tristeza & Luto',
    keywords: ['tristeza', 'luto', 'choro', 'depressão', 'dor', 'aflição', 'quebrantado'],
    summary: 'Consolo divino para momentos de luto, mágoa e quebrantamento de coração.',
    keyVerses: [
      { bookId: 'PSA', chapter: 34, verse: 18, reference: 'Salmos 34:18', text: 'Perto está o Senhor dos que têm o coração quebrantado, e salva os contritos de espírito.' },
      { bookId: 'MAT', chapter: 5, verse: 4, reference: 'Mateus 5:4', text: 'Bem-aventurados os que choram, porque eles serão consolados.' },
      { bookId: 'REV', chapter: 21, verse: 4, reference: 'Apocalipse 21:4', text: 'E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor.' }
    ]
  },

  // Promessas
  {
    id: 'prom-fidelidade',
    category: 'promessa',
    title: 'Fidelidade & Provisão Divina',
    keywords: ['promessa', 'provisão', 'fidelidade', 'sustento', 'socorro', 'bênção'],
    summary: 'As inabaláveis promessas de Deus para suprir todas as necessidades dos fiéis.',
    keyVerses: [
      { bookId: 'PHP', chapter: 4, verse: 19, reference: 'Filipenses 4:19', text: 'O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.' },
      { bookId: 'ISA', chapter: 41, verse: 10, reference: 'Isaías 41:10', text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento.' }
    ]
  },

  // Milagres
  {
    id: 'mil-ressurreicao-lazaro',
    category: 'milagre',
    title: 'A Ressurreição de Lázaro',
    keywords: ['lázaro', 'ressurreição', 'milagre', 'morte', 'tumulo', 'maria', 'marta'],
    summary: 'Jesus demonstra autoridade sobre a morte ao ressuscitar Lázaro após quatro dias no sepulcro.',
    keyVerses: [
      { bookId: 'JHN', chapter: 11, verse: 25, reference: 'João 11:25-26', text: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.' },
      { bookId: 'JHN', chapter: 11, verse: 43, reference: 'João 11:43-44', text: 'E, havendo dito isto, clamou com grande voz: Lázaro, sai para fora.' }
    ]
  },

  // Parábolas
  {
    id: 'par-filho-pródigo',
    category: 'parábola',
    title: 'A Parábola do Filho Pródigo',
    keywords: ['pródigo', 'filho pródigo', 'perdão', 'misericórdia', 'arrependimento', 'parábola', 'pai'],
    summary: 'Revelação do amor incondicional do Pai Celestial ao acolher o filho arrependido.',
    keyVerses: [
      { bookId: 'LUK', chapter: 15, verse: 20, reference: 'Lucas 15:20', text: 'E, levantando-se, foi para seu pai; e, quando ainda estava longe, viu-o seu pai, e se moveu de íntima compaixão e, correndo, lançou-se-lhe ao pescoço e o beijou.' },
      { bookId: 'LUK', chapter: 15, verse: 24, reference: 'Lucas 15:24', text: 'Porque este meu filho estava morto, e reviveu, tinha-se perdido, e foi achado. E começaram a alegrar-se.' }
    ]
  },

  // Doutrinas
  {
    id: 'dou-justificacao-fé',
    category: 'doutrina',
    title: 'Justificação pela Fé',
    keywords: ['justificação', 'fé', 'graça', 'salvação', 'obras', 'lei', 'doutrina'],
    summary: 'A salvação é concedida gratuitamente mediante a graça por meio da fé em Jesus Cristo.',
    keyVerses: [
      { bookId: 'ROM', chapter: 5, verse: 1, reference: 'Romanos 5:1', text: 'Tendo sido, pois, justificados pela fé, temos paz com Deus, por nosso Senhor Jesus Cristo.' },
      { bookId: 'EPH', chapter: 2, verse: 8, reference: 'Efésios 2:8-9', text: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' }
    ]
  },

  // Oração
  {
    id: 'ora-pai-nosso',
    category: 'oração',
    title: 'A Oração do Pai Nosso (Modelo de Oração)',
    keywords: ['oração', 'pai nosso', 'clamor', 'intercessão', 'petição', 'como orar'],
    summary: 'O modelo ensinado pelo próprio Jesus aos discípulos sobre como se dirigir a Deus.',
    keyVerses: [
      { bookId: 'MAT', chapter: 6, verse: 9, reference: 'Mateus 6:9-13', text: 'Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome...' }
    ]
  }
];
