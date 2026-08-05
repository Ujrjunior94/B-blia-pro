export interface MessianicProphecy {
  id: string;
  oldTestamentRef: string;
  oldTestamentText: string;
  prophecyTheme: string;
  newTestamentRef: string;
  newTestamentText: string;
  theologicalContext: string;
  sovereigntyFocus: string;
}

export interface ApocalypticProphecy {
  id: string;
  title: string;
  passageRef: string;
  textSnippet: string;
  propheticTheme: string;
  differentInterpretations: {
    preterist: string;
    historicist: string;
    futurist: string;
    idealist: string;
  };
  theologicalSynthesis: string;
  sovereigntyFocus: string;
}

export interface HistoricalProphecy {
  id: string;
  title: string;
  passageRef: string;
  prophecyText: string;
  fulfillmentHistory: string;
  historicalEvidence: string;
  theologicalSignificance: string;
  sovereigntyFocus: string;
}

export interface PropheticSymbol {
  symbol: string;
  meaning: string;
  references: string;
  category: string;
  context: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIdx: number;
  explanation: string;
}

export const PROPHECIES_OVERVIEW = {
  introduction: {
    title: "A Soberania de Deus na Profecia Bíblica",
    content: "A profecia bíblica não é um mero exercício de adivinhação futurista ou especulação intelectual; ela é a revelação solene do plano redentor de Deus e a demonstração empírica de Sua soberania absoluta sobre o tempo, os reinos e a história. No conceito bíblico, Deus não é um observador passivo do fluxo histórico, mas Aquele que 'declara o fim desde o princípio' (Isaías 46:10). Toda profecia cumpre um propósito pedagógico, ético e teológico: revelar o caráter fiel de Deus, preservar o Seu povo na provação e glorificar o Messias.",
    keyPrinciples: [
      "Soberania Absoluta (Providência): Deus governa sobre reis, impérios e as decisões humanas para cumprir Seus decretos eternos.",
      "Unidade Cristocêntrica: O testemunho de Jesus Cristo é a chave hermenêutica e o espírito da profecia (Apocalipse 19:10).",
      "Chamado à Santidade: O conhecimento das profecias deve gerar vigilância espiritual, santidade e zelo missionário, nunca pânico ou obsessão especulativa."
    ]
  },
  approaches: {
    title: "Escolas de Interpretação Escatológica",
    description: "A história da teologia cristã preserva quatro abordagens principais para interpretar as profecias apocalípticas (especialmente Daniel e Apocalipse). Uma apresentação equilibrada destas escolas promove o respeito mútuo, a maturidade teológica e foca no ponto em comum: o triunfo soberano de Deus.",
    schools: [
      {
        name: "Preterismo",
        explanation: "Interpreta as profecias apocalípticas como eventos já cumpridos no primeiro século. Associa as visões de Daniel e do Apocalipse ao cerco e destruição de Jerusalém (70 d.C.) e às perseguições sob imperadores romanos como Nero e Domiciano.",
        sovereigntyFocus: "Demonstra que o julgamento de Deus sobre os perseguidores e a instauração da Nova Aliança foram decretos soberanos imediatos na história."
      },
      {
        name: "Historicismo",
        explanation: "Enxerga o Apocalipse e as visões de Daniel como um mapa profético contínuo de toda a história da Igreja, desde o Pentecostes até a Segunda Vinda. Identifica símbolos com figuras e eras históricas (como o papado medieval, a Reforma Protestante e o Islã).",
        sovereigntyFocus: "Salienta que Deus conduz cada detalhe das eras eclesiásticas e geopolíticas através dos séculos, protegendo Sua igreja remanescente."
      },
      {
        name: "Futurismo",
        explanation: "Argumenta que a maior parte do livro do Apocalipse (capítulos 6 a 22) e a última semana de Daniel 9 descrevem eventos dramáticos que ocorrerão no fim dos tempos, culminando na Grande Tribulação, Segunda Vinda física de Cristo e o Reino Milenar.",
        sovereigntyFocus: "Enfatiza que a história humana caminha inexoravelmente para uma intervenção divina física e cataclísmica, onde a justiça e a soberania de Deus triunfarão sobre o mal absoluto."
      },
      {
        name: "Idealismo (ou Amilenismo)",
        explanation: "Interpreta os símbolos apocalípticos não como eventos cronológicos específicos (passados ou futuros), mas como representações espirituais e atemporais da luta permanente entre o Reino de Deus e as forças do mal, aplicáveis a toda a era da igreja.",
        sovereigntyFocus: "Sublinha que a vitória espiritual e a realeza de Cristo já estão ativas na Igreja e se manifestarão plenamente no Juízo Final e novos céus."
      }
    ],
    theologicalClosing: "Embora haja divergências de método, a igreja ortodoxa fiel converge na certeza inabalável do triunfo final e físico de Jesus Cristo, da ressurreição corpórea dos mortos, da instauração do julgamento final e da eternidade nos Novos Céus e Nova Terra sob o senhorio do Cordeiro."
  },
  hope: {
    title: "A Âncora da Esperança e Soberania",
    content: "O objetivo final da revelação profética é nutrir a perseverança dos santos (Apocalipse 14:12). Ao sabermos que o fim já está decretado e que a história está segura nas mãos Daquele que se assenta no trono, somos livres do desespero deste mundo e fortalecidos para viver com coragem e fidelidade no presente.",
    closingThought: "A soberania de Deus é a garantia de que nenhuma promessa falhará. O Cordeiro que foi morto é digno de abrir os selos da história e de reinar para todo o sempre."
  }
};

