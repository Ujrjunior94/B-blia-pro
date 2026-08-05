export interface BiblicalCharacter {
  id: string;
  name: string;
  meaning: string;
  category: 'Patriarcas' | 'Reis' | 'Profetas' | 'Mulheres da Bíblia' | 'Apóstolos' | 'Líderes e Juízes';
  books: string[];
  passages: string;
  biography: string;
  lessons: string[];
  relationships: string[];
  pointingToChrist: string;
  practicalApplication: string;
}

export const BIBLICAL_CHARACTERS: BiblicalCharacter[] = [
  {
    id: 'abraao',
    name: 'Abraão',
    meaning: 'Pai de uma multidão',
    category: 'Patriarcas',
    books: ['Gênesis', 'Romanos', 'Gálatas', 'Hebreus'],
    passages: 'Gênesis 12 a 25',
    biography: 'Chamado por Deus para deixar Ur dos Caldeus e sua parentela e seguir para uma terra desconhecida. Deus estabeleceu com ele uma aliança incondicional de terra, semente e bênção global. Diante do impossível, creu na promessa de que teria um herdeiro legítimo com sua esposa estéril, Sara. Sua fé foi testada ao extremo no Monte Moriá, quando Deus lhe pediu o sacrifício de seu filho único, Isaque.',
    lessons: [
      'A obediência genuína decorre de uma confiança total na palavra de Deus, mesmo diante do desconhecido.',
      'Fé não significa ausência de dificuldades, mas a certeza de que Deus é poderoso para cumprir o que prometeu.',
      'A justiça diante de Deus é imputada pela graça por meio da fé (Gênesis 15:6).'
    ],
    relationships: ['Sara (esposa)', 'Isaque (filho)', 'Ló (sobrinho)', 'Melquisedeque (sacerdote que o abençoou)'],
    pointingToChrist: 'O sacrifício de Isaque no Moriá é um dos mais explícitos símbolos de Cristo no Antigo Testamento: o pai que oferece voluntariamente o próprio filho amado, o filho que carrega a madeira para o sacrifício, o carneiro providenciado por Deus como substituto e o local onde séculos mais tarde o próprio Filho de Deus seria oferecido na cruz. Além disso, Cristo é a Semente singular de Abraão que abençoaria todas as nações.',
    practicalApplication: 'Andar por fé exige abrir mão de seguranças humanas para confiar exclusivamente na providência soberana e nas promessas divinas.'
  },
  {
    id: 'moises',
    name: 'Moisés',
    meaning: 'Tirado das águas',
    category: 'Profetas',
    books: ['Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Hebreus'],
    passages: 'Êxodo 2 a Deuteronômio 34',
    biography: 'Salvo milagrosamente da matança de bebês hebreus e criado na corte egípcia. Após falhar em libertar o povo com suas próprias forças e passar 40 anos no deserto de Midiã como pastor, foi comissionado por Deus na sarça ardente. Liderou a saída do povo do Egito sob as dez pragas, conduziu a travessia do Mar Vermelho, serviu como mediador da aliança no Monte Sinai onde recebeu os Dez Mandamentos e guiou Israel pelo deserto.',
    lessons: [
      'O preparo de Deus para a liderança envolve quebrantamento e humildade profunda.',
      'A lei mostra o padrão perfeito da justiça de Deus e a nossa incapacidade de cumpri-la de forma autônoma.',
      'O líder de Deus intercede com paixão pelo povo, colocando a glória do Senhor acima do seu interesse pessoal.'
    ],
    relationships: ['Arão (irmão)', 'Miriã (irmã)', 'Zípora (esposa)', 'Jetro (sogro)', 'Josué (discípulo e sucessor)'],
    pointingToChrist: 'Moisés aponta para Cristo como o maior Mediador, Profeta e Libertador. Deuteronômio 18:15 profetizou a vinda de um Profeta semelhante a Moisés. Enquanto Moisés foi um servo fiel na casa de Deus, Jesus é o Filho sobre Sua própria casa. Moisés deu a lei que condena, mas Jesus nos trouxe a graça e a verdade que nos libertam.',
    practicalApplication: 'Aprender a depositar nossa identidade na fidelidade de Deus e não na nossa própria eloqüência ou força para realizar Seus planos.'
  },
  {
    id: 'davi',
    name: 'Davi',
    meaning: 'Amado',
    category: 'Reis',
    books: ['1 Samuel', '2 Samuel', '1 Crônicas', 'Salmos'],
    passages: '1 Samuel 16 a 1 Reis 2',
    biography: 'O mais jovem dos filhos de Jessé, ungido rei de Israel por Samuel enquanto ainda era pastor de ovelhas. Notabilizou-se ao derrotar o gigante Golias com fé no Nome de Deus. Sofreu perseguição implacável do rei Saul antes de assumir o trono. Conquistou Jerusalém, unificou o reino e recebeu a grande Promessa da Aliança Davídica de que o seu trono seria estabelecido para sempre. Apesar de sua piedade profunda, caiu em adultério e homicídio, mas foi perdoado após genuíno arrependimento.',
    lessons: [
      'Deus não enxerga como o homem enxerga; o Senhor olha para o coração e não para a aparência exterior.',
      'O arrependimento sincero reconhece a gravidade do pecado contra Deus e clama exclusivamente pela misericórdia purificadora.',
      'A verdadeira adoração envolve expressar toda a nossa humanidade e emoções diante de Deus com honestidade.'
    ],
    relationships: ['Jessé (pai)', 'Jônatas (amigo leal)', 'Mical (esposa)', 'Bate-Seba (esposa)', 'Salomão (filho)'],
    pointingToChrist: 'Jesus é o herdeiro legítimo da aliança davídica, repetidamente chamado de "Filho de Davi". Davi é o rei ungido que vence os inimigos em favor do seu povo (assim como Jesus derrota Satanás e a morte). Seus salmos expressam de forma profética o sofrimento e a exaltação futura do Messias (ex: Salmo 22 e Salmo 110).',
    practicalApplication: 'A busca por Deus com todo o coração deve guiar cada decisão nossa, e as nossas falhas devem nos conduzir de volta à cruz com fé purificadora.'
  },
  {
    id: 'ester',
    name: 'Ester',
    meaning: 'Estrela / Cidreira',
    category: 'Mulheres da Bíblia',
    books: ['Ester'],
    passages: 'Livro de Ester 1 a 10',
    biography: 'Uma jovem órfã judia exilada na Pérsia que foi criada por seu primo Mardoqueu. Foi escolhida pelo rei Assuero para ser a nova rainha do Império Persa. Diante do decreto maligno de Hamã para aniquilar todos os judeus, Ester arriscou a própria vida ao comparecer perante o rei sem ser chamada, declarando o seu clássico "Se perecer, pereci". Por meio de jejum, oração e sabedoria, Deus usou sua posição para preservar a descendência messiânica.',
    lessons: [
      'Deus atua de forma providencial mesmo quando Seu Nome não é explicitamente mencionado no cenário das circunstâncias.',
      'Deus nos coloca em posições estratégicas de influência não para proveito pessoal, mas para servir aos Seus propósitos eternos.',
      'A bravura e o jejum em espírito de dependência abrem caminho para livramentos extraordinários.'
    ],
    relationships: ['Mardoqueu (primo e tutor)', 'Assuero (marido e rei persa)', 'Hamã (adversário do povo de Deus)'],
    pointingToChrist: 'Ester é uma intercessora que se dispõe a dar a vida pelo seu povo perante o trono da soberania absoluta. Cristo fez isso de forma perfeita: apresentou-Se diante do Pai celestial carregando nossos pecados e consumou nossa salvação. Ela aponta para Cristo também pela providência silenciosa que garante que o plano genocida de Satanás jamais interrompa a linhagem messiânica.',
    practicalApplication: 'Reconhecer que estamos nos lugares onde estamos "para um momento como este", assumindo responsabilidade de fé para servir e proteger o evangelho.'
  },
  {
    id: 'pedro',
    name: 'Pedro (Simão)',
    meaning: 'Rocha / Pedra',
    category: 'Apóstolos',
    books: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos', '1 Pedro', '2 Pedro'],
    passages: 'Mateus 4 a Atos 15, 1 e 2 Pedro',
    biography: 'Pescador galileu de temperamento impulsivo, chamado com seu irmão André para ser "pescador de homens". Tornou-se o porta-voz dos doze discípulos e fez a grande declaração messiânica no Cesaréia de Filipe. Após jurar lealdade, negou Jesus três vezes antes da crucificação. Restaurado de forma amorosa por Cristo na praia da Galileia, foi revestido do Espírito Santo em Pentecostes, tornando-se o principal pregador da igreja apostólica inicial.',
    lessons: [
      'Nossa autoconfiança é perigosa e falha; o orgulho precede a queda espiritual.',
      'A graça de Cristo é maior do que nossas piores quedas, oferecendo perdão, cura e restauração ministerial completa.',
      'A transformação do temperamento impulsivo em firmeza de fé é uma obra exclusiva da habitação do Espírito Santo.'
    ],
    relationships: ['André (irmão)', 'Tiago e João (parceiros de pesca)', 'Jesus (Mestre)', 'Paulo (co-apóstolo que o confrontou em Antioquia)'],
    pointingToChrist: 'Pedro proclama que Jesus é "o Cristo, o Filho do Deus vivo". Ele testemunha a transfiguração, a crucificação, a ressurreição e a ascensão do Senhor. Em suas epístolas, aponta para Cristo como a Pedra Angular sobre a qual a Igreja está edificada, o Pastor e Bispo de nossas almas e o Cordeiro sem defeito cujo precioso sangue nos resgatou.',
    practicalApplication: 'Em vez de confiar no nosso próprio fervor ou sentimentos, devemos edificar nossa esperança e vida na rocha inabalável que é Cristo.'
  },
  {
    id: 'ruth',
    name: 'Rute',
    meaning: 'Amiga / Companheira',
    category: 'Mulheres da Bíblia',
    books: ['Rute', 'Mateus'],
    passages: 'Livro de Rute 1 a 4',
    biography: 'Jovem viúva moabita que escolheu de forma abnegada permanecer ao lado de sua sogra Noemi, declarando: "O teu povo será o meu povo, e o teu Deus será o meu Deus". Retornando a Belém em extrema pobreza, passou a respigar nos campos de Boaz, um parente resgatador rico e virtuoso. Pela sua fidelidade e integridade, Boaz a resgatou por amor e a tomou como esposa, integrando a estrangeira na linhagem sagrada de Israel.',
    lessons: [
      'A lealdade e o amor prático têm enorme valor diante de Deus, atraindo generosidade e graça.',
      'Deus valoriza os de fora e os estrangeiros, demonstrando que a fé supera limites étnicos e nacionais.',
      'A providência divina trabalha nos mínimos detalhes da rotina (como respigar o trigo) para tecer grandes milagres.'
    ],
    relationships: ['Noemi (sogra)', 'Boaz (marido e resgatador)', 'Obede (filho e avô de Davi)'],
    pointingToChrist: 'O casamento de Rute com Boaz ilustra de forma magnífica a redenção de Cristo. Boaz atua como o "Goel" (Parente Resgatador) — aquele que tem os meios, o direito legal e a vontade de pagar a dívida e comprar a terra para restaurar a família caída. Jesus Cristo é o nosso perfeito Resgatador celestial, que pagou o preço do nosso resgate com Seu próprio sangue para nos unir a Ele como Sua Noiva graciosa.',
    practicalApplication: 'Demonstrar amor e cuidado generoso para com os necessitados e vulneráveis, sabendo que fomos resgatados pela bondade maravilhosa de Cristo.'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    meaning: 'Deus é meu Juiz',
    category: 'Profetas',
    books: ['Daniel', 'Mateus'],
    passages: 'Livro de Daniel 1 a 12',
    biography: 'Nobre judeu levado cativo para a Babilônia ainda adolescente. Decidiu em seu coração não se contaminar com a porção das iguarias do rei. Sob a graça de Deus, destacou-se pela inteligência e sabedoria, recebendo o dom de interpretar sonhos e visões proféticas. Sobreviveu ileso à cova dos leões devido à sua fidelidade irredutível à oração diária. Serviu com retidão a quatro governantes de impérios mundiais diferentes.',
    lessons: [
      'A fidelidade a Deus no ambiente cultural hostil começa com pequenas e firmes resoluções do coração.',
      'A oração persistente e diária é o motor da sustentação espiritual e da comunhão com o Senhor.',
      'Deus governa soberanamente sobre todos os reinos humanos, estabelecendo e depondo autoridades.'
    ],
    relationships: ['Ananias, Misael e Azarias (companheiros de fé)', 'Nabucodonosor (rei babilônico)', 'Dario (rei medo)'],
    pointingToChrist: 'Daniel profetizou a vinda do "Filho do Homem" que receberia domínio eterno (Daniel 7:13-14) — um título que Jesus usou com predileção para Si mesmo. Ele calculou o tempo profético da morte do Messias (Daniel 9:26) para expiar a iniqüidade e trazer justiça eterna, e revelou que a "Pedra" cortada sem mãos esmagará todos os reinos humanos e reinará para sempre.',
    practicalApplication: 'Permanecer inabalável em nossos valores cristãos e comunhão pessoal com Deus, mesmo em meios acadêmicos ou profissionais que desafiam a nossa fé.'
  }
];
