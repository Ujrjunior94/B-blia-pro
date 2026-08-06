export interface TimelineEvent {
  id: string;
  year: string; // e.g. "c. 4000 a.C.", "c. 2000 a.C.", "c. 1000 a.C."
  period: 'Patriarcas' | 'Êxodo & Juízes' | 'Monarquia Unificada' | 'Reino Dividido' | 'Exílio & Restauração' | 'Período Intertestamentário' | 'Vida de Cristo' | 'Igreja Primitiva';
  title: string;
  keyFigure: string;
  role: 'Rei' | 'Profeta' | 'Apóstolo' | 'Líder' | 'Imperador';
  empire: 'Egípcio' | 'Assírio' | 'Babilônico' | 'Persa' | 'Grego' | 'Romano' | 'Nenhum';
  description: string;
  passageRef: string;
}

export interface GenealogyNode {
  id: string;
  name: string;
  meaning: string;
  fatherId?: string;
  motherId?: string;
  generationOrder: number;
  importance: string;
  tribe?: string;
  isMessianicLine: boolean;
  keyVerse: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: 'c. 4000 a.C.',
    period: 'Patriarcas',
    title: 'A Criação e a Queda da Humanidade',
    keyFigure: 'Adão e Eva',
    role: 'Líder',
    empire: 'Nenhum',
    description: 'Origem da criação divina, introdução do pecado e primeira promessa messiânica (Protoevangelho em Gênesis 3:15).',
    passageRef: 'Gênesis 1 - 3'
  },
  {
    id: 't2',
    year: 'c. 2350 a.C.',
    period: 'Patriarcas',
    title: 'O Dilúvio e a Aliança de Noé',
    keyFigure: 'Noé',
    role: 'Líder',
    empire: 'Nenhum',
    description: 'Juízo sobre a impiedade da terra e preservação da linhagem da promessa através da arca.',
    passageRef: 'Gênesis 6 - 9'
  },
  {
    id: 't3',
    year: 'c. 2000 a.C.',
    period: 'Patriarcas',
    title: 'Chamado de Abraão e Aliança Patriarcal',
    keyFigure: 'Abraão',
    role: 'Líder',
    empire: 'Nenhum',
    description: 'Deus chama Abraão de Ur dos Caldeus e promete abençoar todas as famílias da terra através de sua descendência.',
    passageRef: 'Gênesis 12 - 17'
  },
  {
    id: 't4',
    year: 'c. 1446 a.C.',
    period: 'Êxodo & Juízes',
    title: 'O Êxodo do Egito e os 10 Mandamentos',
    keyFigure: 'Moisés',
    role: 'Líder',
    empire: 'Egípcio',
    description: 'Libertação do povo de Israel do cativeiro egípcio, abertura do Mar Vermelho e entrega da Lei no Monte Sinai.',
    passageRef: 'Êxodo 12 - 20'
  },
  {
    id: 't5',
    year: 'c. 1010 a.C.',
    period: 'Monarquia Unificada',
    title: 'Reinado de Davi e Unificação de Israel',
    keyFigure: 'Rei Davi',
    role: 'Rei',
    empire: 'Nenhum',
    description: 'Conquista de Jerusalém, estabelecimento da capital e aliança davídica de um trono eterno.',
    passageRef: '2 Samuel 5 - 7'
  },
  {
    id: 't6',
    year: 'c. 960 a.C.',
    period: 'Monarquia Unificada',
    title: 'Construção do Primeiro Templo de Jerusalém',
    keyFigure: 'Rei Salomão',
    role: 'Rei',
    empire: 'Nenhum',
    description: 'Era de ouro de paz, sabedoria e esplendor em Israel com a dedicação do Templo do Senhor.',
    passageRef: '1 Reis 6 - 8'
  },
  {
    id: 't7',
    year: 'c. 722 a.C.',
    period: 'Reino Dividido',
    title: 'Queda do Reino do Norte (Israel) para a Assíria',
    keyFigure: 'Profeta Oséias',
    role: 'Profeta',
    empire: 'Assírio',
    description: 'A Assíria conquista Samaria e dispersa as 10 tribos do norte devido à idolatria persistente.',
    passageRef: '2 Reis 17'
  },
  {
    id: 't8',
    year: 'c. 586 a.C.',
    period: 'Exílio & Restauração',
    title: 'Destruição de Jerusalém e Cativeiro Babilônico',
    keyFigure: 'Profeta Jeremias',
    role: 'Profeta',
    empire: 'Babilônico',
    description: 'Nabucodonosor destrói o Templo de Salomão e leva Judá cativo para a Babilônia por 70 anos.',
    passageRef: '2 Reis 25 / Jeremias 29'
  },
  {
    id: 't9',
    year: 'c. 538 a.C.',
    period: 'Exílio & Restauração',
    title: 'Decreto de Ciro e Retorno do Exílio',
    keyFigure: 'Zorobabel & Esdras',
    role: 'Líder',
    empire: 'Persa',
    description: 'O Império Persa autoriza a reconstrução do Templo em Jerusalém sob liderança de Zorobabel.',
    passageRef: 'Esdras 1 - 3'
  },
  {
    id: 't10',
    year: 'c. 4 a.C. - 30 d.C.',
    period: 'Vida de Cristo',
    title: 'Encarnação, Ministério, Morte e Ressurreição de Jesus',
    keyFigure: 'Jesus Cristo',
    role: 'Rei',
    empire: 'Romano',
    description: 'Cumprimento de todas as profecias do Antigo Testamento, sacrifício vicário na cruz e vitória sobre a morte.',
    passageRef: 'Evangelhos (Mateus, Marcos, Lucas, João)'
  },
  {
    id: 't11',
    year: 'c. 30 d.C. - 95 d.C.',
    period: 'Igreja Primitiva',
    title: 'Pentecostes e Expansão do Evangelho aos Gentios',
    keyFigure: 'Apóstolo Paulo',
    role: 'Apóstolo',
    empire: 'Romano',
    description: 'Derramamento do Espírito Santo, viagens missionárias de Paulo e redação das Epístolas do Novo Testamento.',
    passageRef: 'Atos dos Apóstolos / Epístolas'
  }
];