export const MESSIANIC_PROPHECIES: MessianicProphecy[] = [
  {
    id: "M1",
    oldTestamentRef: "Gênesis 3:15",
    oldTestamentText: "Porei inimizade entre você e a mulher, entre a sua descendência e o descendente dela; este lhe ferirá a cabeça, e você lhe ferirá o calcanhar.",
    prophecyTheme: "O Protoevangelho: O Descendente da Mulher que Esmagará a Serpente",
    newTestamentRef: "Gálatas 4:4; Hebreus 2:14; 1 João 3:8; Romanos 16:20",
    newTestamentText: "Mas, vindo a plenitude dos tempos, Deus enviou seu Filho, nascido de mulher... para destruir aquele que tem o poder da morte, a saber, o diabo.",
    theologicalContext: "Pronunciada imediatamente após a Queda no Éden, esta é a primeira promessa de redenção (Protoevangelho). Estabelece que o Redentor nasceria de semente humana ('descendente da mulher' - uma alusão sutil ao nascimento virginal) e, através do Seu sofrimento ('ferir o calcanhar'), esmagaria a autoridade de Satanás ('ferir a cabeça') de forma definitiva.",
    sovereigntyFocus: "Revela que Deus já possuía o plano redentor traçado antes mesmo da fundação do mundo. A rebelião humana não pegou o Criador de surpresa; Ele age soberanamente no Éden para garantir que a linhagem humana seria o veículo da vitória eterna."
  },
  {
    id: "M2",
    oldTestamentRef: "Isaías 53:5",
    oldTestamentText: "Mas ele foi transpassado por causa das nossas transgressões, esmagado por causa das nossas iniquidades; o castigo que nos trouxe a paz estava sobre ele, e pelas suas feridas fomos curados.",
    prophecyTheme: "O Servo Sofredor: Expiação Substitutiva e Penal na Cruz",
    newTestamentRef: "1 Pedro 2:24; Mateus 27:38; Romanos 5:6-8; Atos 8:32-35",
    newTestamentText: "Ele mesmo levou em seu corpo os nossos pecados sobre o madeiro, a fim de que morrêssemos para os pecados e vivêssemos para a justiça; por suas feridas vocês foram curados.",
    theologicalContext: "Escrita cerca de 700 anos antes de Cristo, Isaías 53 descreve com impressionante precisão a crucificação, o sepultamento em túmulo rico e o significado teológico da morte de Jesus. Apresenta o Messias como o Servo Sofredor que assume voluntariamente a culpa e a condenação jurídica dos pecadores, satisfazendo a justiça santa de Deus e efetuando reconciliação.",
    sovereigntyFocus: "Mostra que a morte de Cristo não foi um acidente histórico ou tragédia política descontrolada, mas sim o cumprimento exato do 'determinado conselho e presciência de Deus' (Atos 2:23). O próprio Pai decretou esmagar o Filho para justificar muitos."
  },
  {
    id: "M3",
    oldTestamentRef: "Miqueias 5:2",
    oldTestamentText: "Mas você, Belém-Efrata, embora pequena entre os clãs de Judá, de você sairá para mim aquele que governará sobre Israel, cujas origens são desde os tempos antigos, desde os dias da eternidade.",
    prophecyTheme: "A Origem Eterna e o Berço Geográfico do Messias",
    newTestamentRef: "Mateus 2:1-6; Lucas 2:4-7",
    newTestamentText: "Tendo Jesus nascido em Belém da Judeia, no tempo do rei Herodes... perguntou-lhes onde o Cristo deveria nascer. Eles responderam: 'Em Belém da Judeia, pois assim escreveu o profeta...'",
    theologicalContext: "Miqueias profetiza a localidade específica do nascimento do Messias: Belém-Efrata. O profeta contrasta a pequenez da cidade com a grandeza do Governante eterno que dela viria, cujas origens transcendem o próprio tempo, apontando para a preexistência divina de Cristo.",
    sovereigntyFocus: "Deus orquestrou a geopolítica do Império Romano (através do recenseamento de César Augusto em Lucas 2) para mover José e Maria de Nazaré a Belém precisamente no momento do parto. Isso demonstra como a soberania providencial submete imperadores pagãos aos Seus desígnios."
  },
  {
    id: "M4",
    oldTestamentRef: "Isaías 7:14",
    oldTestamentText: "Portanto, o Senhor mesmo lhes dará um sinal: a virgem ficará grávida e dará à luz um filho, e o chamará Emanuel.",
    prophecyTheme: "O Nascimento Virginal e a Encarnação (Emanuel)",
    newTestamentRef: "Mateus 1:21-23; Lucas 1:31-35",
    newTestamentText: "Tudo isso aconteceu para que se cumprisse o que o Senhor dissera pelo profeta: 'A virgem ficará grávida e dará à luz um filho, e o chamarão Emanuel' (que significa: 'Deus conosco').",
    theologicalContext: "Profetizada num momento de crise nacional para o rei Acaz, a profecia aponta para um sinal divino miraculoso e definitivo: o nascimento virginal. O Messias seria gerado sem semente humana corrupta, unindo a natureza divina e a humana perfeitamente em Sua pessoa: Emanuel, o Deus conosco.",
    sovereigntyFocus: "Mostra o controle divino absoluto sobre a biologia e as leis naturais. A encarnação é um ato soberano e unilateral da graça de Deus, operado pelo Espírito Santo, superando as impossibilidades humanas."
  },
  {
    id: "M5",
    oldTestamentRef: "Salmo 22:16-18",
    oldTestamentText: "Cães me rodearam; um bando de homens maus me cercou; perfuraram minhas mãos e meus pés... Repartem entre si as minhas vestes e lançam sortes sobre a minha túnica.",
    prophecyTheme: "Os Detalhes da Crucificação Séculos Antes do Seu Surgimento",
    newTestamentRef: "Mateus 27:35, 46; João 19:23-24",
    newTestamentText: "Quando o crucificaram, repartiram as suas vestes, lançando sortes... E perto da hora nona exclamou Jesus: 'Deus meu, Deus meu, por que me desamparaste?'",
    theologicalContext: "O Salmo 22, escrito por Davi por volta de 1000 a.C., descreve graficamente os suplícios da crucificação (perfuração de mãos e pés, desidratação, escárnio público, deslocamento de ossos e a partilha de vestes por sorteio) séculos antes que esse método de execução fosse inventado pelos persas e popularizado pelos romanos.",
    sovereigntyFocus: "Nenhum detalhe do Calvário foi deixado ao acaso. O sorteio das roupas pelos soldados romanos, a atitude dos escarnecedores e até as palavras pronunciadas por Jesus na cruz foram rigidamente pré-estabelecidos e registrados pela inspiração do Espírito Santo."
  },
  {
    id: "M6",
    oldTestamentRef: "Salmo 16:10",
    oldTestamentText: "Porque não deixarás a minha alma no inferno, nem permitirás que o teu Santo veja corrupção.",
    prophecyTheme: "A Vitória sobre a Morte: A Ressurreição do Messias",
    newTestamentRef: "Atos 2:24-32; Atos 13:35-37",
    newTestamentText: "Davi previu isto e falou da ressurreição de Cristo, que a sua alma não foi deixada no Hades, nem a sua carne viu a corrupção. Deus ressuscitou a este Jesus, do que todos nós somos testemunhas.",
    theologicalContext: "Davi profetizou que o Ungido de Deus passaria pela morte, mas que a Sua sepultura não seria o Seu fim; Ele não veria a decomposição física (corrupção). Pedro e Paulo usam este argumento teológico no livro de Atos para provar que a ressurreição física de Jesus ao terceiro dia cumpre perfeitamente a aliança davídica.",
    sovereigntyFocus: "Deus Pai detém o poder soberano sobre a sepultura e a morte. Ressuscitar Jesus foi a validação pública e cósmica de que o sacrifício na cruz foi aceito e que a autoridade da morte foi desfeita para sempre."
  },
  {
    id: "M7",
    oldTestamentRef: "Zacarias 9:9",
    oldTestamentText: "Alegre-se muito, cidade de Sião! Exulte, cidade de Jerusalém! Eis que o seu rei vem a você, justo e trazendo salvação, humilde e montado num jumento, num jumentinho, cria de jumenta.",
    prophecyTheme: "A Entrada Triunfal: A Realeza Humilde do Messias",
    newTestamentRef: "Mateus 21:1-9; João 12:12-15",
    newTestamentText: "Levaram o jumento e o jumentinho... Jesus montou... E a multidão clamava: 'Hosana ao Filho de Davi! Bendito o que vem em nome do Senhor!'",
    theologicalContext: "Zacarias prediz a entrada solene do Messias como o verdadeiro Rei messiânico, mas de uma forma diametralmente oposta aos conquistadores militares deste mundo. Ele viria montado em uma cria de jumenta, simbolizando paz, humildade e submissão à vontade do Pai, trazendo a verdadeira salvação espiritual.",
    sovereigntyFocus: "Mostra que o Reino de Cristo não se estabelece por forças carnais ou poder político terreno, mas pela humilde obediência. Deus soberanamente inclina o coração da multidão para clamar hosanas, cumprindo o tempo exato determinado pelo Altíssimo."
  },
  {
    id: "M8",
    oldTestamentRef: "Daniel 9:24-26",
    oldTestamentText: "Setenta semanas estão decretadas sobre o seu povo... para pôr fim ao pecado, expiar a iniquidade e trazer a justiça eterna... Depois das sessenta e duas semanas, o Ungido será cortado e não terá nada...",
    prophecyTheme: "A Cronologia das Setenta Semanas e a Morte do Ungido",
    newTestamentRef: "Gálatas 4:4; Romanos 5:6; Lucas 19:41-44",
    newTestamentText: "Pois quando ainda éramos fracos, Cristo morreu a seu tempo pelos ímpios... Se você compreendesse hoje o que traz a paz! Mas agora está oculto aos seus olhos. Dias virão em que seus inimigos a cercarão...",
    theologicalContext: "Daniel recebe a revelação cronológica das 70 semanas de anos (490 anos) a partir do decreto para restaurar e reconstruir Jerusalém. A profecia prediz que, após a semana 62 (69 semanas no total, ou 483 anos), o Ungido (Messias) seria 'cortado' (executado), trazendo expiação pelo pecado, e logo após a cidade de Jerusalém e o templo seriam destruídos.",
    sovereigntyFocus: "A precisão matemática e temporal desta profecia é uma das maiores provas do controle de Deus sobre a história. Ele estabeleceu o relógio escatológico do mundo e enviou o Messias no ano, dia e hora pré-calculados de acordo com Seus desígnios soberanos."
  }
];

