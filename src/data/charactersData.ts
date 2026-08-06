export interface BiblicalCharacter {
  id: string;
  name: string;
  meaning: string;
  category: 'Patriarcas' | 'Reis' | 'Profetas' | 'Mulheres da Bíblia' | 'Apóstolos' | 'Líderes e Juízes';
  testament: 'Antigo Testamento' | 'Novo Testamento';
  period: string; // e.g. "Era Patriarcal (~2000 a.C.)", "Monarquia Unificada (~1000 a.C.)", "Igreja Primitiva (Séc. I d.C.)"
  books: string[];
  passages: string;
  biography: string;
  lessons: string[]; // O que aprendemos com este personagem
  relationships: string[];
  pointingToChrist: string;
  practicalApplication: string;
  keyVerse?: string;
  curiosities?: string[];
}

export const BIBLICAL_CHARACTERS: BiblicalCharacter[] = [
  // --- PATRIARCAS & ORIGENS ---
  {
    id: 'adao',
    name: 'Adão',
    meaning: 'Feito da Terra / Ser Humano',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Criação & Origens',
    books: ['Gênesis', 'Romanos', '1 Coríntios'],
    passages: 'Gênesis 1 a 5, Romanos 5:12-21',
    biography: 'Primeiro homem criado por Deus à Sua imagem e semelhança, colocado no Jardim do Éden para o cultivar e guardar. Recebeu autoridade sobre a criação e a primeira ordem divina de não comer da Árvore do Conhecimento do Bem e do Mal. Desobedecendo à ordem de Deus ao ceder à tentação junto com Eva, introduziu o pecado e a morte na raça humana, resultando na expulsão do Éden e na promessa inicial de um Redentor (Protoevangelho em Gênesis 3:15).',
    lessons: [
      'A desobediência voluntária à Palavra de Deus rompe a comunhão íntima e traz consequências destrutivas para gerações.',
      'A responsabilidade de liderar exige vigilância espiritual contra a tentação e recusa do compromisso moral.',
      'Mesmo na queda do homem, Deus estende a Sua graça providenciando vestes e a promessa da Semente redentora.'
    ],
    relationships: ['Eva (esposa)', 'Caim, Abel e Sete (filhos)'],
    pointingToChrist: 'Adão é chamado na Bíblia de "o primeiro Adão" e prefigura por contraste a Jesus Cristo, "o Último Adão" (1 Coríntios 15:45). Enquanto a desobediência de Adão trouxe condenação e morte para a humanidade, a obediência perfeita de Cristo na cruz trouxe justificativa, salvação e vida eterna.',
    practicalApplication: 'Reconhecer nossa necessidade urgente de nos abrigarmos sob a justiça de Cristo, o Último Adão, para sermos reconciliados com Deus.',
    keyVerse: 'Porque, assim como todos morrem em Adão, assim também em Cristo todos serão vivificados. — 1 Coríntios 15:22',
    curiosities: [
      'A palavra "Adam" em hebraico está relacionada a "Adamah" (terra/solo vermelho).',
      'Foi Adão quem deu nome a todas as criaturas e animais no Éden.'
    ]
  },
  {
    id: 'noe',
    name: 'Noé',
    meaning: 'Descanso / Consolo',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Antediluviana (~2400 a.C.)',
    books: ['Gênesis', 'Hebreus', '1 Pedro', '2 Pedro'],
    passages: 'Gênesis 6 a 9, Hebreus 11:7',
    biography: 'Homem justo e íntegro entre seus contemporâneos corruptos, Noé andava com Deus. Diante da pecaminosidade extrema da humanidade, Deus revelou-lhe o plano de enviar o Dilúvio e lhe ordenou construir uma arca gigantesca para a preservação da vida. Durante mais de 100 anos, Noé pregou a justiça enquanto construía a arca sob zombaria. Preservado com sua família e com os animais, ofereceu um sacrifício de gratidão e recebeu a aliança do Arco-Íris.',
    lessons: [
      'É possível permanecer fiel e incontaminado mesmo vivendo em uma sociedade moralmente degenerada.',
      'A fé verdadeira se evidencia em obediência prática, minuciosa e perseverante aos mandamentos de Deus.',
      'A paciência divina é grande, mas o Seu juízo sobre o pecado é certo e inquestionável.'
    ],
    relationships: ['Lameque (pai)', 'Sem, Cão e Jafé (filhos)'],
    pointingToChrist: 'A Arca de Noé é um tipo marcante de Cristo. Assim como a Arca foi o único refúgio seguro contra a ira do Dilúvio, Jesus Cristo é o único Refúgio sob o qual os homens são salvos da condenação do pecado e do juízo vindouro.',
    practicalApplication: 'Construir nossa vida e família com fé inabalável nas instruções de Deus, ignorando a pressão e a zombaria do mundo ao nosso redor.',
    keyVerse: 'Noé, porém, achou graça aos olhos do SENHOR. — Gênesis 6:8',
    curiosities: [
      'Noé construiu a arca sem nunca ter visto chuva antes, já que a terra era regada por um orvalho.',
      'A pomba com a folha de oliveira trazida a Noé tornou-se o símbolo universal da paz e renovação.'
    ]
  },
  {
    id: 'abraao',
    name: 'Abraão',
    meaning: 'Pai de uma multidão',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~2000 a.C.)',
    books: ['Gênesis', 'Romanos', 'Gálatas', 'Hebreus'],
    passages: 'Gênesis 12 a 25',
    biography: 'Chamado por Deus para deixar Ur dos Caldeus e sua parentela e seguir para uma terra desconhecida. Deus estabeleceu com ele uma aliança incondicional de terra, semente e bênção global. Diante do impossível, creu na promessa de que teria um herdeiro legítimo com sua esposa estéril, Sara. Sua fé foi testada ao extremo no Monte Moriá, quando Deus lhe pediu o sacrifício de seu filho único, Isaque.',
    lessons: [
      'A obediência genuína decorre de uma confiança total na palavra de Deus, mesmo diante do desconhecido.',
      'Fé não significa ausência de dificuldades, mas a certeza de que Deus é poderoso para cumprir o que prometeu.',
      'A justiça diante de Deus é imputada pela graça por meio da fé (Gênesis 15:6).'
    ],
    relationships: ['Sara (esposa)', 'Isaque (filho)', 'Ismael (filho com Hagar)', 'Ló (sobrinho)', 'Melquisedeque (sacerdote de Salém)'],
    pointingToChrist: 'O sacrifício de Isaque no Moriá é um dos mais explícitos símbolos de Cristo no Antigo Testamento: o pai que oferece voluntariamente o próprio filho amado, o filho que carrega a madeira para o sacrifício, o carneiro providenciado por Deus como substituto e o local onde séculos mais tarde o próprio Filho de Deus seria oferecido na cruz.',
    practicalApplication: 'Andar por fé exige abrir mão de seguranças humanas para confiar exclusivamente na providência soberana e nas promessas divinas.',
    keyVerse: 'E creu ele no SENHOR, e imputou-lhe isto por justiça. — Gênesis 15:6',
    curiosities: [
      'Originalmente chamava-se Abrão ("Pai Elevado"), sendo renomeado por Deus para Abraão ("Pai de Multidões").',
      'É chamado na Escritura de "Amigo de Deus" (Tiago 2:23) e "Pai dos Crentes".'
    ]
  },
  {
    id: 'isaque',
    name: 'Isaque',
    meaning: 'Ele rirá / Riso',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~1900 a.C.)',
    books: ['Gênesis', 'Gálatas', 'Hebreus'],
    passages: 'Gênesis 21 a 27',
    biography: 'Filho da promessa nascido de Abraão e Sara em sua velhice. Isaque submeteu-se voluntariamente ao pai no Monte Moriá. Casou-se com Rebeca após a oração fervorosa do servo de Abraão em Harã. Homem pacífico e meditativo, reabriu os poços de seu pai e prosperou enormemente no vale de Gerar, retribuindo a hostilidade dos filisteus com mansidão e paz.',
    lessons: [
      'A verdadeira força espiritual muitas vezes se revela na submissão graciosa e na busca pela paz.',
      'A promessa de Deus transmite-se não por descendência puramente natural, mas por escolha e graça soberana.',
      'Conflitos interpessoais podem ser superados cedendo direitos por amor à paz.'
    ],
    relationships: ['Abraão (pai)', 'Sara (mãe)', 'Rebeca (esposa)', 'Esaú (filho mais velho)', 'Jacó (filho caçula)'],
    pointingToChrist: 'Isaque prefigura o Filho obediente até à morte. Sendo o único filho amado de Abraão, ele subiu o Monte Moriá carregando a madeira do altar sem rebelar-se, tipificando Cristo que carregou a Sua própria cruz em obediência ao Pai.',
    practicalApplication: 'Aprender a buscar poços de bênçãos espirituais na paz e na oração em vez de contendas e conflitos mundanos.',
    keyVerse: 'E saíra Isaque a meditar no campo, à tarde... — Gênesis 24:63'
  },
  {
    id: 'jaco',
    name: 'Jacó (Israel)',
    meaning: 'Usurpador / Aquele que luta com Deus',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~1850 a.C.)',
    books: ['Gênesis', 'Oseias', 'Romanos'],
    passages: 'Gênesis 25 a 50',
    biography: 'Filho caçula de Isaque e Rebeca. Comprou o direito de primogenitura de Esaú e obteve a bênção paterna mediante disfarce. Fugindo para Harã, trabalhou 20 anos para Labão para casar-se com Raquel e Lia. Em Peniel, teve um encontro transformador no qual lutou com o Anjo do Senhor e teve seu nome mudado para Israel ("Príncipe com Deus"). Tornou-se o pai dos 12 patriarcas das tribos de Israel.',
    lessons: [
      'Deus transforma o astuto e manipulador em um instrumento de graça através do quebrantamento.',
      'A bênção de Deus não depende de maquinações humanas, mas da fidelidade irrestrita da Aliança.',
      'Encontros reais com Deus deixam marcas permanentes de dependência e humildade.'
    ],
    relationships: ['Isaque (pai)', 'Rebeca (mãe)', 'Esaú (irmão gêmeo)', 'Lia e Raquel (esposas)', '12 Filhos (Líderes das 12 Tribos)'],
    pointingToChrist: 'Jacó teve a visão da Escada de Betel que unia a terra ao céu. Em João 1:51, Jesus declara que Ele é a verdadeira Escada de Jacó — o único acesso vivo e pessoal entre o céu e a humanidade.',
    practicalApplication: 'Em vez de tentar garantir o futuro com nossas próprias forças e artimanhas, devemos nos render a Deus e buscar a Sua bênção legítima.',
    keyVerse: 'Não te deixarei ir, se me não abençoares. — Gênesis 32:26'
  },
  {
    id: 'jose-egito',
    name: 'José do Egito',
    meaning: 'Deus acrescenta',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Patriarcas e Egito (~1800 a.C.)',
    books: ['Gênesis', 'Atos', 'Hebreus'],
    passages: 'Gênesis 37 a 50',
    biography: 'Filho predileto de Jacó e Raquel, odiado e vendido como escravo por seus irmãos. Levado ao Egito, serviu na casa de Potifar e permaneceu íntegro ao rejeitar a tentação da esposa de seu senhor. Injustamente preso, interpretou os sonhos do padeiro e do copo-chefe e, posteriormente, os sonhos do Faraó sobre a fome. Promovido a Governador de todo o Egito, salvou o mundo antigo da fome e perdoou seus irmãos.',
    lessons: [
      'A presença de Deus acompanha o crente fiel mesmo no poço, na escravidão e na prisão.',
      'O perdão verdadeiro e a reconciliação superam o rancor e enxergam a mão soberana de Deus por trás do mal alheio.',
      'A integridade moral sob tentação atrai a aprovação e a honra vindas do céu.'
    ],
    relationships: ['Jacó (pai)', 'Raquel (mãe)', 'Benjamim (irmão germânico)', 'Asenate (esposa)', 'Manassés e Efraim (filhos)'],
    pointingToChrist: 'José é um dos tipos mais perfeitos de Cristo na Bíblia: amado pelo pai, rejeitado e vendido por seus irmãos por preço de prata, falsamente acusado, humilhado e rebaixado, e em seguida exaltado ao trono supremo para salvar as nações e conceder pão de vida e perdão aos seus próprios algozes.',
    practicalApplication: 'Confiar que Deus pode transformar o mal intencionado pelos homens no maior bem para a salvação de muitos.',
    keyVerse: 'Vós bem intentastes mal contra mim; porém Deus o intentou para bem... — Gênesis 50:20'
  },

  // --- MULHERES DA BÍBLIA ---
  {
    id: 'eva',
    name: 'Eva',
    meaning: 'Mãe de todos os viventes',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Criação & Origens',
    books: ['Gênesis', '2 Coríntios', '1 Timóteo'],
    passages: 'Gênesis 2 a 4',
    biography: 'Primeira mulher, formada por Deus a partir da costela de Adão para ser sua auxiliadora idônea e companheira perfeita no Éden. Enganada pela astúcia da serpente, duvidou da bondade da instrução divina e tomou do fruto proibido, oferecendo-o também a seu marido. Mãe de Caim, Abel e Sete, vivenciou a dor da perda e da rutura, mas recebeu o consolo da promessa de que sua Semente esmagaria a cabeça da serpente.',
    lessons: [
      'Duvidar da bondade e da veracidade da Palavra de Deus é o primeiro passo para o engano e para a queda.',
      'Tentações apelam aos olhos, aos desejos carnais e ao orgulho da mente; devemos filtrá-las pela verdade divina.',
      'Mesmo em meio às consequências do pecado, a esperança da redenção através da promessa divina permanece firme.'
    ],
    relationships: ['Adão (marido)', 'Caim, Abel e Sete (filhos)'],
    pointingToChrist: 'Eva é a mulher cuja "Semente" (Gênesis 3:15) seria o Messias Prometido. Jesus Cristo nasceu de uma mulher (Maria) para esmagar o poder do pecado e do Diabo na cruz.',
    practicalApplication: 'Proteger nossa mente e coração guardando fielmente as verdades de Deus contra as sutilezas da mentira do mundo.',
    keyVerse: 'E chamou Adão o nome de sua mulher Eva, porquanto ela era a mãe de todos os viventes. — Gênesis 3:20'
  },
  {
    id: 'sara',
    name: 'Sara',
    meaning: 'Princesa',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~2000 a.C.)',
    books: ['Gênesis', 'Isaias', 'Romanos', 'Hebreus', '1 Pedro'],
    passages: 'Gênesis 11 a 23, Hebreus 11:11',
    biography: 'Esposa de Abraão que o acompanhou na jornada de fé saindo de Ur dos Caldeus. Sofreu com a esterilidade prolongada durante décadas. Embora tenha hesitado tentando apressar a promessa ao oferecer sua serva Hagar, riu ao ouvir a promessa angelical de que conceberia aos 90 anos. Deus cumpriu a Sua Palavra e Sara deu à luz Isaque, tornando-se a mãe da nação da Aliança.',
    lessons: [
      'Deus é fiel para cumprir o que prometeu, mesmo quando a razão e a biologia declaram impossível.',
      'Nossos atalhos humanos para antecipar as promessas de Deus geram conflitos evitáveis; devemos esperar no tempo divino.',
      'Sara é elogiada em Hebreus 11 por considerar fiel Aquele que lhe havia feito a promessa.'
    ],
    relationships: ['Abraão (marido)', 'Isaque (filho da promessa)', 'Hagar (serva)'],
    pointingToChrist: 'Sara representa a Aliança da Graça e a Jerusalém celestial (Gálatas 4:22-31), gerando filhos do Espírito pela fé nas promessas impercíveis de Cristo.',
    practicalApplication: 'Descansar na fidelidade soberana de Deus, sabendo que nada é demasiado difícil para o Senhor.',
    keyVerse: 'Pela fé também a mesma Sara recebeu a virtude de conceber... visto que teve por fiel aquele que lho tinha prometido. — Hebreus 11:11'
  },
  {
    id: 'rute',
    name: 'Rute',
    meaning: 'Amiga / Companheira',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Era dos Juízes (~1100 a.C.)',
    books: ['Rute', 'Mateus'],
    passages: 'Livro de Rute 1 a 4',
    biography: 'Jovem moabita viúva que se recusou a abandonar sua sogra israelita Noemi após a morte de seus maridos. Abandonou seus deuses e sua terra natal declarando: "O teu povo é o meu povo, o teu Deus é o meu Deus". Trabalhou humildemente colhendo espigas nos campos de Boaz em Belém. Por sua virtude e lealdade, Boaz assumiu o papel de seu Remidor. Casou-se com ele e tornou-se bisavó do Rei Davi e ancestral direta de Jesus.',
    lessons: [
      'A lealdade amorosa e a fidelidade nos relacionamentos refletem o próprio caráter aliançado de Deus.',
      'A graça de Deus alcança os estrangeiros e excluídos, integrando-os na família da fé.',
      'Pequenas atitudes diárias de trabalho honesto e dedicação familiar são usadas por Deus para grandes propósitos eternos.'
    ],
    relationships: ['Noemi (sogra leal)', 'Boaz (marido e remidor)', 'Obede (filho)', 'Davi (bisneto)'],
    pointingToChrist: 'A história de Rute e Boaz é uma das mais belas alegorias do Evangelho. Boaz age como o "Gool" (Remidor de Parentesco), resgatando Rute da miséria — apontando para Jesus Cristo, nosso Remidor celestial que nos resgata com Seu próprio sangue.',
    practicalApplication: 'Cultivar amor leal e desinteressado pelas pessoas e confiar na providência invisível de Deus nas rotinas diárias.',
    keyVerse: 'Não me instes para que te deixe, e me volte de após ti; porque aonde quer que tu fores irei eu... o teu povo é o meu povo, o teu Deus é o meu Deus. — Rute 1:16'
  },
  {
    id: 'raabe',
    name: 'Raabe',
    meaning: 'Ampla / Espaçosa',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Conquista de Canaã (~1400 a.C.)',
    books: ['Josué', 'Mateus', 'Hebreus', 'Tiago'],
    passages: 'Josué 2 e 6, Hebreus 11:31',
    biography: 'Mulher cananita que vivia como prostituta na muralha da cidade de Jericó. Ao ouvir sobre os prodígios do Deus de Israel, creu de coração e acolheu em paz os dois espias enviados por Josué. Escondeu-os no eirado de sua casa e colocou um cordão de fio de escarlata na janela como sinal. Quando as muralhas desmoronaram, Raabe e toda a sua família foram salvos. Casou-se com Salmão e entrou na genealogia messiânica.',
    lessons: [
      'Nenhum passado pecaminoso é um obstáculo para a graça e a misericórdia transformadora de Deus.',
      'A fé genuína não é apenas um assentimento mental, mas se demonstra em ações concretas de coragem e risco.',
      'Deus acolhe na Sua Aliança qualquer pessoa que se arrependa e confie no Seu Nome.'
    ],
    relationships: ['Salmão (marido)', 'Boaz (filho)', 'Espias de Israel (a quem protegeu)'],
    pointingToChrist: 'O cordão de fio de escarlata pendurado na janela de Raabe simboliza o sangue de Jesus atrelado às nossas portas espirituais, garantindo proteção total contra a condenação.',
    practicalApplication: 'Crê na capacidade de Deus de transformar a história de vida de qualquer pessoa e agir com fé corajosa.',
    keyVerse: 'Pela fé Raabe, a meretriz, não pereceu com os incrédulos, acolhendo em paz os espias. — Hebreus 11:31'
  },
  {
    id: 'debora',
    name: 'Débora',
    meaning: 'Abelha',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Era dos Juízes (~1200 a.C.)',
    books: ['Juízes'],
    passages: 'Juízes 4 e 5',
    biography: 'Profetisa e a única mulher a servir como juíza de Israel durante o período conturbado dos Juízes. Sentava-se debaixo de uma palmeira entre Ramá e Betel, onde os israelitas subiam a ela para julgamento. Convocou o comandante Baraque por ordem divina para libertar Israel da opressão de Jabim, rei de Canaã. Quando Baraque hesitou ir sem ela, Débora acompanhou o exército com fé inabalável, profetizando a vitória.',
    lessons: [
      'Deus capacita e levanta mulheres com sabedoria, discernimento e autoridade espiritual para liderar e aconselhar.',
      'Liderança verdadeira inspira fé, encoraja outros a agir e atribui toda a glória a Deus.',
      'A presença de Deus transforma o temor humano em vitória esmagadora.'
    ],
    relationships: ['Lapidote (marido)', 'Baraque (comandante militar a quem aconselhou)', 'Jael (mulher que executou Sísera)'],
    pointingToChrist: 'Débora serve como uma figura que aponta para o governo sábio e libertador de Cristo, que julga com justiça, profetiza a verdade e assegura a paz duradoura para o Seu povo.',
    practicalApplication: 'Buscar discernimento espiritual na Palavra de Deus para influenciar com sabedoria a nossa comunidade e nação.',
    keyVerse: 'Despertou Débora, despertou; levantou-se, e entoou um cântico... — Juízes 5:12'
  },
  {
    id: 'ester',
    name: 'Ester',
    meaning: 'Estrela / Cidreira',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Império Persa (~480 a.C.)',
    books: ['Ester'],
    passages: 'Livro de Ester 1 a 10',
    biography: 'Uma jovem órfã judia exilada na Pérsia criada por seu primo Mardoqueu. Foi escolhida pelo rei Assuero para ser a nova rainha do Império Persa. Diante do decreto maligno de Hamã para aniquilar todos os judeus, Ester arriscou a própria vida ao comparecer perante o rei sem ser chamada, declarando "Se perecer, pereci". Por meio de jejum e sabedoria, Deus usou sua posição para preservar o Seu povo.',
    lessons: [
      'Deus atua de forma providencial mesmo quando Seu Nome não é explicitamente mencionado nas circunstâncias.',
      'Deus nos coloca em posições estratégicas de influência para servir aos Seus propósitos eternos.',
      'A coragem moral aliada ao jejum e à oração prevalece sobre as tramas do inimigo.'
    ],
    relationships: ['Mardoqueu (primo e tutor)', 'Assuero (marido e rei persa)', 'Hamã (adversário do povo)'],
    pointingToChrist: 'Ester é uma intercessora disposta a dar a vida pelo seu povo perante o trono da soberania. Cristo fez isso de forma perfeita: apresentou-Se diante do Pai carregando nossos pecados e consumando nossa libertação.',
    practicalApplication: 'Reconhecer que estamos nos lugares onde estamos "para um momento como este".',
    keyVerse: 'E quem sabe se para tal tempo como este chegaste a este reino? — Ester 4:14'
  },
  {
    id: 'ana',
    name: 'Ana',
    meaning: 'Graça / Favor',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Fim dos Juízes (~1100 a.C.)',
    books: ['1 Samuel', 'Lucas'],
    passages: '1 Samuel 1 e 2',
    biography: 'Mulher piedosa e estéril que sofria provocações constantes de Penina. Em profunda aflição de alma, orou no Tabernáculo em Siló derramando seu coração perante o Senhor e prometendo consagrar o filho ao serviço divino. Deus ouviu sua oração e lhe deu Samuel. Seu cântico profético de gratidão em 1 Samuel 2 é um dos mais belos hinos de louvor à soberania divina.',
    lessons: [
      'Em momentos de angústia profunda, o melhor refúgio é derramar a alma com honestidade diante de Deus em oração.',
      'Deus exalta os humildes e humilha os soberbos.',
      'Consagrar a Deus aquilo que recebemos dEle é a mais elevada forma de gratidão.'
    ],
    relationships: ['Elcana (marido)', 'Samuel (filho consagrado ao Senhor)', 'Eli (sacerdote)'],
    pointingToChrist: 'O Cântico de Ana inspira diretamente o Magnificat de Maria em Lucas 1. Ambas celebram o Deus que levanta o necessitado do pó e providencia a Salvação messiânica.',
    practicalApplication: 'Entregar nossas maiores dores e pedidos a Deus em oração crente e cumprir com alegria os nossos votos.',
    keyVerse: 'Por este menino orava eu; e o SENHOR me concedeu a minha petição... — 1 Samuel 1:27'
  },
  {
    id: 'maria-mae-de-jesus',
    name: 'Maria (Mãe de Jesus)',
    meaning: 'Soberana / Amada por Deus',
    category: 'Mulheres da Bíblia',
    testament: 'Novo Testamento',
    period: 'Início do Século I d.C.',
    books: ['Mateus', 'Lucas', 'João', 'Atos'],
    passages: 'Lucas 1 e 2, João 2 e 19, Atos 1',
    biography: 'Jovem virgem de Nazaré, noiva de José, da linhagem de Davi. Recebeu a visita do anjo Gabriel anunciando que conceberia o Filho de Deus pelo poder do Espírito Santo. Respondeu com total submissão: "Eis aqui a serva do Senhor". Presenciou o nascimento, ministério, milagres e a dor atroz da crucificação de seu Filho na cruz, estando presente com os discípulos no cenáculo em Pentecostes.',
    lessons: [
      'A verdadeira grandeza espiritual se manifesta na humildade e na disposição graciosa de obedecer à vontade de Deus.',
      'A fé no propósito divino traz consolo mesmo diante das espadas de dor que atravessam a alma.',
      'Guardar as revelações de Deus e meditá-las no coração fortalece a vida cristã.'
    ],
    relationships: ['José (marido)', 'Jesus Cristo (filho segundo a carne)', 'Isabel (prima)', 'João Apóstolo (a quem Jesus a confiou)'],
    pointingToChrist: 'Maria é o vaso escolhido por Deus para a Encarnação do Filho eterno. Ela proclama que todas as gerações a chamarão bem-aventurada por causa das grandes coisas que o Todo-Poderoso fez ao enviar o Redentor.',
    practicalApplication: 'Guardar a Palavra de Deus e meditá-la no coração, submetendo planos pessoais à vontade soberana do Pai.',
    keyVerse: 'Eis aqui a serva do Senhor; cumpra-se em mim segundo a tua palavra. — Lucas 1:38'
  },
  {
    id: 'maria-madalena',
    name: 'Maria Madalena',
    meaning: 'Da cidade de Magdala',
    category: 'Mulheres da Bíblia',
    testament: 'Novo Testamento',
    period: 'Ministério de Jesus (30-33 d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João'],
    passages: 'Lucas 8:1-3, João 20:1-18',
    biography: 'Liberta por Jesus de sete demônios, tornou-se uma das mais dedicadas seguidoras e mantenedoras de Seu ministério itinerante. Esteve fielmente ao pé da cruz quando os discípulos haviam fugido e foi de madrugada ao sepulcro. Teve a honra suprema de ser a primeira testemunha ocular do Cristo Ressurreto e a encarregada de anunciar a ressurreição aos apóstolos.',
    lessons: [
      'Aquele a quem muito se perdoa e de quem muito se retira a opressão, muito ama e serve com alegria.',
      'A devoção dedicada ao Senhor atrai revelação gloriosa e profunda comunhão espiritual.',
      'Jesus valoriza e comissiona os contritos para serem testemunhas da Sua vitória.'
    ],
    relationships: ['Jesus (Senhor e Libertador)', 'Outras mulheres discípulas (Joana, Suzana, Maria mãe de Tiago)'],
    pointingToChrist: 'Maria Madalena é a primeira anunciadora do Evangelho do Cristo Ressuscitado, provando que o Reino de Deus dignifica e comissiona os contritos para serem testemunhas da vida eterna.',
    practicalApplication: 'Buscar a presença do Senhor com fervor diário e testemunhar com coragem que Jesus vive.',
    keyVerse: 'Vi o Senhor! — João 20:18'
  },
  {
    id: 'lidia',
    name: 'Lídia de Tiatira',
    meaning: 'Originária da Lídia',
    category: 'Mulheres da Bíblia',
    testament: 'Novo Testamento',
    period: 'Primeira Igreja na Europa (~50 d.C.)',
    books: ['Atos'],
    passages: 'Atos 16:11-40',
    biography: 'Comerciante próspera de tecidos de púrpura da cidade de Tiatira, residente em Filipos. Temente a Deus, reunia-se aos sábados para orar à beira do rio com outras mulheres. Ao ouvir a pregação do Apóstolo Paulo, o Senhor lhe abriu o coração para atender às coisas ditas. Foi batizada com toda a sua casa e abriu sua residência como ponto de acolhimento e base para a primeira igreja cristã fundada na Europa.',
    lessons: [
      'Deus abre o coração humano para compreender e abraçar o Evangelho mediante a pregação da Palavra.',
      'A prosperidade e o trabalho profissional devem ser consagrados ao serviço do Reino de Deus.',
      'A hospitalidade e a generosidade são marcas registradas da conversão autêntica.'
    ],
    relationships: ['Apóstolo Paulo e Silas (hóspedes e líderes missionários)', 'Sua família e servos (convertidos juntos)'],
    pointingToChrist: 'A conversão de Lídia ilustra a obra soberana de Cristo pela ação do Espírito Santo, demonstrando que a salvação alcança todas as camadas sociais e povos.',
    practicalApplication: 'Usar nossa profissão, recursos e casa como instrumentos de evangelização e fortalecimento da igreja.',
    keyVerse: 'E uma certa mulher, chamada Lídia... temente a Deus, nos ouvia, e o Senhor lhe abriu o coração para que estivesse atenta ao que Paulo dizia. — Atos 16:14'
  },
  {
    id: 'priscila',
    name: 'Priscila (e Áquila)',
    meaning: 'Antiga / Venerável',
    category: 'Mulheres da Bíblia',
    testament: 'Novo Testamento',
    period: 'Expansão Apostólica (~50-65 d.C.)',
    books: ['Atos', 'Romanos', '1 Coríntios', '2 Timóteo'],
    passages: 'Atos 18, Romanos 16:3-5',
    biography: 'Esposa de Áquila, casal de judeus cristãos expulsos de Roma pelo imperador Cláudio. Eram fabricantes de tendas, mesma profissão de Paulo, com quem estabeleceram profunda amizade em Corinto. Mestres dedicados da Palavra, acolheram o eloquente pregador Apolo em Éfeso e lhe explicaram com mais exatidão o caminho de Deus. Paulo refere-se a eles como "meus cooperadores em Cristo Jesus, os quais pela minha vida expuseram as suas cabeças".',
    lessons: [
      'Casais unidos na fé e no trabalho tornam-se forças poderosíssimas para o avanço do Reino de Deus.',
      'O ensino teológico e a mentoria pessoal devem ser conduzidos com graça, discrição e exatidão bíblica.',
      'A hospitalidade e o risco pessoal em favor dos líderes do Evangelho fortalecem a Igreja universal.'
    ],
    relationships: ['Áquila (marido e co-obreiro)', 'Apóstolo Paulo (amigo e parceiro de ministério)', 'Apolo (discípulo instruído por eles)'],
    pointingToChrist: 'Priscila e Áquila exemplificam o Corpo de Cristo trabalhando harmoniosamente sob o Senhorio de Jesus, edificando a igreja em diferentes cidades e culturas.',
    practicalApplication: 'Dedicar o casamento e a casa ao ensino da Palavra e ao apoio ativo de outros irmãos na fé.',
    keyVerse: 'Saudai a Priscila e a Áquila, meus cooperadores em Cristo Jesus... — Romanos 16:3'
  },

  // --- REIS ---
  {
    id: 'saul',
    name: 'Saul',
    meaning: 'Pedido / Solicitado',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Início da Monarquia (~1050 a.C.)',
    books: ['1 Samuel'],
    passages: '1 Samuel 9 a 31',
    biography: 'Primeiro rei de Israel, da tribo de Benjamim, notável por sua alta estatura e beleza física. Escolhido após o povo exigir um rei "como as outras nações". Inicialmente humilde, Saul obteve vitórias militares significativas. No entanto, cedeu impacientemente ao orgulho e ao medo de homens, oferecendo um sacrifício ilícito no lugar de Samuel e desobedecendo à ordem direta de Deus sobre os amalequitas. Rejeitado por Deus, foi consumido por ciúme doentio contra Davi.',
    lessons: [
      'A obediência parcial é considerada por Deus como rebelião; Ele prefere a obediência ao sacrifício.',
      'Dotes físicos e posições de destaque sem um coração submisso levam ao fracasso espiritual.',
      'O ciúme e a inveja não tratamos destroem a saúde mental, os relacionamentos e o legado de um líder.'
    ],
    relationships: ['Kis (pai)', 'Jônatas (filho leal)', 'Mical (filha e esposa de Davi)', 'Samuel (profeta que o ungiu)'],
    pointingToChrist: 'Saul representa o rei escolhido segundo a carne que falha irremediavelmente, contrastando com Jesus Cristo, o Rei Perfeito segundo o Espírito que governa com perfeita justiça e obediência absoluta ao Pai.',
    practicalApplication: 'Guardar o coração contra o orgulho e o medo da opinião dos outros, submetendo cada decisão à Palavra de Deus.',
    keyVerse: 'Eis que o obedecer é melhor do que o sacrificar; e o atender melhor é do que a gordura de carneiros. — 1 Samuel 15:22'
  },
  {
    id: 'davi',
    name: 'Davi',
    meaning: 'Amado',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Monarquia Unificada (~1000 a.C.)',
    books: ['1 Samuel', '2 Samuel', '1 Crônicas', 'Salmos', 'Mateus'],
    passages: '1 Samuel 16 a 1 Reis 2',
    biography: 'O mais jovem dos filhos de Jessé, ungido rei de Israel por Samuel enquanto ainda era pastor de ovelhas. Notabilizou-se ao derrotar o gigante Golias com fé no Nome de Deus. Sofreu perseguição implacável do rei Saul antes de assumir o trono. Conquistou Jerusalém, unificou o reino e recebeu a grande Promessa da Aliança Davídica de que o seu trono seria estabelecido para sempre. Apesar de sua piedade profunda, caiu em adultério e homicídio, mas foi perdoado após genuíno arrependimento.',
    lessons: [
      'Deus não enxerga como o homem enxerga; o Senhor olha para o coração e não para a aparência exterior.',
      'O arrependimento sincero reconhece a gravidade do pecado contra Deus e clama exclusivamente pela misericórdia purificadora.',
      'A verdadeira adoração envolve expressar toda a nossa humanidade e emoções diante de Deus com honestidade.'
    ],
    relationships: ['Jessé (pai)', 'Jônatas (amigo leal)', 'Mical (esposa)', 'Bate-Seba (esposa)', 'Salomão (filho)'],
    pointingToChrist: 'Jesus é o herdeiro legítimo da aliança davídica, repetidamente chamado de "Filho de Davi". Davi é o rei ungido que vence os inimigos em favor do seu povo (assim como Jesus derrota Satanás e a morte). Seus salmos expressam de forma profética o sofrimento e a exaltação futura do Messias (ex: Salmo 22 e Salmo 110).',
    practicalApplication: 'A busca por Deus com todo o coração deve guiar cada decisão nossa, e as nossas falhas devem nos conduzir de volta à cruz com fé purificadora.',
    keyVerse: 'O SENHOR é o meu pastor; nada me faltará. — Salmo 23:1'
  },
  {
    id: 'salomao',
    name: 'Salomão',
    meaning: 'Pacífico / Paz',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Apogeu do Reino Unificado (~970 a.C.)',
    books: ['1 Reis', '2 Crônicas', 'Provérbios', 'Eclesiastes', 'Cânticos'],
    passages: '1 Reis 1 a 11',
    biography: 'Filho de Davi e Bate-Seba. Quando Deus lhe apareceu em sonho oferecendo conceder o que quisesse, Salomão pediu sabedoria para governar o povo. Tornou-se o homem mais sábio e próspero de sua época, construiu o majestoso Primeiro Templo em Jerusalém e escreveu provérbios e cânticos. No fim da vida, atraído por suas muitas esposas estrangeiras, tolerou a idolatria, aprendendo a amarga lição da vaidade das coisas terrenas.',
    lessons: [
      'A sabedoria intelectual e administrativa sem a obediência perseverante não impede o desvio do coração.',
      'Tudo sob o sol é vaidade se não estiver fundamentado no temor do Senhor e na guarda de Seus mandamentos.',
      'Pequenas concessões morais e espirituais ao longo do tempo podem corromper uma vida outrora brilhante.'
    ],
    relationships: ['Davi (pai)', 'Bate-Seba (mãe)', 'Rainha de Sabá (visitante ilustre)', 'Roboão (filho e sucessor)'],
    pointingToChrist: 'Jesus declarou em Mateus 12:42: "Eis que está aqui quem é maior do que Salomão". Salomão aponta para a sabedoria gloriosa de Cristo e para o Rei da Paz que edifica o verdadeiro Templo espiritual (a Igreja).',
    practicalApplication: 'Pedir a Deus sabedoria do alto e vigiar para que as bênçãos materiais não roubem a nossa devoção exclusiva a Deus.',
    keyVerse: 'O temor do SENHOR é o princípio da sabedoria... — Provérbios 9:10'
  },
  {
    id: 'ezequias',
    name: 'Ezequias',
    meaning: 'O Senhor fortalece',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Reino de Judá (~715 a.C.)',
    books: ['2 Reis', '2 Crônicas', 'Isaías'],
    passages: '2 Reis 18 a 20, Isaías 36 a 39',
    biography: 'Um dos reis mais piedosos de Judá. Promoveu uma grande reforma religiosa, destruindo os altos idólatras e reabrindo o Templo. Quando Senaqueribe, rei da Assíria, cercou Jerusalém com um exército poderoso e enviou cartas blasfemas, Ezequias levou a carta ao Templo, estendeu-a perante o Senhor e orou com fervor. Em resposta, o Anjo do Senhor destruiu 185 mil soldados assírios em uma noite. Quando adoeceu mortalmente, orou e Deus lhe acrescentou 15 anos de vida.',
    lessons: [
      'A oração fervorosa acompanhada pela entrega total de nossos problemas diante de Deus move os céus.',
      'Remover os "altos" idólatras da nossa vida é pré-requisito para um verdadeiro avivamento espiritual.',
      'Devemos ter cuidado com a soberba nos momentos de prosperidade e livramento extraordinário.'
    ],
    relationships: ['Acaz (pai ímpio a quem sucedeu)', 'Isaías (profeta e conselheiro)', 'Manassés (filho e sucessor)'],
    pointingToChrist: 'Ezequias aponta para Cristo como o Rei justo que purifica a adoração, intercede pelo povo sob ameaça e restaura a vida sobre a morte.',
    practicalApplication: 'Apresentar nossas cartas de ameaças e angústias diretamente diante de Deus em oração confiante.',
    keyVerse: 'E orou Ezequias diante do SENHOR... Ó SENHOR Deus de Israel, que habitas entre os querubins, tu mesmo, só tu és Deus de todos os reinos da terra... — 2 Reis 19:15'
  },
  {
    id: 'josias',
    name: 'Josias',
    meaning: 'O Senhor cura / O Senhor sustenta',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Reino de Judá (~640 a.C.)',
    books: ['2 Reis', '2 Crônicas'],
    passages: '2 Reis 22 e 23, 2 Crônicas 34 e 35',
    biography: 'Tornou-se rei de Judá com apenas 8 anos de idade. Aos 16 anos começou a buscar o Deus de Davi e aos 20 iniciou a purificação de Jerusalém. Durante os reparos no Templo, o sumo sacerdote Hilquias encontrou o Livro da Lei esquecido. Ao ouvir a leitura da Lei, Josias rasgou suas vestes em profundo contrito arrependimento, renovou a aliança com Deus e realizou a maior Páscoa que Israel vira desde os dias dos Juízes.',
    lessons: [
      'A Palavra de Deus redescoberta tem o poder de transformar vidas, igrejas e nações inteiras.',
      'Idade não é barreira para ser um instrumento poderoso de avivamento nas mãos de Deus.',
      'O verdadeiro arrependimento produz ações drásticas de remoção do pecado e volta às Escrituras.'
    ],
    relationships: ['Hilquias (sumo sacerdote)', 'Hulda (profetisa consultada por ele)', 'Jeremias (profeta contemporâneo)'],
    pointingToChrist: 'Josias é o rei fiel que restaura o culto verdadeiro e a Palavra de Deus, prefigurando Jesus Cristo, o Rei que cumpre e restaura perfeitamente a Lei de Deus em nossos corações.',
    practicalApplication: 'Permitir que a leitura da Bíblia confronte nossas atitudes e nos conduza ao arrependimento sincero e à renovação de compromisso.',
    keyVerse: 'E antes dele não ouve rei tal, que se convertesse ao SENHOR com todo o seu coração, e com toda a sua alma, e com todas as suas forças... — 2 Reis 23:25'
  },

  // --- PROFETAS ---
  {
    id: 'moises',
    name: 'Moisés',
    meaning: 'Tirado das águas',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Êxodo e Deserto (~1450 a.C.)',
    books: ['Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Hebreus'],
    passages: 'Êxodo 2 a Deuteronômio 34',
    biography: 'Salvo milagrosamente da matança de bebês hebreus e criado na corte egípcia. Após passar 40 anos no deserto de Midiã como pastor, foi comissionado por Deus na sarça ardente. Liderou a saída do povo do Egito sob as dez pragas, conduziu a travessia do Mar Vermelho, serviu como mediador da aliança no Monte Sinai onde recebeu os Dez Mandamentos e guiou Israel pelo deserto.',
    lessons: [
      'O preparo de Deus para a liderança envolve quebrantamento e humildade profunda.',
      'A lei mostra o padrão perfeito da justiça de Deus e a nossa incapacidade de cumpri-la de forma autônoma.',
      'O líder de Deus intercede com paixão pelo povo, colocando a glória do Senhor acima do seu interesse pessoal.'
    ],
    relationships: ['Arão (irmão)', 'Miriã (irmã)', 'Zípora (esposa)', 'Jetro (sogro)', 'Josué (discípulo e sucessor)'],
    pointingToChrist: 'Moisés aponta para Cristo como o maior Mediador, Profeta e Libertador. Deuteronômio 18:15 profetizou a vinda de um Profeta semelhante a Moisés. Enquanto Moisés foi um servo fiel na casa de Deus, Jesus é o Filho sobre Sua própria casa. Moisés deu a lei que condena, mas Jesus nos trouxe a graça e a verdade que nos libertam.',
    practicalApplication: 'Aprender a depositar nossa identidade na fidelidade de Deus e não na nossa própria eloqüência ou força para realizar Seus planos.',
    keyVerse: 'O SENHOR, teu Deus, te suscitará um profeta do meio de ti, de teus irmãos, como eu; a ele ouvireis. — Deuteronômio 18:15'
  },
  {
    id: 'elias',
    name: 'Elias',
    meaning: 'Meu Deus é o Senhor',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Reino do Norte (~860 a.C.)',
    books: ['1 Reis', '2 Reis', 'Malaquias', 'Mateus', 'Tiago'],
    passages: '1 Reis 17 a 2 Reis 2',
    biography: 'Profeta destemido de Tisbe que confrontou o ímpio rei Acabe e a rainha Jezabel no Reino de Israel. Fechou os céus para que não chovesse durante três anos e meio. No Monte Carmelo, desafiou os 450 profetas de Baal e orou até que o fogo de Deus descesse e consumisse o holocausto. Arrebatado ao céu em um redemoinho por um carro de fogo, apareceu séculos mais tarde na Transfiguração com Jesus.',
    lessons: [
      'A oração fervorosa do justo tem grande poder em seus efeitos (Tiago 5:17).',
      'Mesmo os maiores servos de Deus passam por momentos de exaustão e depressão, sendo acolhidos pela ternura do Senhor.',
      'Não devemos vacilar entre dois pensamentos: a lealdade a Deus exige decisão exclusiva.'
    ],
    relationships: ['Acabe e Jezabel (oponentes)', 'Viúva de Serepta (hospedeira)', 'Eliseu (discípulo e sucessor)'],
    pointingToChrist: 'Elias veio como profeta precursor do julgamento e da restauração. João Batista veio no "espírito e virtude de Elias" para preparar o caminho para o Messias Jesus.',
    practicalApplication: 'Manter posicionamento firme contra o compromisso idólatra da cultura sem perder a dependência da oração.',
    keyVerse: 'Até quando coxeareis entre dois pensamentos? Se o SENHOR é Deus, segui-lo... — 1 Reis 18:21'
  },
  {
    id: 'eliseu',
    name: 'Eliseu',
    meaning: 'Deus é Salvação',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Reino do Norte (~850 a.C.)',
    books: ['1 Reis', '2 Reis'],
    passages: '1 Reis 19:19-21, 2 Reis 2 a 13',
    biography: 'Chamado enquanto arava o campo com doze juntas de bois. Deixou tudo para seguir Elias. Pediu e recebeu uma porção dobrada do espírito de Elias antes de seu arrebatamento. Operou duas vezes mais milagres registrados do que Elias, incluindo a purificação das águas de Jericó, a multiplicação do azeite da viúva, a ressurreição do filho da sunamita e a cura da lepra de Naamã, o sírio.',
    lessons: [
      'Servir fielmente em tarefas simples e diárias é o melhor terreno para a preparação de um grande ministério.',
      'A compaixão e a generosidade do Senhor se manifestam em milagres para atender às necessidades diárias do Seu povo.',
      'A visão espiritual enxerga que "mais são os que estão conosco do que os que estão com eles" (2 Reis 6:16).'
    ],
    relationships: ['Elias (mentor)', 'Geazi (servo ganancioso)', 'Mulher Sunamita (hospedeira)', 'Naamã (comandante sírio curado)'],
    pointingToChrist: 'Eliseu prefigura o ministério de graça, milagres e cura de Jesus Cristo. Como Jesus, Eliseu purificou leprosos, multiplicou pães e ressuscitou os mortos com profunda compaixão.',
    practicalApplication: 'Confiar na proteção invisível dos exércitos celestiais de Deus e servir com compaixão aos necessitados.',
    keyVerse: 'Não temas; porque mais são os que estão conosco do que os que estão com eles. — 2 Reis 6:16'
  },
  {
    id: 'isaias',
    name: 'Isaías',
    meaning: 'A Salvação é do Senhor',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Século VIII a.C. (~740 a.C.)',
    books: ['Isaías', 'Mateus', 'Atos', 'Romanos'],
    passages: 'Livro de Isaías 1 a 66',
    biography: 'Conhecido como o "Profeta Evangélico" por causa de suas extraordinárias profecias cristológicas. Chamado no ano em que morreu o rei Uzias após ver o Senhor num trono alto e sublime. Ministrou em Judá sob quatro reis, profetizando tanto o julgamento do cativeiro quanto a restauração gloriosa do Remanescente e a vinda do Servo Sofredor.',
    lessons: [
      'A visão da santidade absoluta de Deus produz imediata consciência de pecado e prontidão para o serviço.',
      'Deus guarda e restaura o Seu povo mesmo através do fogo da disciplina.',
      'A salvação não vem por esforço próprio, mas é uma obra soberana e graciosa do Senhor.'
    ],
    relationships: ['Uzias, Jotão, Acaz e Ezequias (reis de Judá em cujo reinado profetizou)'],
    pointingToChrist: 'Isaías contém alguns dos retratos mais impressionantes do Messias: nascido de uma virgem (7:14), Maravilhoso Conselheiro e Deus Forte (9:6), e o Servo Sofredor transpassado pelas nossas transgressões em Isaías 53.',
    practicalApplication: 'Responder com prontidão de coração ao chamado de Deus: "Eis-me aqui, envia-me a mim".',
    keyVerse: 'Mas ele foi ferido por causa das nossas transgressões e moído por causa das nossas iniquidades... — Isaías 53:5'
  },
  {
    id: 'jeremias',
    name: 'Jeremias',
    meaning: 'O Senhor exalta / O Senhor estabelece',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Declínio e Cativeiro de Judá (~626-586 a.C.)',
    books: ['Jeremias', 'Lamentações'],
    passages: 'Livro de Jeremias e Lamentações',
    biography: 'Conhecido como o "Profeta Lloroso" devido ao seu profundo sofrimento e lágrimas pelo pecado e destruição de Jerusalém. Chamado ainda jovem no ventre materno, profetizou durante 40 anos sem que o povo se arrependesse. Enfrentou prisão, espancamentos, ser lançado num poço de lama e acusações de traição. Profetizou com precisão os 70 anos de cativeiro na Babilônia e a Promessa da Nova Aliança.',
    lessons: [
      'O sucesso do ministério aos olhos de Deus mede-se pela fidelidade e não pelo aplauso ou número de convertidos.',
      'Mesmo nas lágrimas e perseguições, a Palavra de Deus queima como fogo no peito e não pode ser calada.',
      'A esperança do Evangelho brilha mais forte no meio da ruína e do desespero humano.'
    ],
    relationships: ['Baque (escriba leal)', 'Ebede-Meleque (eunuco etíope que o salvou da cova de lama)'],
    pointingToChrist: 'Jeremias profetizou expressamente a "Nova Aliança" escrita nos corações (Jeremias 31:31-34), que Jesus instituiu com o Seu próprio sangue na Última Ceia.',
    practicalApplication: 'Permanecer fiel na pregação da verdade bíblica mesmo quando a cultura rejeitar a mensagem.',
    keyVerse: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o SENHOR; pensamentos de paz, e não de mal, para vos dar o fim que esperais. — Jeremias 29:11'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    meaning: 'Deus é meu Juiz',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Cativeiro Babilônico e Persa (~605-530 a.C.)',
    books: ['Daniel', 'Mateus'],
    passages: 'Livro de Daniel 1 a 12',
    biography: 'Jovem nobre judeu levado cativo para a Babilônia por Nabucodonosor. Decidiu no seu coração não se contaminar com as finas iguarias do rei. Deus lhe deu sabedoria incomparável e a capacidade de interpretar sonhos imperiais. Serviu fielmente em quatro reinados (Babilônia e Pérsia). Quando idoso, foi lançado na cova dos leões por manter sua rotina inegociável de oração três vezes ao dia, sendo livrado por um anjo.',
    lessons: [
      'Propor no coração permanecer puro antes que a tentação chegue é o segredo da vitória espiritual.',
      'É possível exercer excelência profissional em um ambiente secular sem negociar a fé em Deus.',
      'Deus domina soberanamente sobre os reinos dos homens e protege os Seus servos fiéis.'
    ],
    relationships: ['Hananias, Misael e Azarias (Sadraque, Mesaque e Abede-Nego - amigos fiéis)', 'Dario (rei persa)'],
    pointingToChrist: 'Daniel teve a visão apocalíptica do "Filho do Homem" vindo nas nuvens do céu para receber um reino eterno (Daniel 7:13-14) — título que Jesus mais utilizou para Se autodescrever nos Evangelhos.',
    practicalApplication: 'Manter disciplinas espirituais diárias de oração e integridade inflexível no trabalho e na sociedade.',
    keyVerse: 'E Daniel propôs no seu coração não se contaminar com a porção das iguarias do rei... — Daniel 1:8'
  },
  {
    id: 'jonas',
    name: 'Jonas',
    meaning: 'Pomba',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Reino de Israel (~760 a.C.)',
    books: ['Jonas', 'Mateus'],
    passages: 'Livro de Jonas 1 a 4, Mateus 12:38-41',
    biography: 'Profeta de Galileia enviado por Deus para pregar o arrependimento na ímpia cidade de Nínive, capital da Assíria. Tentando fugir da presença de Deus, embarcou num navio para Társis. Lançado ao mar no meio de uma tempestade, foi engolido por um grande peixe, onde orou e se arrependeu após três dias e três noites. Pregou em Nínive e a cidade inteira se arrependeu em pano de saco, ensinando a Jonas a lição sobre a compaixão universal de Deus.',
    lessons: [
      'Ninguém pode fugir da presença ou da soberania de Deus; a obediência adiada gera tempestades.',
      'O amor e a misericórdia de Deus alcançam todas as nações, mesmo aqueles a quem consideramos inimigos.',
      'A graça de Deus nos dá segundas oportunidades para cumprir o Seu propósito.'
    ],
    relationships: ['Marinheiros do navio (convertidos na tempestade)', 'Povo de Nínive (que se arrependeu)'],
    pointingToChrist: 'Jesus declarou que o único sinal dado àquela geração seria "o sinal do profeta Jonas": assim como Jonas esteve três dias e três noites no ventre do peixe, assim o Filho do Homem estaria três dias no coração da terra antes da Sua ressurreição (Mateus 12:40).',
    practicalApplication: 'Aprender a amar e levar a mensagem de salvação a todos os povos sem preconceito cultural ou nacional.',
    keyVerse: 'E não hei de eu ter compaixão da grande cidade de Nínive... — Jonas 4:11'
  },
  {
    id: 'joao-batista',
    name: 'João Batista',
    meaning: 'O Senhor é Gracioso',
    category: 'Profetas',
    testament: 'Novo Testamento',
    period: 'Início do Século I d.C. (~28-30 d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João'],
    passages: 'Mateus 3 e 14, Lucas 1 e 3, João 1 e 3',
    biography: 'Filho do sacerdote Zacarias e de Isabel, nascido na velhice deles. Cresceu no deserto vestindo pelos de camelo e alimentando-se de gafanhotos e mel silvestre. Pregava o batismo de arrependimento no rio Jordão, preparando o caminho para o Messias. Teve o privilégio supremo de batizar Jesus e apontá-Lo publicamente como "o Cordeiro de Deus que tira o pecado do mundo". Foi decapitado por ordem de Herodes Antipas por denunciar seu adultério.',
    lessons: [
      'A verdadeira grandeza espiritual está na humildade de diminuir para que Cristo cresça.',
      'A coragem de proclamar a verdade de Deus não se curva perante reis, ameaças ou convenções sociais.',
      'O nosso papel principal é apontar as pessoas para Jesus Cristo e não para nós mesmos.'
    ],
    relationships: ['Zacarias e Isabel (pais)', 'Jesus Cristo (primo e Senhor a Quem serviu)', 'Herodes Antipas (quem o mandou matar)'],
    pointingToChrist: 'João Batista é o último e maior profeta do Antigo Testamento que aponta fisicamente com o dedo para Cristo: "Eis o Cordeiro de Deus, que tira o pecado do mundo!" (João 1:29).',
    practicalApplication: 'Viver com a convicção profunda de que "É necessário que Ele cresça e que eu diminua".',
    keyVerse: 'É necessário que ele cresça e que eu diminua. — João 3:30'
  },

  // --- APÓSTOLOS ---
  {
    id: 'pedro',
    name: 'Pedro (Simão)',
    meaning: 'Rocha / Pedra',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Igreja Primitiva (Séc. I d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos', '1 Pedro', '2 Pedro'],
    passages: 'Mateus 4 a Atos 15, 1 e 2 Pedro',
    biography: 'Pescador galileu de temperamento impulsivo, chamado com seu irmão André para ser "pescador de homens". Tornou-se o porta-voz dos doze discípulos e fez a grande declaração messiânica no Cesaréia de Filipe. Após jurar lealdade, negou Jesus três vezes antes da crucificação. Restaurado de forma amorosa por Cristo na praia da Galileia, foi revestido do Espírito Santo em Pentecostes, tornando-se o principal pregador da igreja apostólica inicial.',
    lessons: [
      'Nossa autoconfiança é perigosa e falha; o orgulho precede a queda espiritual.',
      'A graça de Cristo é maior do que nossas piores quedas, oferecendo perdão, cura e restauração ministerial completa.',
      'A transformação do temperamento impulsivo em firmeza de fé é uma obra exclusiva do Espírito Santo.'
    ],
    relationships: ['André (irmão)', 'Tiago e João (parceiros de pesca)', 'Jesus (Mestre)', 'Paulo (co-apóstolo)'],
    pointingToChrist: 'Pedro proclama que Jesus é "o Cristo, o Filho do Deus vivo". Em suas epístolas, aponta para Cristo como a Pedra Angular sobre a qual a Igreja está edificada e o Cordeiro sem defeito.',
    practicalApplication: 'Em vez de confiar no nosso próprio fervor, devemos edificar nossa esperança e vida na rocha inabalável que é Cristo.',
    keyVerse: 'Tu és o Cristo, o Filho do Deus vivo. — Mateus 16:16'
  },
  {
    id: 'joao-apostolo',
    name: 'João (O Discípulo Amado)',
    meaning: 'O Senhor é Gracioso',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Igreja Primitiva e Fim do Séc. I d.C.',
    books: ['Evangelho de João', '1 João', '2 João', '3 João', 'Apocalipse'],
    passages: 'Evangelho de João e Livro de Apocalipse',
    biography: 'Filho de Zebedeu e irmão de Tiago, apelidados por Jesus de "Boanerges" (Filhos do Trovão) por seu zelo ardente. Integrante do círculo íntimo de Cristo (com Pedro e Tiago), reclinou-se sobre o peito de Jesus na Última Ceia. Permaneceu junto à cruz e recebeu a incumbência de cuidar de Maria. Na velhice, exilado na ilha de Patmos, recebeu as gloriosas visões do livro de Apocalipse.',
    lessons: [
      'A intimidade com Cristo transforma o zelo impetuoso em amor profundo, zeloso e gracioso.',
      'A verdade doutrinária e o amor prático são inseparáveis na vida cristã autêntica.',
      'O amor perfeito lança fora todo o medo.'
    ],
    relationships: ['Zebedeu (pai)', 'Tiago (irmão)', 'Pedro (companheiro de ministério)', 'Jesus (Mestre amado)'],
    pointingToChrist: 'O Evangelho de João apresenta Jesus como o Logos (A Palavra eterna) que se fez carne. Em Apocalipse, João contempla o Cristo Glorificado, o Alfa e o Ômega, o Leão da Tribo de Judá e o Cordeiro assentado no Trono.',
    practicalApplication: 'Permanecer no amor de Cristo e testificar com coragem a verdade da salvação.',
    keyVerse: 'Nisto conhecemos o amor: que ele deu a sua vida por nós... — 1 João 3:16'
  },
  {
    id: 'paulo',
    name: 'Paulo (Saulo de Tarso)',
    meaning: 'Pequeno / Escolhido',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Expansão Missionária Apostólica (33-67 d.C.)',
    books: ['Romanos', '1 e 2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 e 2 Tessalonicenses', '1 e 2 Timóteo', 'Tito', 'Filemom'],
    passages: 'Atos 9 a 28, Epístolas Paulinas',
    biography: 'Fariseu zeloso nascido em Tarso e educado aos pés de Gamaliel em Jerusalém. Perseguia ferozmente a igreja primitiva até ter um encontro fulgurante com o Cristo ressuscitado na estrada de Damasco. Convertido dramaticamente, tornou-se o Apóstolo dos Gentios, realizando três grandes viagens missionárias pelo Império Romano, fundando igrejas e escrevendo 13 epístolas do Novo Testamento antes de seu martírio em Roma.',
    lessons: [
      'Nenhum pecador está fora do alcance da graça soberana de Deus.',
      'O conhecimento teológico e o sofrimento por Cristo caminham juntos no serviço do Evangelho.',
      'A salvação é inteiramente por graça, através da fé, sem as obras da lei.'
    ],
    relationships: ['Ananias (quem orou por sua visão)', 'Barnabé (mentor e companheiro)', 'Timóteo e Tito (filhos na fé)', 'Silas e Lucas (co-obreiros)'],
    pointingToChrist: 'Paulo sintetizou a teologia da cruz e da ressurreição. Para Paulo, "o viver é Cristo, e o morrer é lucro". Toda a sua pregação estava centralizada em Cristo crucificado, ressuscitado e reinante sobre todo principado e potestade.',
    practicalApplication: 'Considerar tudo como perda diante da sublimidade do conhecimento de Cristo Jesus, nosso Senhor.',
    keyVerse: 'Já estoy crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim... — Gálatas 2:20'
  },

  // --- LÍDERES E JUÍZES ---
  {
    id: 'josue',
    name: 'Josué',
    meaning: 'O Senhor é Salvação (Yeshua)',
    category: 'Líderes e Juízes',
    testament: 'Antigo Testamento',
    period: 'Conquista de Canaã (~1400 a.C.)',
    books: ['Êxodo', 'Números', 'Josué'],
    passages: 'Livro de Josué 1 a 24',
    biography: 'Auxiliar fiel de Moisés e um dos dois únicos espias (juntamente com Calebe) que trouxeram um relatório de fé sobre a Terra Prometida. Escolhido por Deus para suceder Moisés, conduziu a travessia do rio Jordão em seco, liderou a queda das muralhas de Jericó e a conquista militar das tribos de Canaã, distribuindo a herança da terra.',
    lessons: [
      'A verdadeira coragem surge da certeza de que a Palavra de Deus está conosco e não falhará.',
      'A meditação contínua na Escritura e a obediência são as chaves bíblicas do verdadeiro sucesso.',
      'Liderar com firmeza exige tomar posicionamento público pela santidade do lar.'
    ],
    relationships: ['Moisés (mentor)', 'Calebe (companheiro de fé e combate)', 'Nune (pai)'],
    pointingToChrist: 'Seu próprio nome em hebraico é Yeshua (o mesmo nome de Jesus). Enquanto Moisés (a Lei) não podia introduzir o povo no descanso da Terra Prometida, Josué (Jesus) é Quem atravessa as águas e guia o Povo de Deus para a posse da herança eterna.',
    practicalApplication: 'Liderar com coragem espiritual e consagrar nossa casa e família para servir com exclusividade ao Senhor.',
    keyVerse: 'Eu e a minha casa serviremos ao SENHOR. — Josué 24:15'
  },
  {
    id: 'gideao',
    name: 'Gideão',
    meaning: 'Cortador / Destruidor',
    category: 'Líderes e Juízes',
    testament: 'Antigo Testamento',
    period: 'Era dos Juízes (~1180 a.C.)',
    books: ['Juízes', 'Hebreus'],
    passages: 'Juízes 6 a 8',
    biography: 'Chamado por Deus enquanto malhava trigo no lagar para escondê-lo dos midianitas. Chamado pelo Anjo do Senhor de "homem valente", derrubou o altar de Baal de seu pai. Com um exército reduzido milagrosamente por Deus de 32.000 para apenas 300 homens equipados com buzinas, cântaros e tochas, derrotou a multidão de Midia sem disparar uma única espada.',
    lessons: [
      'Deus se compraz em usar os menores e mais fracos para que a glória da vitória pertença somente a Ele.',
      'Nossas dúvidas e hesitações podem ser tratadas por Deus com paciência, desde que estejamos dispostos a obedecer.',
      'A vitória espiritual é conquistada não por força bélica humana, mas pelo Espírito do Senhor.'
    ],
    relationships: ['Joás (pai)', '300 Homens Escolhidos (exército)', 'Abimeleque (filho)'],
    pointingToChrist: 'Gideão é um libertador que destrói a opressão dos inimigos do Povo de Deus não com poder bélico humano, mas pela luz que brilha nos vasos quebrados — apontando para a luz do evangelho manifesta através da fraqueza humana.',
    practicalApplication: 'Entender que o poder de Deus se aperfeiçoa nas nossas fraquezas e limitações.',
    keyVerse: 'Vai nesta tua força, e livrarás a Israel da mão dos midianitas... — Juízes 6:14'
  },
  {
    id: 'sansao',
    name: 'Sansão',
    meaning: 'Como o Sol / Ensolarado',
    category: 'Líderes e Juízes',
    testament: 'Antigo Testamento',
    period: 'Era dos Juízes (~1070 a.C.)',
    books: ['Juízes', 'Hebreus'],
    passages: 'Juízes 13 a 16, Hebreus 11:32',
    biography: 'Consagrado a Deus desde o ventre como nazireu para libertar Israel dos filisteus. Dotado de uma força sobre-humana concedida pelo Espírito do Senhor, matou um leão com as mãos nuas e derrotou mil homens com uma queixada de jumento. No entanto, cedeu repetidamente às paixões carnais e revelou o segredo do seu voto à traidora Dalila. Cegado e prisioneiro, arrependeu-se em sua humilhação final e derrubou o templo de Dagom, matando mais inimigos na sua morte do que em sua vida.',
    lessons: [
      'Dons espirituais e força física extraordinária não compensam a falta de autocontrole e disciplina moral.',
      'Flertar com a tentação e revelar a nossa consagração a pessoas ímpias leva à perda do poder espiritual e à cegueira.',
      'A misericórdia de Deus estende-se até a hora da nossa dor sincera, ouvindo o clamor do pecador contrito.'
    ],
    relationships: ['Manoá e sua esposa (pais)', 'Dalila (amada traidora)', 'Filisteus (opressores)'],
    pointingToChrist: 'Sansão aponta para Cristo de forma trágica e contrastante. Enquanto Sansão usou sua força para satisfazer impulsos próprios e destruiu inimigos ao morrer na sua própria ruína, Jesus sacrificou-Se voluntariamente sem pecado para destruir a morte e salvar a humanidade.',
    practicalApplication: 'Guardar o nosso voto de consagração a Deus e exercitar o fruto do Espírito do domínio próprio.',
    keyVerse: 'Senhor DEUS, lembra-te de mim, e fortalece-me agora só esta vez, ó Deus... — Juízes 16:28'
  },
  {
    id: 'samuel',
    name: 'Samuel',
    meaning: 'Ouvido por Deus',
    category: 'Líderes e Juízes',
    testament: 'Antigo Testamento',
    period: 'Transição para a Monarquia (~1080 a.C.)',
    books: ['1 Samuel', 'Salmos', 'Atos', 'Hebreus'],
    passages: '1 Samuel 1 a 25',
    biography: 'Nascido em resposta à oração de sua mãe Ana e dedicado ao serviço do Tabernáculo desde a infância sob o sacerdote Eli. Serviu como o último grande juiz, primeiro grande profeta da era monárquica e ungiu os dois primeiros reis de Israel: Saul e Davi.',
    lessons: [
      'A prontidão para ouvir e obedecer à voz de Deus deve caracterizar o coração dos servos fiéis.',
      'Interceder pelo povo e ensinar o caminho do Senhor é um dever contínuo dos líderes espirituais.',
      'Manter a integridade irretocável em toda uma vida pública honra o Nome do Senhor.'
    ],
    relationships: ['Ana (mãe)', 'Elcana (pai)', 'Eli (sacerdote e tutor)', 'Saul e Davi (reis ungidos por ele)'],
    pointingToChrist: 'Samuel une em seu ministério os ofícios de profeta, sacerdote e juiz, prefigurando Jesus Cristo que ocupa de forma suprema e perpétua o triplo escritório de Profeta, Sacerdote e Rei.',
    practicalApplication: 'Cultivar um coração vigilante que responda ao Senhor: "Fala, porque o teu servo ouve".',
    keyVerse: 'Eis que o obedecer é melhor do que o sacrificar... — 1 Samuel 15:22'
  },
  {
    id: 'neemias',
    name: 'Neemias',
    meaning: 'O Senhor consola',
    category: 'Líderes e Juízes',
    testament: 'Antigo Testamento',
    period: 'Pós-Exílio Babilônico (~445 a.C.)',
    books: ['Neemias'],
    passages: 'Livro de Neemias 1 a 13',
    biography: 'Gronja do rei persa Artaxerxes em Susã. Ao saber que os muros de Jerusalém estavam derrubados e suas portas queimadas, chorou, jejuou e orou intensamente. Obteve autorização real e liderou o retorno dos judeus a Jerusalém. Com visão estratégica, fé orante e perseverança inabalável contra a oposição feroz de Sambalate e Tobias, reconstruiu as muralhas em apenas 52 dias e restaurou a justiça social e religiosa.',
    lessons: [
      'A verdadeira liderança combina oração dependente com planejamento detalhado e ação corajosa.',
      'Oponência e ridicularização não devem paralisar a obra de Deus; devemos responder focando no trabalho.',
      'Zelar pela santidade do Povo de Deus exige confrontar a injustiça social e o compromisso moral.'
    ],
    relationships: ['Artaxerxes (rei persa)', 'Esdras (sacerdote contemporâneo)', 'Sambalate e Tobias (oponentes)'],
    pointingToChrist: 'Neemias deixa a segurança do palácio real por compaixão de sua cidade arruinada para reconstruí-la — prefigurando Cristo que deixou a glória celestial para restaurar a humanidade em ruínas.',
    practicalApplication: 'Orar com fervor antes de agir e não permitir que ameaças ou distrações nos impeçam de realizar a grande obra que Deus nos confiou.',
    keyVerse: 'Estou fazendo uma grande obra, de modo que não poderei descer... — Neemias 6:3'
  },
  {
    id: 'estevao',
    name: 'Estêvão',
    meaning: 'Coroa / Acoroado',
    category: 'Líderes e Juízes',
    testament: 'Novo Testamento',
    period: 'Início da Igreja em Jerusalém (~34 d.C.)',
    books: ['Atos'],
    passages: 'Atos 6 e 7',
    biography: 'Um dos sete homens de boa reputação, cheios do Espírito Santo e de sabedoria, escolhidos como diáconos na igreja de Jerusalém. Realizava prodígios entre o povo. Disputando com os membros do Sinédrio, proferiu um brilhante discurso repassando toda a história redentora de Israel. Foi o primeiro mártir cristão, apedrejado até a morte enquanto orava pelos seus perseguidores.',
    lessons: [
      'A plenitude do Espírito Santo produz coragem inabalável para proclamar a verdade diante da oposição.',
      'O perdão concedido aos inimigos no momento da morte é um supremo testemunho do caráter de Cristo.',
      'O conhecimento profundo das Escrituras capacita a defesa clara da fé cristã.'
    ],
    relationships: ['Filipe, Prócoro, Nicanor (co-diáconos)', 'Saulo de Tarso (testemunha de seu martírio)'],
    pointingToChrist: 'Antes de expirar, Estêvão olhou para o céu e viu a glória de Deus e Jesus de pé à direita de Deus. Suas últimas palavras imitaram as do Senhor na cruz: "Senhor Jesus, recebe o meu espírito" e "Senhor, não lhes imputes este pecado".',
    practicalApplication: 'Permanecer fiel a Cristo até ao fim, demonstrando amor e perdão mesmo quando perseguidos.',
    keyVerse: 'Eis que vejo os céus abertos e o Filho do Homem, que está à direita de Deus. — Atos 7:56'
  },
  {
    id: 'timoteo',
    name: 'Timóteo',
    meaning: 'Aquele que honra a Deus',
    category: 'Líderes e Juízes',
    testament: 'Novo Testamento',
    period: 'Igreja Primitiva (~50-80 d.C.)',
    books: ['Atos', '1 Timóteo', '2 Timóteo', 'Hebreus'],
    passages: '1 e 2 Timóteo, Atos 16:1-3',
    biography: 'Jovem de Listra, filho de mãe judia crente (Eunice) e pai grego. Criado no conhecimento das Sagradas Escrituras desde a infância por sua avó Lóide e mãe. Escolhido pelo Apóstolo Paulo para acompanhá-lo em suas viagens missionárias, tornando-se seu filho espiritual mais próximo e leal. Serviu como pastor na difícil igreja de Éfeso, recebendo duas epístolas de Paulo repletas de orientações pastorais.',
    lessons: [
      'A educação cristã no lar desde a infância forma alicerces inabaláveis para uma vida útil no Reino de Deus.',
      'Jovens podem liderar com autoridade espiritual quando são exemplos na palavra, no procedimento, no amor, na fé e na pureza.',
      'A fidelidade à sã doutrina exige combater falsos ensinos e guardar o bom depósito da fé.'
    ],
    relationships: ['Lóide (avó) e Eunice (mãe)', 'Apóstolo Paulo (pai na fé e mentor)', 'Igreja de Éfeso (rebanho que apascentou)'],
    pointingToChrist: 'Timóteo aponta para o modelo de servo que prega incansavelmente a Palavra de Cristo em tempo e fora de tempo, exortando e ensinando com toda a longanimidade.',
    practicalApplication: 'Ser um exemplo vivo de fé e conduta cristã independentemente da idade, mantendo-nos fiéis ao depósito bíblico.',
    keyVerse: 'Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis, na palavra, no trato, no amor, no espírito, na fé, na pureza. — 1 Timóteo 4:12'
  },
  {
    id: 'zaqueu',
    name: 'Zaqueu',
    meaning: 'Puro / Justo',
    category: 'Líderes e Juízes',
    testament: 'Novo Testamento',
    period: 'Ministério de Jesus em Jericó (~33 d.C.)',
    books: ['Lucas'],
    passages: 'Lucas 19:1-10',
    biography: 'Chefe dos publicanos em Jericó, homem muito rico e odiado pelos judeus por recolher impostos para Roma. Sendo de pequena estatura e desejando ver quem era Jesus, correu adiante e subiu numa árvore figueira brava. Jesus parou, olhou para cima e disse: "Zaqueu, desce depressa, pois hoje me convém pousar em tua casa". Tocado pela graça libertadora, arrependeu-se publicamente, doando metade dos seus bens aos pobres e restituindo quadruplicado a quem havia fraudado.',
    lessons: [
      'Jesus veio buscar e salvar exatamente o perdido, independentemente do seu estigma ou passado.',
      'O encontro verdadeiro com a graça de Cristo produz transformação financeira e restituição ética imediata.',
      'A salvação traz alegria genuína e generosidade aos corações outrora dominados pela ganância.'
    ],
    relationships: ['Jesus Cristo (Salvador que se hospedou em sua casa)', 'Povo de Jericó (testemunhas de sua transformação)'],
    pointingToChrist: 'Zaqueu é o monumento vivo do propósito redentor de Cristo. Jesus declara na casa de Zaqueu o resumo de Sua missão terrena: "Porque o Filho do Homem veio buscar e salvar o que se havia perdido".',
    practicalApplication: 'Buscar a Cristo com determinação e demonstrar o arrependimento sincero através da justiça e da generosidade prática.',
    keyVerse: 'Porque o Filho do Homem veio buscar e salvar o que se havia perdido. — Lucas 19:10'
  },
  {
    id: 'enoque',
    name: 'Enoque',
    meaning: 'Dedicado / Consagrado',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Antediluviana',
    books: ['Gênesis', 'Hebreus', 'Judas'],
    passages: 'Gênesis 5:21-24, Hebreus 11:5, Judas 1:14-15',
    biography: 'Sétimo patriarca a partir de Adão e pai de Matusalém. Caracterizado na Bíblia por ter "andado com Deus" durante 300 anos em meio a uma geração ímpia. Por causa de sua fé e intimidade extraordinária com o Criador, Enoque não experimentou a morte física: Deus o tomou diretamente para Si. Foi também um profeta que advertiu seus contemporâneos sobre o juízo vindouro.',
    lessons: [
      'Andar com Deus exige comunhão diária, concordância com a Sua vontade e separação do pecado.',
      'A fé genuína agrada a Deus e traz a certeza da presença eterna com Ele.',
      'O testemunho de uma vida irrepreensível se destaca mesmo nas épocas espiritualmente mais escuras.'
    ],
    relationships: ['Jarede (pai)', 'Matusalém (filho)', 'Adão (ancestral)'],
    pointingToChrist: 'A trasladação de Enoque sem passar pela morte prefigura o arrebatamento dos salvos em Cristo e a vitória sobre a morte que Jesus conquistou para todos os que nele creem.',
    practicalApplication: 'Buscar intimidade diária com Deus no meio de nossas rotinas diárias, andando em obediência e fé.',
    keyVerse: 'E andou Enoque com Deus; e não apareceu mais, porquanto Deus o tomou. — Gênesis 5:24',
    curiosities: [
      'Enoque é um dos dois únicos homens na Bíblia que foram levados ao céu sem morrer (o outro foi o profeta Elias).',
      'Seu filho Matusalém tornou-se o homem mais longevo registrado na Bíblia (969 anos).'
    ]
  },
  {
    id: 'melquisedeque',
    name: 'Melquisedeque',
    meaning: 'Rei de Justiça',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~2000 a.C.)',
    books: ['Gênesis', 'Salmos', 'Hebreus'],
    passages: 'Gênesis 14:18-20, Salmo 110:4, Hebreus 5 a 7',
    biography: 'Misterioso rei de Salém (antiga Jerusalém) e "sacerdote do Deus Altíssimo". Veio ao encontro de Abraão após a vitória sobre os quatro reis, trazendo pão e vinho, e abençoou o patriarca. Em resposta, Abraão deu-lhe o dízimo de todos os despojos. Sem registro de genealogia bíblica de nascimento ou morte, representa a ordem sacerdotal eterna superior ao sacerdócio levítico.',
    lessons: [
      'O verdadeiro sacerdócio combina a busca pela justiça com a promoção da paz.',
      'Reconhecer a soberania de Deus nos conduz a atos espontâneos de gratidão, louvor e generosidade.',
      'Deus sempre preservou testemunhas fiéis do Seu Nome mesmo fora das estruturas comunitárias tradicionais.'
    ],
    relationships: ['Abraão (a quem abençoou e de quem recebeu o dízimo)'],
    pointingToChrist: 'Melquisedeque é uma das maiores tipologias cristológicas do Antigo Testamento. O livro de Hebreus revela que Jesus é nosso Grande Sumo Sacerdote "segundo a ordem de Melquisedeque" — não por linhagem humana temporária, mas pelo poder de uma vida indissolúvel, unindo os ofícios de Rei e Sacerdote.',
    practicalApplication: 'Submeter nossa vida e dízimos a Jesus Cristo, o nosso Rei de Justiça e Rei de Paz eterno.',
    keyVerse: 'Tu és sacerdote para sempre, segundo a ordem de Melquisedeque. — Salmo 110:4',
    curiosities: [
      'Salém significa "Paz", de modo que Melquisedeque é simultaneamente Rei de Justiça e Rei de Paz.',
      'O pão e o vinho oferecidos por ele prefiguram a Ceia do Senhor instituída por Jesus.'
    ]
  },
  {
    id: 'calebe',
    name: 'Calebe',
    meaning: 'Cão fiel / Fiel de coração',
    category: 'Patriarcas',
    testament: 'Antigo Testamento',
    period: 'Deserto e Conquista de Canaã (~1400 a.C.)',
    books: ['Números', 'Josué', 'Juízes'],
    passages: 'Números 13 e 14, Josué 14 e 15',
    biography: 'Líder da tribo de Judá e um dos doze espias enviados por Moisés para reconhecer a terra de Canaã. Enquanto dez espias espalharam pânico por causa dos gigantes anaquins, Calebe e Josué mantiveram a fé inabalável, declarando: "Eia! subamos e possuamo-la". Como recompensa por perseverar em seguir ao Senhor integralmente, foi o único daquela geração adulta a entrar na Terra Prometida. Aos 85 anos, cheio de vigor espiritual, reivindicou e conquistou a montanha fortificada de Hebrom.',
    lessons: [
      'A fé enxerga as promessas de Deus e a Sua grandeza acima de qualquer obstáculo ou gigante.',
      'Perseverar em seguir o Senhor de todo o coração traz vigor e galardão duradouro.',
      'A idade cronológica não limita o que Deus pode fazer através de quem mantém o espírito forte.'
    ],
    relationships: ['Jefoné (pai)', 'Josué (companheiro de fé)', 'Apsa (filha)'],
    pointingToChrist: 'Calebe ilustra o crente que conquista a herança em Cristo pela fé perseverante, ensinando que a vitória final pertence àqueles que confiam integralmente na Palavra do Senhor.',
    practicalApplication: 'Não nos assustarmos com os gigantes dos problemas, mas avançar com coragem reivindicando as promessas divinas.',
    keyVerse: 'Porquanto perseverou em seguir ao SENHOR Deus de Israel... — Josué 14:14',
    curiosities: [
      'Calebe tinha 85 anos quando disse a Josué: "Estou ainda hoje tão forte como no dia em que Moisés me enviou... dá-me este monte".'
    ]
  },
  {
    id: 'miriam',
    name: 'Miriã',
    meaning: 'Rebelde / Amada / Gota de Mar',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Êxodo e Deserto (~1450 a.C.)',
    books: ['Êxodo', 'Números', 'Malaquias'],
    passages: 'Êxodo 2:1-10, Êxodo 15:20-21, Números 12',
    biography: 'Irmã mais velha de Moisés e Arão. Quando bebê, Moisés foi colocado no cesto no rio Nilo, Miriã vigiou de longe e sugeriu astutamente à filha do Faraó chamar a própria mãe hebreia para amamentá-lo. Após a travessia do Mar Vermelho, liderou as mulheres israelitas com tamborins em um épico cântico de vitória e louvor a Deus. Mais tarde, cedeu ao ciúme contra a liderança de Moisés, sofrendo temporariamente de lepra até ser curada pela intercessão do irmão.',
    lessons: [
      'A coragem e a perspicácia desde a juventude podem ser usadas por Deus para salvar vidas.',
      'O louvor exuberante e a adoração pública expressam a alegria do livramento divino.',
      'O ciúme e a murmuração contra a autoridade estabelecida por Deus trazem disciplina e quebrantamento.'
    ],
    relationships: ['Anrão e Joquebede (pais)', 'Moisés e Arão (irmãos)'],
    pointingToChrist: 'O cântico de vitória de Miriã à beira do Mar Vermelho antecipa o Cântico de Moisés e do Cordeiro em Apocalipse 15, onde os remidos celebram o triunfo definitivo sobre o pecado e a morte.',
    practicalApplication: 'Usar nossos dons musicais e de liderança para exaltar a Deus, mantendo a humildade em relação aos irmãos.',
    keyVerse: 'Entoai ao SENHOR, porque gloriosamente triunfou... — Êxodo 15:21',
    curiosities: [
      'É a primeira mulher a ser explicitamente chamada de "profetisa" nas Escrituras Sagradas.'
    ]
  },
  {
    id: 'rebeca',
    name: 'Rebeca',
    meaning: 'Laço / Aquela que une',
    category: 'Mulheres da Bíblia',
    testament: 'Antigo Testamento',
    period: 'Era Patriarcal (~1900 a.C.)',
    books: ['Gênesis', 'Romanos'],
    passages: 'Gênesis 24 a 27, Romanos 9:10-12',
    biography: 'Filha de Betuel e neta de Naor. Foi encontrada pelo servo de Abraão em Harã enquanto tirava água no poço, demonstrando extrema generosidade ao dar de beber ao servo e a todos os seus camelos. Com fé notável, aceitou prontamente viajar para uma terra distante para se casar com Isaque. Deu à luz os gêmeos Esaú e Jacó após 20 anos de oração de Isaque, recebendo a revelação divina sobre o futuro dos dois povos.',
    lessons: [
      'A generosidade e a disposição para servir com alegria abrem portas para as grandes bênçãos de Deus.',
      'A fé nos desafia a sair da zona de conforto para abraçar o propósito da Aliança Divina.',
      'Favoritismos familiares e maquinações humanas trazem divisões e dores desnecessárias no lar.'
    ],
    relationships: ['Betuel (pai)', 'Labão (irmão)', 'Isaque (marido)', 'Esaú e Jacó (filhos gêmeos)'],
    pointingToChrist: 'A prontidão de Rebeca em aceitar a proposta de casamento do servo para unir-se a Isaque prefigura a Noiva de Cristo (a Igreja) que atende ao chamado do Espírito Santo para unir-se ao Filho amado.',
    practicalApplication: 'Cultivar um espírito hospitaleiro e generoso no cotidiano e confiar na soberania de Deus para o futuro da nossa família.',
    keyVerse: 'E responderam: Chamaremos a moça, e perguntaremos à sua boca. E chamaram a Rebeca, e disseram-lhe: Irás tu com este homem? Ela respondeu: Irei. — Gênesis 24:57-58'
  },
  {
    id: 'maria-de-betania',
    name: 'Maria de Betânia',
    meaning: 'Amada / Senhora',
    category: 'Mulheres da Bíblia',
    testament: 'Novo Testamento',
    period: 'Ministério de Jesus (~30-33 d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João'],
    passages: 'Lucas 10:38-42, João 11:1-44, João 12:1-8',
    biography: 'Moradora da aldeia de Betânia, irmã de Marta e Lázaro. Em todas as três vezes em que aparece nos Evangelhos, Maria é vista assentada aos pés de Jesus: ouvindo os Seus ensinamentos em sua casa, chorando a morte de seu irmão Lázaro antes de sua ressurreição, e ungindo os pés de Jesus com nardo puro de grande valor, enxugando-os com seus cabelos poucos dias antes da crucificação.',
    lessons: [
      'Escolher a "boa parte" significa priorizar a comunhão pessoal com Jesus acima do ativismo e das preocupações do mundo.',
      'A verdadeira adoração não calcula custos e entrega o que temos de mais precioso ao Senhor.',
      'Jesus valoriza a devoção amorosa e garante que os atos de amor sincero permanecerão na memória eterna.'
    ],
    relationships: ['Marta (irmã)', 'Lázaro (irmão)', 'Jesus Cristo (Mestre e Amigo querido)'],
    pointingToChrist: 'O ato de Maria de ungir Jesus antecipou profeticamente a sepultura do Senhor. Jesus declarou que onde quer que o Evangelho fosse pregado no mundo inteiro, o ato de Maria seria lembrado.',
    practicalApplication: 'Reservar tempo diário para sentar aos pés de Jesus em oração e leitura da Palavra antes de servir.',
    keyVerse: 'Maria, pois, tomou uma libra de bálsamo de nardo puro, de grande preço, e ungiu os pés de Jesus... — João 12:3'
  },
  {
    id: 'josafa',
    name: 'Josafá',
    meaning: 'O Senhor Julga / O Senhor é Juiz',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Reino de Judá (~870 a.C.)',
    books: ['1 Reis', '2 Crônicas'],
    passages: '1 Reis 22, 2 Crônicas 17 a 20',
    biography: 'Rei piedoso de Judá, filho de Asa. Promoveu um amplo ensino da Lei de Deus nas cidades do reino enviando levitas e príncipes com o Livro da Lei. Estabeleceu juízes imparciais por toda a terra. Diante da invasão iminente da vasta aliança de moabitas e amonitas, proclamou um jejum nacional e orou publicamente. Deus lhe concedeu vitória milagrosa ao ordenar que os cantores de louvor fossem à frente do exército.',
    lessons: [
      'Em momentos de desespero e grande perigo, a primeira reação deve ser buscar ao Senhor em oração e jejum.',
      'O louvor e a adoração são armas espirituais poderosíssimas na guerra da fé.',
      'Alianças políticas e familiares com líderes ímpios (como o rei Acabe) trazem complicações espirituais perigosas.'
    ],
    relationships: ['Asa (pai)', 'Acabe (rei de Israel com quem fez aliança)', 'Jaziel (profeta que trouxe a mensagem de vitória)'],
    pointingToChrist: 'A vitória de Josafá demonstra que a batalha pertence ao Senhor. Prefigura Jesus Cristo que vence os poderes das trevas por nós, convidando-nos a entrar no Seu triunfo com cânticos de louvor.',
    practicalApplication: 'Enfrentar nossas batalhas diárias reconhecendo nossa impotência ("não sabemos nós o que faremos"), mas mantendo os nossos olhos postos em Deus.',
    keyVerse: 'Ah! nosso Deus... porque em nós não há força perante esta grande multidão... porém os nossos olhos estão postos em ti. — 2 Crônicas 20:12'
  },
  {
    id: 'ciro',
    name: 'Ciro, o Grande',
    meaning: 'Sol / Como o Sol',
    category: 'Reis',
    testament: 'Antigo Testamento',
    period: 'Império Persa (~539 a.C.)',
    books: ['2 Crônicas', 'Esdras', 'Isaías', 'Daniel'],
    passages: 'Isaías 44:28, Isaías 45:1-4, Esdras 1:1-4',
    biography: 'Fundador do Império Aquemênida Persa que conquistou a Babilônia. Notavelmente, cerca de 150 anos antes do seu nascimento, o profeta Isaías chamou-o pelo nome, profetizando que ele libertaria os cativos judeus e ordenaria a reconstrução do Templo em Jerusalém. Em 538 a.C., Ciro cumpriu a profecia emitindo o famoso decreto que encerrou os 70 anos de cativeiro babilônico.',
    lessons: [
      'Deus governa a história e manipula até o coração dos imperadores seculares para cumprir os Seus propósitos.',
      'As profecias bíblicas são minuciosamente precisas e provam a onisciência e soberania de Deus.',
      'Deus pode usar qualquer pessoa, crente ou não, para abençoar o Seu Povo e promover a Sua vontade.'
    ],
    relationships: ['Isaías (profeta que o mencionou previamente por nome)', 'Daniel (estadista em sua corte)', 'Zorobabel (líder judeu autorizado por ele)'],
    pointingToChrist: 'Ciro é chamado por Deus em Isaías 45:1 de "Meu Ungido" (Mashiach em hebraico) por ser um libertador temporal dos cativos — apontando para Jesus Cristo, o Ungido Supremo que liberta os homens do cativeiro do pecado.',
    practicalApplication: 'Descansar sabendo que os governantes e a história do mundo estão sob o absoluto controle soberano do Deus Altíssimo.',
    keyVerse: 'O SENHOR despertou o espírito de Ciro, rei da Pérsia, o qual fez passar pregão por todo o seu reino... — Esdras 1:1'
  },
  {
    id: 'ezequiel',
    name: 'Ezequiel',
    meaning: 'Deus Fortalece',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Cativeiro Babilônico (~593-570 a.C.)',
    books: ['Ezequiel'],
    passages: 'Livro de Ezequiel 1 a 48',
    biography: 'Sacerdote filho de Buzi, levado cativo para a Babilônia junto ao rio Chebar. Chamado como profeta aos 30 anos através de uma visão majestosa da glória de Deus e do Trono em rodas. Serviu como "atalaia" para a casa de Israel, usando ações dramáticas e parábolas simbólicas para denunciar a idolatria de Jerusalém e anunciar a restauração do povo, a visão do Vale de Ossos Secos e o Novo Templo.',
    lessons: [
      'O atalaia de Deus tem o dever sagrado de avisar os homens sobre o perigo do pecado, independentemente da resposta deles.',
      'O Espírito Santo tem o poder de soprar vida e restauração mesmo sobre situações espiritualmente mortas e secas.',
      'A glória e a presença de Deus não estão confinadas a um prédio ou local geográfico.'
    ],
    relationships: ['Buzi (pai)', 'Povo exilado na Babilônia (ouvintes do seu ministério)'],
    pointingToChrist: 'Ezequiel profetizou o Bom Pastor que buscará as ovelhas perdidas (Ezequiel 34), o novo coração de carne dado pelo Espírito (Ezequiel 36) e o rio de água viva que mana do Templo (João 7:37-39).',
    practicalApplication: 'Exercer o nosso papel de fiéis atalaias, proclamando a verdade e crendo que o Espírito de Deus pode ressuscitar corações espiritualmente mortos.',
    keyVerse: 'E dar-vos-ei um coração novo, e porei dentro de vós um espírito novo... — Ezequiel 36:26'
  },
  {
    id: 'esdras',
    name: 'Esdras',
    meaning: 'Auxílio / Ajuda',
    category: 'Profetas',
    testament: 'Antigo Testamento',
    period: 'Pós-Exílio Babilônico (~458 a.C.)',
    books: ['Esdras', 'Neemias'],
    passages: 'Esdras 7 a 10, Neemias 8',
    biography: 'Sacerdote e mestre escriba descendente de Arão, versado na Lei de Moisés. Liderou a segunda comitiva de exilados judeus no retorno da Babilônia para Jerusalém sob autorização de Artaxerxes. Caracterizou-se por ter preparado o seu coração para buscar a Lei do Senhor, cumpri-la e ensinar em Israel os seus estatutos. Liderou uma profunda reformatação espiritual e leitura pública da Palavra.',
    lessons: [
      'A verdadeira ordem espiritual exige um compromisso prévio em estudar, praticar e só então ensinar as Escrituras.',
      'O avivamento duradouro é sempre fundamentado no retorno zeloso à Palavra de Deus.',
      'A tristeza pelo pecado deve conduzir à confissão sincera e à reforma das atitudes.'
    ],
    relationships: ['Artaxerxes (rei persa que o enviou)', 'Neemias (governador e co-obreiro na reconstrução)'],
    pointingToChrist: 'Esdras restaura o ensino da Lei e conduz o povo ao arrependimento, prefigurando Cristo que ensina com autoridade suprema e escreve a Sua palavra nas tábuas de carne dos nossos corações.',
    practicalApplication: 'Dispor o coração para estudar profundamente a Bíblia, viver o que aprendemos e ensinar a outros com integridade.',
    keyVerse: 'Porque Esdras tinha preparado o seu coração para buscar a lei do SENHOR e para a cumprir e para ensinar em Israel os seus estatutos e os seus juízos. — Esdras 7:10'
  },
  {
    id: 'andre',
    name: 'André',
    meaning: 'Masculino / Varonil',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Ministério de Jesus e Igreja Primitiva (~30-60 d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos'],
    passages: 'João 1:35-42, João 6:8-9, João 12:20-22',
    biography: 'Pescador de Betsaida, irmão de Simão Pedro e originalmente discípulo de João Batista. Ao ouvir João declarar que Jesus era o Cordeiro de Deus, seguiu a Cristo e foi imediatamente chamar seu irmão Pedro, dizendo: "Achamos o Messias". Nos Evangelhos, aparece constantemente trazendo pessoas individuais a Jesus: seu irmão, o menino com os cinco pães e dois peixes, e os gregos que queriam ver o Mestre.',
    lessons: [
      'O primeiro impulso de quem encontra a Cristo deve ser compartilhar a boa notícia com a própria família.',
      'Deus usa pequenos começos e ofertas simples (como o lanche de um menino) para realizar grandes milagres.',
      'O evangelismo pessoal discreto e constante tem um impacto eterno inestimável.'
    ],
    relationships: ['Simão Pedro (irmão)', 'João Batista (primeiro mestre)', 'Jesus Cristo (Senhor)'],
    pointingToChrist: 'André aponta para Jesus como o Messias esperado que acolhe a todos — judeus, crianças e gentios — e satisfaz a fome espiritual da humanidade.',
    practicalApplication: 'Trazer pessoas a Jesus no nosso dia a dia, confiando que Ele transforma vidas inteiras a partir de um convite simples.',
    keyVerse: 'Este achou primeiro a seu irmão Simão, e disse-lhe: Achamos o Messias... E levou-o a Jesus. — João 1:41-42'
  },
  {
    id: 'tome',
    name: 'Tomé (Dídimo)',
    meaning: 'Gêmeo',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Ministério de Jesus e Expansão Apostólica (~30-70 d.C.)',
    books: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos'],
    passages: 'João 11:16, João 14:5-6, João 20:24-29',
    biography: 'Um dos doze apóstolos, leal e corajoso (quando disse "Vamos também nós, para morrermos com ele" ao ir a Betânia). Ficou famoso por sua dúvida quando os outros discípulos afirmaram ter visto o Senhor ressuscitado, declarando que só creria se visse e tocasse as feridas dos cravos. Oito dias depois, Jesus apareceu-lhe e Tomé fez uma das mais elevadas declarações da divindade de Cristo na Bíblia: "Senhor meu, e Deus meu!". Segundo a tradição, evangelizou a Índia.',
    lessons: [
      'Jesus lida com graça e paciência com as nossas dúvidas sinceras, conduzindo-nos a uma fé sólida.',
      'A verdadeira fé não depende da visão física constante, mas de crer no testemunho da Palavra de Deus.',
      'A dúvida superada pelo encontro com a verdade se transforma na mais convicta adoração.'
    ],
    relationships: ['Jesus Cristo (Mestre e Deus)', 'Demais dez apóstolos (co-companheiros)'],
    pointingToChrist: 'A confissão de Tomé proclama explicitamente que Jesus Cristo é Senhor e Deus. As feridas que Tomé viu são as marcas eternas da nossa redenção.',
    practicalApplication: 'Apresentar nossas dúvidas com honestidade a Deus e professar com convicção absoluta que Jesus é nosso Senhor e Deus.',
    keyVerse: 'Disse-lhe Jesus: Porque me viste, Tomé, creste; bem-aventurados os que não viram e creram. — João 20:29'
  },
  {
    id: 'barnabe',
    name: 'Barnabé (José de Chipre)',
    meaning: 'Filho da Consolação / Encorajamento',
    category: 'Apóstolos',
    testament: 'Novo Testamento',
    period: 'Igreja Primitiva (~33-60 d.C.)',
    books: ['Atos', '1 Coríntios', 'Gálatas'],
    passages: 'Atos 4:36-37, Atos 9:26-27, Atos 11:22-26, Atos 13 a 15',
    biography: 'Levita natural de Chipre cujo nome original era José, apelidado pelos apóstolos de Barnabé ("Filho da Consolação") por sua generosidade e caráter encorajador. Vendeu um campo e entregou todo o dinheiro aos pés dos apóstolos. Quando os cristãos de Jerusalém temiam o recém-convertido Saulo (Paulo), foi Barnabé quem o acolheu e o introduziu aos líderes. Liderou a igreja de Antioquia e a primeira viagem missionária ao lado de Paulo, e deu uma segunda chance a João Marcos.',
    lessons: [
      'Encaminhar, integrar e encorajar novos convertidos e pessoas rejeitadas é um ministério vital na Igreja.',
      'O desprendimento material e a generosidade voluntária fortalecem a comunidade de fé.',
      'Crer no potencial de restauração de quem cometeu falhas no passado (como João Marcos).'
    ],
    relationships: ['Apóstolo Paulo (parceiro missionário)', 'João Marcos (sobrinho a quem mentorou)'],
    pointingToChrist: 'Barnabé reflete o Espírito Santo (o Consolador) encorajando a Igreja e demonstrando a graça de Cristo através da acolhida graciosa aos pecadores e à edificação dos fracos.',
    practicalApplication: 'Ser um agente ativo de encorajamento, consolo e reconciliação na comunidade em que vivemos.',
    keyVerse: 'Porque era homem de bem e cheio do Espírito Santo e de fé. E muita gente se juntou ao Senhor. — Atos 11:24'
  },
  {
    id: 'silas',
    name: 'Silas (Silvano)',
    meaning: 'Da Floresta / Solicitado',
    category: 'Líderes e Juízes',
    testament: 'Novo Testamento',
    period: 'Expansão Missionária Apostólica (~48-65 d.C.)',
    books: ['Atos', '2 Coríntios', '1 e 2 Tessalonicenses', '1 Pedro'],
    passages: 'Atos 15:22 a 17:15, 1 Pedro 5:12',
    biography: 'Líder respeitado e profeta na igreja de Jerusalém, escolhido com Judas Barsabás para levar as decisões do Concílio de Jerusalém aos gentios em Antioquia. Acompanhou o Apóstolo Paulo em sua segunda viagem missionária. Em Filipos, foi açoitado e encarcerado com Paulo; mesmo com os pés no tronco, por volta da meia-noite, oravam e cantavam hinos a Deus, desencadeando um terremoto libertador que resultou na conversão do carcereiro e de sua família.',
    lessons: [
      'A adoração e o louvor no meio do sofrimento desarmam as cadeias e abrem portas para a salvação de outros.',
      'Ser um companheiro leal nos momentos de perseguição é uma demonstração suprema de amor fraterno.',
      'A fidelidade às decisões doutrinárias da Igreja promove a paz e a edificação das congregações.'
    ],
    relationships: ['Apóstolo Paulo (parceiro de viagem e prisão)', 'Timóteo (co-obreiro)', 'Apóstolo Pedro (a quem serviu como amanuense)'],
    pointingToChrist: 'Silas e Paulo cantando louvores na prisão escura de Filipos prefiguram o triunfo de Cristo que transforma prisões de dor em palcos de salvação e libertação.',
    practicalApplication: 'Manter cânticos de louvor no coração mesmo quando atravessarmos noites escuras de tribulação.',
    keyVerse: 'Perto da meia-noite, Paulo e Silas oravam e cantavam hinos a Deus, e os outros presos os escutavam. — Atos 16:25'
  }
];