export const GENEALOGY_NODES: GenealogyNode[] = [
  {
    id: 'adao',
    name: 'Adão',
    meaning: 'Feito da terra / Homem',
    generationOrder: 1,
    importance: 'O primeiro homem criado por Deus. Pai de toda a humanidade.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 2:7 / Lucas 3:38'
  },
  {
    id: 'sete',
    name: 'Sete',
    meaning: 'Nomeado / Substituto',
    fatherId: 'adao',
    generationOrder: 2,
    importance: 'Dado no lugar de Abel. Em seus dias começou-se a invocar o nome do Senhor.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 4:25'
  },
  {
    id: 'noe',
    name: 'Noé',
    meaning: 'Descanso / Consolo',
    generationOrder: 10,
    importance: 'Homem justo e íntegro que construiu a Arca para preservar a vida.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 6:8-9'
  },
  {
    id: 'sem',
    name: 'Sem',
    meaning: 'Nome / Renome',
    fatherId: 'noe',
    generationOrder: 11,
    importance: 'Ancestral dos povos semitas e da linhagem abraâmica.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 9:26'
  },
  {
    id: 'abraao',
    name: 'Abraão',
    meaning: 'Pai de uma multidão de nações',
    generationOrder: 20,
    importance: 'Pai da fé. Recebeu a grande Aliança e a promessa da bênção universal.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 12:1-3 / Mateus 1:1'
  },
  {
    id: 'isaque',
    name: 'Isaque',
    meaning: 'Ele rirá / Riso de alegria',
    fatherId: 'abraao',
    generationOrder: 21,
    importance: 'O filho da promessa, disposto ao sacrifício no Monte Moriá.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 21:1-3'
  },
  {
    id: 'jo',
    name: 'Jó / Jacó (Israel)',
    meaning: 'Aquele que luta com Deus e vence',
    fatherId: 'isaque',
    generationOrder: 22,
    importance: 'Lutou com o anjo em Peniel. Pai dos patriarcas das 12 tribos de Israel.',
    isMessianicLine: true,
    keyVerse: 'Gênesis 32:28'
  },
  {
    id: 'juda',
    name: 'Judá',
    meaning: 'Louvor / Aquele que louva',
    fatherId: 'jo',
    generationOrder: 23,
    tribe: 'Tribo de Judá',
    importance: 'Recebeu a promessa do cetro real (O Leão da Tribo de Judá).',
    isMessianicLine: true,
    keyVerse: 'Gênesis 49:10'
  },
  {
    id: 'jose',
    name: 'José do Egito',
    meaning: 'Que o Senhor acrescente',
    fatherId: 'jo',
    generationOrder: 23,
    tribe: 'Tribos de Efraim e Manassés',
    importance: 'Governador do Egito que salvou sua família da fome.',
    isMessianicLine: false,
    keyVerse: 'Gênesis 50:20'
  },
  {
    id: 'perez',
    name: 'Perez',
    meaning: 'Ruptura / Brecha',
    fatherId: 'juda',
    generationOrder: 24,
    tribe: 'Judá',
    importance: 'Ancestral de Davi e Jesus.',
    isMessianicLine: true,
    keyVerse: 'Rute 4:18-22'
  },
  {
    id: 'boaz',
    name: 'Boaz',
    meaning: 'Nele há força',
    generationOrder: 30,
    tribe: 'Judá',
    importance: 'O remidor parente de Rute em Belém.',
    isMessianicLine: true,
    keyVerse: 'Rute 4:13-17'
  },
  {
    id: 'jesse',
    name: 'Jessé',
    meaning: 'Firme / Presente de Deus',
    fatherId: 'boaz',
    generationOrder: 31,
    tribe: 'Judá',
    importance: 'Pai de Davi de onde brota o Renovo messiânico (Isaías 11:1).',
    isMessianicLine: true,
    keyVerse: '1 Samuel 16:1-13'
  },
  {
    id: 'davi',
    name: 'Rei Davi',
    meaning: 'Amado',
    fatherId: 'jesse',
    generationOrder: 32,
    tribe: 'Judá',
    importance: 'O homem segundo o coração de Deus, rei de Israel e salmista.',
    isMessianicLine: true,
    keyVerse: '2 Samuel 7:12-16 / Mateus 1:1'
  },
  {
    id: 'salomao',
    name: 'Rei Salomão',
    meaning: 'Pacífico / Paz',
    fatherId: 'davi',
    generationOrder: 33,
    tribe: 'Judá',
    importance: 'Rei sábio que constriu o Templo.',
    isMessianicLine: true,
    keyVerse: '1 Reis 3:12'
  },
  {
    id: 'jesus',
    name: 'Jesus Cristo',
    meaning: 'O Senhor Salva / O Messias Ungido',
    generationOrder: 60,
    tribe: 'Judá',
    importance: 'O Filho de Deus, o Leão da Tribo de Judá, Salvador do mundo.',
    isMessianicLine: true,
    keyVerse: 'Mateus 1:16 / Apocalipse 22:16'
  }
];