export const APOCALYPTIC_PROPHECIES: ApocalypticProphecy[] = [
  {
    id: "A1",
    title: "O Filho do Homem e as Quatro Feras de Daniel 7",
    passageRef: "Daniel 7:1-14, 23-27",
    textSnippet: "Eu estava olhando nas minhas visões da noite, e eis que vinha com as nuvens do céu um como o Filho do Homem... e foi-lhe dado o domínio, e a honra, e o reino...",
    propheticTheme: "A Ascensão dos Impérios Humanos e o Reinado Eterno de Deus",
    differentInterpretations: {
      preterist: "Associa as quatro feras estritamente aos impérios antigos (Babilônia, Medo-Pérsia, Grécia e Roma) e vê o chifre pequeno como Antíoco Epifânio ou o imperador Nero, com o julgamento divino já estabelecido no colapso desses opressores do primeiro século.",
      historicist: "Interpreta as quatro feras como os impérios ocidentais sucessivos ao longo da história da humanidade e identifica o chifre pequeno como o surgimento do papado medieval de Roma ou de impérios que corromperam a fé cristã pura.",
      futurist: "Vê a quarta besta como um Império Romano revivido no fim dos tempos (uma confederação global de nações) e o chifre pequeno como o Anticristo pessoal que governará o mundo por 3 anos e meio antes do retorno visível de Cristo.",
      idealist: "Interpreta as quatro feras como as forças políticas, opressoras e demoníacas recorrentes em toda a história humana que tentam esmagar a Igreja, e a vinda do Filho do Homem como o governo soberano e perene de Cristo sobre as tribulações."
    },
    theologicalSynthesis: "Independentemente de como os reinos terrestres são identificados, a visão de Daniel foca na suprema corte celestial estabelecida pelo Ancião de Dias. Os impérios humanos, por mais bestiais e ferozes que pareçam, têm seus dias contados e sua autoridade limitada. O clímax é a vitória e o reinado eterno do Filho do Homem (Jesus Cristo) junto com os Seus santos.",
    sovereigntyFocus: "Deus estabelece limites absolutos ao poder do mal e dos reinos humanos. Eles só governam pelo tempo e medida outorgados pelo Trono Celestial. O Altíssimo é o único Juiz e Doador de reinados perpétuos."
  },
  {
    id: "A2",
    title: "O Sermão Escatológico no Monte das Oliveiras",
    passageRef: "Mateus 24:1-35; Lucas 21:5-33; Marcos 13",
    textSnippet: "E este evangelho do reino será pregado em todo o mundo, em testemunho a todas as nações, e então virá o fim... Quando vocês virem Jerusalém cercada de exércitos, saibam que a sua devastação está próxima.",
    propheticTheme: "Os Sinais dos Tempos, o Julgamento de Jerusalém e a Consumação",
    differentInterpretations: {
      preterist: "Sustenta que quase todo o sermão (vv. 1-34) se cumpriu estritamente na geração contemporânea de Jesus, culminando no cerco romano e destruição do Templo de Jerusalém no ano 70 d.C., interpretando a 'vinda nas nuvens' como uma linguagem figurativa de juízo teocrático contra Israel.",
      historicist: "Vê os sinais (guerras, fomes, terremotos e apostasia) como uma descrição pictórica das tribulações que a Igreja enfrentaria ao longo de toda a era cristã, servindo como marcadores providenciais de progresso histórico.",
      futurist: "Divide o sermão em duas partes: a queda histórica de Jerusalém em 70 d.C. e os eventos da Grande Tribulação futura de 7 anos. Vê os sinais físicos (sol escurecendo, estrelas caindo) como catástrofes astronômicas literais imediatamente anteriores à parusia física de Jesus.",
      idealist: "Interpreta os sinais como realidades constantes da era presente da Igreja (a tensão de viver entre o 'já' e o 'ainda não'). As dores de parto alertam a comunidade a manter-se vigilante e perseverante em meio às perseguições de qualquer geração."
    },
    theologicalSynthesis: "O Sermão Escatológico une com maestria o julgamento histórico de Jerusalém (um protótipo de juízo) e a consumação final do mundo. O grande foco pastoral de Jesus não é saciar curiosidades cronológicas, mas exortar Seus discípulos à perseverança inabalável, à prontidão espiritual e à proclamação mundial do Evangelho como testemunho.",
    sovereigntyFocus: "Deus é o Senhor do tempo e da história. Jesus predisse com exatidão cirúrgica a destruição do templo mais de 35 anos antes de ocorrer. Ele garante que as Suas palavras não passarão, revelando que a preservação dos eleitos e o dia de Sua volta estão firmemente sob a autoridade soberana do Pai."
  },
  {
    id: "A3",
    title: "O Retorno do Rei e os Novos Céus e Nova Terra",
    passageRef: "Apocalipse 19:11-16; 21:1-7; 22:1-5",
    textSnippet: "E vi o céu aberto, e eis um cavalo branco; e o que estava assentado sobre ele chama-se Fiel e Verdadeiro... E vi um novo céu e uma nova terra. Porque já o primeiro céu e a primeira terra passaram...",
    propheticTheme: "A Vitória Triunfal sobre o Mal e a Restauração Cósmica da Criação",
    differentInterpretations: {
      preterist: "Associa a queda da besta e do falso profeta à derrota do paganismo romano imperial e a descida da Nova Jerusalém como a beleza espiritual atual da Igreja purificada sob a Nova Aliança instaurada na história.",
      historicist: "Enxerga o retorno de Cristo como a vitória definitiva sobre o sistema corrupto do anticristo político-religioso acumulado durante os séculos e a inauguração final do reino da justiça após o colapso dos reinos terrestres.",
      futurist: "Interpreta como o retorno literal, visível e corporal de Jesus à Terra para destruir fisicamente os exércitos do Armagedom, prender Satanás no abismo por mil anos literais, e após o juízo final, recriar fisicamente o cosmos num novo Éden glorioso.",
      idealist: "Vê a passagem como o retrato culminante e glorioso do triunfo da justiça de Deus. O mal e a morte, personificados na Besta e no Dragão, são definitivamente erradicados. A Nova Jerusalém representa a comunhão perfeita e eterna de Deus com Seu povo redimido."
    },
    theologicalSynthesis: "Apocalipse coroa a metanarrativa bíblica. A história não termina em destruição fria ou no vácuo cósmico, mas na redenção física e espiritual da criação. Deus habitará perpetuamente com a humanidade redimida nos Novos Céus e Nova Terra, onde não haverá mais pranto, dor ou morte. É o triunfo incontestável da soberania da graça.",
    sovereigntyFocus: "A promessa da recriação cósmica testifica a fidelidade indestrutível de Deus. Ele não abandona Sua criação original ao domínio do pecado; Ele a reivindica, purifica e glorifica soberanamente. O mal não é eterno; apenas o Reino do nosso Deus subsistirá para sempre."
  }
];

export const HISTORICAL_PROPHECIES: HistoricalProphecy[] = [
  {
    id: "H1",
    title: "Ciro, o Persa, Predito por Nome Séculos Antes",
    passageRef: "Isaías 44:28; 45:1-4",
    prophecyText: "Quem diz de Ciro: Ele é meu pastor, e cumprirá todo o meu agrado... Assim diz o Senhor ao seu ungido, a Ciro, a quem tomo pela mão direita, para abater as nações diante de sua face...",
    fulfillmentHistory: "Escrita por Isaías por volta de 700 a.C., a profecia cita nominalmente o conquistador persa Ciro, o Grande, prevendo que ele conquistaria a Babilônia, abriria as portas de bronze das fortificações e emitiria um decreto permitindo que o povo de Judá, exilado, retornasse a Jerusalém para reconstruir o Templo. Ciro nasceu e conquistou a Babilônia em 539 a.C., cerca de 150 anos após o registro de Isaías.",
    historicalEvidence: "O 'Cilindro de Ciro', uma peça arqueológica de argila descoberta em 1879 e hoje preservada no Museu Britânico, registra o decreto real de Ciro permitindo que povos exilados sob a Babilônia retornassem às suas terras natais e reconstruíssem seus santuários, confirmando de forma extraordinária o relato bíblico de Esdras 1 e a profecia de Isaías.",
    theologicalSignificance: "Demonstra que Deus detém o controle total e prévio sobre os nomes, destinos e ações de indivíduos, mesmo aqueles que não O conhecem ('ainda que não me conhecessem' - Is 45:4). Ele usa governantes pagãos para cumprir Seus planos graciosos de libertação para o Seu povo aliançado.",
    sovereigntyFocus: "Esta profecia é um monumento à soberania predestinadora de Deus. Ele chama pelo nome Seus instrumentos históricos muito antes de nascerem, provando que o nascimento, a ascensão e as políticas de impérios mundiais são conduzidos de acordo com o Seu conselho divino."
  },
  {
    id: "H2",
    title: "Os Setenta Anos de Exílio Babilônico e a Restauração",
    passageRef: "Jeremias 25:11-12; 29:10",
    prophecyText: "E toda esta terra virá a ser uma desolação... e estas nações servirão ao rei de Babilônia setenta anos. Acontecerá, porém, que, quando se cumprirem os setenta anos, visitarei o rei de Babilônia, e farei daquela terra desolações perpétuas...",
    fulfillmentHistory: "Jeremias profetizou em Jerusalém antes do cativeiro, alertando que a rebelião espiritual de Judá resultaria no julgamento soberano de Deus através do exército de Nabucodonosor. Ele fixou o tempo do exílio em exatamente 70 anos. O primeiro grupo de cativos foi levado em 605 a.C., e o decreto de Ciro liberando o retorno ocorreu em 538/537 a.C., marcando com precisão cronológica o período profetizado.",
    historicalEvidence: "Os livros históricos bíblicos de Esdras, Neemias e Daniel, junto com a cronologia babilônica clássica gravada em tabuletas cuneiformes (como as Crônicas Babilônicas), documentam o período exato de hegemonia do Império Neobabilônico e sua súbita queda diante dos Medo-Persas exatamente sete décadas após o início da sua expansão sobre Judá.",
    theologicalSignificance: "Ensina que o julgamento de Deus sobre o Seu povo tem fins pedagógicos e temporais, nunca destrutivos ou finais. Revela que Deus é fiel para disciplinar com justiça e restaurar com infinita misericórdia no tempo por Ele demarcado.",
    sovereigntyFocus: "Deus estabelece o tempo exato de duração da aflição de Seu povo. Nem as cadeias do maior império da época (Babilônia) puderam reter os cativos um dia sequer além dos setenta anos decretados pelo Soberano dos Exércitos."
  },
  {
    id: "H3",
    title: "O Julgamento e Arrasamento Histórico da Cidade de Tiro",
    passageRef: "Ezequiel 26:1-14",
    prophecyText: "Farei de você uma rocha nua; você se tornará um lugar para estender redes de pescar... pois eu, o Senhor, falei, diz o Senhor Deus... E rasparão o seu pó, e as suas pedras, e as suas madeiras deitarão no meio das águas...",
    fulfillmentHistory: "Ezequiel profetizou que a rica, soberba e influente metrópole fenícia de Tiro seria julgada por Deus. A profecia detalhava que 'muitas nações' viriam contra ela, que suas muralhas seriam demolidas e que suas pedras e madeiras seriam jogadas no meio do mar, tornando-se uma rocha nua. Nabucodonosor sitiou a cidade continental por 13 anos. Séculos depois (332 a.C.), Alexandre o Grande, para alcançar a ilha fortificada de Tiro, recolheu todas as ruínas, madeiras e terra da cidade continental destruída e jogou-as no mar para construir um aterro (molhe) de acesso, cumprindo literalmente a profecia de deitar as pedras no meio das águas.",
    historicalEvidence: "O historiador grego Arriano e o historiador romano Diodoro Sículo registraram minuciosamente o cerco de Alexandre a Tiro, detalhando a construção do aterro colossal usando os escombros da cidade antiga. Hoje, a área da antiga Tiro abriga um porto simples com pescadores estendendo suas redes sobre as rochas, exatamente como Ezequiel viu.",
    theologicalSignificance: "Ilustra que o orgulho humano, a autossuficiência econômica e a zombaria contra o povo de Deus são alvos do juízo inflexível do Altíssimo. A segurança material das nações mais ricas desmorona diante da palavra profética.",
    sovereigntyFocus: "Mostra como Deus utiliza diferentes agentes históricos em épocas distintas (Babilônia e, séculos depois, a Grécia) para executar um único decreto soberano com precisão literal de engenharia militar."
  },
  {
    id: "H4",
    title: "A Destruição Repentina e Total de Nínive (Assíria)",
    passageRef: "Naum 1:8; 2:6; 3:19",
    prophecyText: "E com uma inundação transbordante acabará de uma vez com o seu lugar... As portas dos rios se abrirão, e o palácio se derreterá... Não há cura para a sua ferida; a sua chaga é dolorosa...",
    fulfillmentHistory: "Nínive era a capital do brutal Império Assírio, a maior superpotência militar da antiguidade. O profeta Naum declarou que Deus destruiria a cidade de forma repentina e absoluta através de 'uma inundação transbordante' que abriria as portas dos rios e derreteria o palácio. No ano 612 a.C., uma coalizão de babilônios e medos sitiou Nínive. Chuvas torrenciais incomuns fizeram o rio Tigre transbordar, derrubando uma seção massiva das intransponíveis muralhas de pedra. Os invasores entraram pela brecha da inundação, incendiaram e arrasaram o palácio real de argila e pedra ('derreteu-se'). A cidade foi tão completamente destruída que sua localização ficou esquecida por séculos.",
    historicalEvidence: "Arqueólogos do século XIX (como Austen Henry Layard) redescobriram as ruínas de Nínive soterradas sob montes de areia. As escavações revelaram uma espessa camada de cinzas de incêndio, evidências de danos causados pela água nas fundações das muralhas e o colapso repentino de um império que parecia indestrutível.",
    theologicalSignificance: "Testifica que o poder militar brutal, a crueldade sistemática e a opressão dos povos têm limites éticos diante de Deus. O Altíssimo levanta-se como o defensor dos oprimidos e derruba os impérios sanguinários que se consideravam divinos.",
    sovereigntyFocus: "Deus domina até mesmo as forças climáticas e meteorológicas (as chuvas e o transbordamento do rio Tigre) para cumprir de forma precisa o dia do Seu acerto de contas contra a impiedade dos reis assírios."
  }
];

export const PROPHETIC_SYMBOLS: PropheticSymbol[] = [
  {
    symbol: "Besta / Animal Feroz",
    meaning: "Um grande império mundial, reino pagão ou poder político opressor do povo de Deus.",
    references: "Daniel 7:17, 23; Apocalipse 13:1; Jeremias 50:17",
    category: "Apocalíptica",
    context: "Representa a natureza predatória, violenta e sem temor a Deus que caracteriza os governos humanos distanciados do Trono do Criador."
  },
  {
    symbol: "Chifre",
    meaning: "Poder político, força militar, rei, dinastia ou autoridade governante.",
    references: "Daniel 7:24; Apocalipse 17:12; Salmo 132:17; Zacarias 1:18-19",
    category: "Apocalíptica",
    context: "Na cultura do antigo Oriente, o chifre dos touros ou bodes selvagens era o símbolo máximo de força vital, soberba e autoridade de governo."
  },
  {
    symbol: "Águas / Mares / Rios",
    meaning: "Povos, nações, multidões humanas e diversidade linguística ou étnica.",
    references: "Apocalipse 17:15; Isaías 17:12; Jeremias 51:13",
    category: "Apocalíptica",
    context: "O mar agitado e instável tipifica o caos e a instabilidade geopolítica das massas humanas de onde emergem os impérios e tiranos terrestres."
  },
  {
    symbol: "Estrelas",
    meaning: "Anjos, seres espirituais celestes ou líderes/pastores espirituais das igrejas.",
    references: "Apocalipse 1:20; 12:4; Daniel 12:3",
    category: "Eclesiológica",
    context: "Seres que devem emitir a luz da verdade divina e exercer autoridade representativa sob o controle e supervisão soberana de Cristo."
  },
  {
    symbol: "Candelabros / Castiçais",
    meaning: "A igreja fiel local em sua missão de portar e propagar o testemunho do Evangelho.",
    references: "Apocalipse 1:20; Êxodo 25:31; Mateus 5:14-16",
    category: "Eclesiológica",
    context: "O candelabro não é a luz em si mesmo; ele é o suporte purificado por Deus para sustentar o brilho do Espírito Santo na terra."
  },
  {
    symbol: "Vento",
    meaning: "Julgamentos divinos providenciais, guerras, destruição ou convulsões políticas rápidas.",
    references: "Daniel 7:2; Jeremias 49:36; Apocalipse 7:1; Efésios 4:14",
    category: "Julgamento",
    context: "Os ventos colidindo contra a terra ou o mar ilustram o agir invisível e soberano do Espírito de Deus agitando a ordem social para Seus propósitos."
  },
  {
    symbol: "Noiva / Esposa",
    meaning: "A comunidade fiel aliançada de Deus, purificada e consagrada (a verdadeira Igreja).",
    references: "Apocalipse 19:7-8; 21:2; Efésios 5:25-32; Oseias 2:19-20",
    category: "Aliança",
    context: "Em contraste com a meretriz corrupta (apostasia), simboliza a fidelidade doutrinária, pureza moral e a união indissolúvel dos eleitos com Cristo."
  }
];

export const PROPHECIES_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual profecia do Antigo Testamento é historicamente denominada de 'Protoevangelho' (a primeira promessa messiânica da Bíblia)?",
    options: [
      "Gênesis 3:15 (O descendente da mulher que esmagará a cabeça da serpente)",
      "Isaías 7:14 (A virgem que dará à luz o Emanuel)",
      "Isaías 53:5 (O Servo Sofredor que assume as nossas dores)",
      "Miqueias 5:2 (O nascimento do Rei eterno em Belém-Efrata)"
    ],
    correctAnswerIdx: 0,
    explanation: "Gênesis 3:15 é denominado o 'Protoevangelho' pois, logo após a Queda, Deus decreta soberanamente que da semente da mulher nasceria o Redentor que, pelo Seu próprio sofrimento na cruz (ferir o calcanhar), esmagaria a cabeça de Satanás de forma definitiva."
  },
  {
    id: 2,
    question: "Qual detalhe impressionante da crucificação de Jesus foi predito pelo Salmo 22 cerca de 1000 anos antes de Sua ocorrência e muito antes da crucificação ser inventada?",
    options: [
      "A traição por trinta moedas de prata",
      "O sorteio de Suas vestes e a perfuração de Suas mãos e pés",
      "O sepultamento num túmulo de um homem rico",
      "O silêncio absoluto do Messias diante de Seus acusadores"
    ],
    correctAnswerIdx: 1,
    explanation: "O Salmo 22:16-18 descreve explicitamente cães cercando o justo, a perfuração de suas mãos e pés, e o sorteio de suas vestes. Esse método cruel de execução só seria popularizado séculos depois pelo Império Romano, atestando a soberania providencial de Deus sobre o futuro."
  },
  {
    id: 3,
    question: "Qual soberano persa foi profetizado nominalmente por Isaías cerca de 150 anos antes de nascer, como o instrumento que decretaria a reconstrução do Templo?",
    options: [
      "Dario, o Medo",
      "Artaxerxes I",
      "Ciro, o Grande",
      "Xerxes I (Assuero)"
    ],
    correctAnswerIdx: 2,
    explanation: "Isaías 44:28 e 45:1 citam nominalmente 'Ciro' como o pastor de Deus que cumpriria Seu agrado e ordenaria a libertação dos judeus exilados e a reconstrução do templo. O achado arqueológico do 'Cilindro de Ciro' confirma esse decreto na história."
  },
  {
    id: 4,
    question: "Qual é a interpretação do símbolo bíblico de 'Águas' ou 'Mares' no livro do Apocalipse (17:15) e nos profetas?",
    options: [
      "Julgamentos literais de tempestades e maremotos ecológicos",
      "Povos, multidões, nações e línguas",
      "A infusão mística do Espírito Santo no fim das eras",
      "O batismo coletivo de novos convertidos na era cristã"
    ],
    correctAnswerIdx: 1,
    explanation: "O Apocalipse 17:15 traz a interpretação explícita dada pelo anjo: 'As águas que você viu... são povos, multidões, nações e línguas'. Na literatura profética, o mar agitado tipifica o solo de instabilidade de onde emergem os reinos humanos dominados pelo pecado."
  },
  {
    id: 5,
    question: "Como o foco na Soberania de Deus une as diferentes escolas de interpretação escatológica (Preterismo, Historicismo, Futurismo, Idealismo)?",
    options: [
      "Dizendo que apenas uma escola é correta e as outras são heréticas",
      "Ao enfatizar que, independente do cronograma de cumprimento, Deus rege a história humana e garante a vitória final de Jesus Cristo e de Sua Igreja",
      "Anulando a importância de estudar as referências históricas e bíblicas",
      "Afirmando que a história do mundo está à deriva e que o mal tem autoridade infinita"
    ],
    correctAnswerIdx: 1,
    explanation: "A soberania absoluta de Deus é o grande elo de comunhão. Independentemente de como cada escola organiza cronologicamente os símbolos de Daniel e do Apocalipse, todas concordam que a história não está à deriva. Deus governa os impérios e o desfecho final é o triunfo físico e eterno do Cordeiro sobre as trevas."
  }
];
