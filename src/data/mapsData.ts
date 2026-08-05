export interface MapPoint {
  id: string;
  name: string; // Nome bíblico
  modernName: string; // Nome moderno
  x: number; // Percentual x (0 a 100) para coordenadas responsivas no SVG
  y: number; // Percentual y (0 a 100)
  description: string; // Resumo histórico / teológico
  passages: string[]; // Referências bíblicas principais
  characters: string[]; // Personagens relacionados
  books: string[]; // Livros relacionados
}

export interface MapRoute {
  id: string;
  name: string;
  color: string;
  path: { x: number; y: number }[]; // Sequência de coordenadas x, y (0-100) para traçar rotas
}

export interface BiblicalMap {
  id: string;
  title: string;
  period: string;
  chronologyOrder: number; // Para ordenar na linha do tempo deslizante
  description: string;
  theologicalContext: string;
  viewBox: string; // Ex: '0 0 800 500' ou '0 0 500 800'
  points: MapPoint[];
  routes: MapRoute[];
}

export const BIBLICAL_MAPS: BiblicalMap[] = [
  {
    id: 'antigo-oriente',
    title: 'Oriente Próximo Antigo',
    period: 'Era dos Patriarcas (Aprox. 2000–1500 a.C.)',
    chronologyOrder: 1,
    description: 'O berço da revelação bíblica, abrangendo a Mesopotâmia (rios Tigre e Eufrates), a costa do Levante (Canaã) e o delta do Nilo (Egito).',
    theologicalContext: 'Deus estabeleceu os alicerces da história da salvação chamando Abraão do meio de Ur para ser o herdeiro de uma promessa que culminaria na bênção universal através do Messias.',
    viewBox: '0 0 800 500',
    points: [
      {
        id: 'ur',
        name: 'Ur dos Caldeus',
        modernName: 'Tell el-Muqayyar (Iraque)',
        x: 75,
        y: 75,
        description: 'Cidade-estado suméria cosmopolita e grande centro de adoração ao deus-lua Nanna de onde Terá e Abraão partiram.',
        passages: ['Gênesis 11:31', 'Neemias 9:7', 'Atos 7:2-4'],
        characters: ['Abraão', 'Terá', 'Ló', 'Sara'],
        books: ['Gênesis', 'Neemias', 'Atos']
      },
      {
        id: 'hara',
        name: 'Harã',
        modernName: 'Harran (Turquia)',
        x: 48,
        y: 22,
        description: 'Posto comercial estratégico no norte da Mesopotâmia. Ali Terá faleceu e Abraão recebeu o chamado direto de Deus para partir rumo à terra desconhecida de Canaã.',
        passages: ['Gênesis 11:32', 'Gênesis 12:1-4', 'Atos 7:4'],
        characters: ['Abraão', 'Terá', 'Ló', 'Sara'],
        books: ['Gênesis', 'Atos']
      },
      {
        id: 'siquem-ao',
        name: 'Siquém',
        modernName: 'Nablus (Palestina)',
        x: 28,
        y: 48,
        description: 'A primeira parada de Abraão em Canaã. Ele armou sua tenda junto ao Carvalho de Moré, levantou o primeiro altar ao Senhor e recebeu a promessa: "À sua descendência darei esta terra".',
        passages: ['Gênesis 12:6-7', 'Gênesis 33:18-20', 'Gênesis 35:1-4'],
        characters: ['Abraão', 'Jacó', 'José'],
        books: ['Gênesis']
      },
      {
        id: 'egito-ao',
        name: 'Egito (Delta do Nilo)',
        modernName: 'Delta do Nilo (Egito)',
        x: 10,
        y: 72,
        description: 'Refúgio fértil procurado por Abraão devido à severa fome em Canaã. Mais tarde, tornou-se o berço do crescimento e cativeiro da nação de Israel.',
        passages: ['Gênesis 12:10-20', 'Gênesis 46:1-7', 'Êxodo 1:1-14'],
        characters: ['Abraão', 'Sara', 'José', 'Jacó', 'Moisés'],
        books: ['Gênesis', 'Êxodo']
      },
      {
        id: 'babilonia-ao',
        name: 'Babilônia',
        modernName: 'Al-Hillah (Iraque)',
        x: 68,
        y: 55,
        description: 'Localizada na planície de Sinar. Ponto original da rebelião humana unificada na construção da Torre de Babel, resultando na confusão das línguas e dispersão das nações.',
        passages: ['Gênesis 11:1-9', 'Gênesis 10:10'],
        characters: ['Nimrode'],
        books: ['Gênesis']
      },
      {
        id: 'ninive-ao',
        name: 'Nínive',
        modernName: 'Mosul (Iraque)',
        x: 64,
        y: 18,
        description: 'Antiga e poderosa capital do Império Assírio, fundada originalmente por Nimrode na alta Mesopotâmia.',
        passages: ['Gênesis 10:11-12'],
        characters: ['Nimrode'],
        books: ['Gênesis']
      }
    ],
    routes: [
      {
        id: 'crescente-fertil',
        name: 'O Crescente Fértil',
        color: '#b45309',
        path: [
          { x: 10, y: 72 },
          { x: 28, y: 48 },
          { x: 48, y: 22 },
          { x: 64, y: 18 },
          { x: 68, y: 55 },
          { x: 75, y: 75 }
        ]
      }
    ]
  },
  {
    id: 'jornada-abraao',
    title: 'A Jornada de Abraão',
    period: 'Era Patriarcal (Aprox. 2000 a.C.)',
    chronologyOrder: 2,
    description: 'A herança de fé do pai das nações. O itinerário que levou Abraão do paganismo caldeu à terra da Promessa divina.',
    theologicalContext: 'Abraão obedeceu sem questionar, vivendo como peregrino e estrangeiro em tendas, aguardando soberanamente a cidade celestial cuja construção e fundação pertencem a Deus.',
    viewBox: '0 0 800 500',
    points: [
      {
        id: 'ab-ur',
        name: 'Ur dos Caldeus',
        modernName: 'Tell el-Muqayyar (Iraque)',
        x: 75,
        y: 75,
        description: 'Local de origem de Abraão onde Deus efetuou o chamado primário e de onde partiu com seu pai Terá e sua esposa Sara.',
        passages: ['Gênesis 11:31', 'Atos 7:2-4'],
        characters: ['Abraão', 'Terá', 'Sara', 'Ló'],
        books: ['Gênesis', 'Atos']
      },
      {
        id: 'ab-haran',
        name: 'Harã',
        modernName: 'Harran (Turquia)',
        x: 48,
        y: 22,
        description: 'Cidade onde a caravana pausou até a morte de Terá. Ali Abraão, aos 75 anos, ouviu o chamado para abandonar sua parentela rumo a Canaã.',
        passages: ['Gênesis 12:1-4'],
        characters: ['Abraão', 'Sara', 'Ló'],
        books: ['Gênesis']
      },
      {
        id: 'ab-damasco',
        name: 'Damasco',
        modernName: 'Damasco (Síria)',
        x: 31,
        y: 43,
        description: 'Cidade antiquíssima de passagem na rota de comércio de Harã para Canaã, de onde provinha Eliezer, o mordomo de Abraão.',
        passages: ['Gênesis 15:2', 'Gênesis 14:15'],
        characters: ['Abraão', 'Eliezer'],
        books: ['Gênesis']
      },
      {
        id: 'ab-siquem',
        name: 'Siquém',
        modernName: 'Nablus (Palestina)',
        x: 28,
        y: 48,
        description: 'Primeiro altar e promessa formal da terra concedida pelo Senhor a Abraão.',
        passages: ['Gênesis 12:6-7'],
        characters: ['Abraão'],
        books: ['Gênesis']
      },
      {
        id: 'ab-betel',
        name: 'Betel e Ai',
        modernName: 'Beitin (Palestina)',
        x: 27,
        y: 52,
        description: 'Local montanhoso onde Abraão armou tenda e invocou o nome do Senhor de forma pública e solene pela primeira vez.',
        passages: ['Gênesis 12:8', 'Gênesis 13:3-4'],
        characters: ['Abraão', 'Ló'],
        books: ['Gênesis']
      },
      {
        id: 'ab-hebron',
        name: 'Hebrom (Carvalhais de Manre)',
        modernName: 'Al-Khalil (Cisjordânia)',
        x: 26,
        y: 58,
        description: 'Lugar de morada estável de Abraão. Próximo dali ficava a caverna de Macpela, que ele comprou como sepultura familiar e onde ele, Sara, Isaque e Jacó foram enterrados.',
        passages: ['Gênesis 13:18', 'Gênesis 23:1-20', 'Gênesis 25:9-10'],
        characters: ['Abraão', 'Sara', 'Isaque', 'Rebeca', 'Jacó', 'Lia'],
        books: ['Gênesis']
      },
      {
        id: 'ab-egito',
        name: 'Egito',
        modernName: 'Delta do Nilo (Egito)',
        x: 10,
        y: 72,
        description: 'Local de desvio de Abraão pela escassez de pão, onde ele temeu por sua vida e mentiu sobre sua relação com Sara, sendo repreendido por Faraó sob intervenção divina.',
        passages: ['Gênesis 12:10-20'],
        characters: ['Abraão', 'Sara', 'Faraó'],
        books: ['Gênesis']
      }
    ],
    routes: [
      {
        id: 'rota-abraao',
        name: 'A Rota da Fé de Abraão',
        color: '#d97706',
        path: [
          { x: 75, y: 75 }, // Ur
          { x: 48, y: 22 }, // Harã
          { x: 31, y: 43 }, // Damasco
          { x: 28, y: 48 }, // Siquém
          { x: 27, y: 52 }, // Betel
          { x: 26, y: 58 }, // Hebrom
          { x: 10, y: 72 }  // Egito
        ]
      }
    ]
  },
  {
    id: 'exodo-deserto',
    title: 'O Êxodo e o Deserto',
    period: 'Aprox. 1440–1400 a.C. ou 1290–1250 a.C.',
    chronologyOrder: 3,
    description: 'A libertação de Israel do jugo do Egito e sua consequente peregrinação de 40 anos sob liderança de Moisés e direção do Tabernáculo.',
    theologicalContext: 'Deus demonstra soberania cósmica sobre as divindades pagãs egípcias através das Pragas e redime Israel pelo sangue do Cordeiro pascal, guiando o Seu povo com a nuvem e o fogo.',
    viewBox: '0 0 800 500',
    points: [
      {
        id: 'ramesses',
        name: 'Ramessés (Egito)',
        modernName: 'Tell el-Dab\'a (Egito)',
        x: 15,
        y: 30,
        description: 'Ponto de partida do Êxodo. Região de Goshen onde os hebreus residiam e de onde partiram apressadamente na noite da Páscoa.',
        passages: ['Êxodo 12:37', 'Números 33:3-5'],
        characters: ['Moisés', 'Arão', 'Faraó'],
        books: ['Êxodo', 'Números']
      },
      {
        id: 'mar-vermelho',
        name: 'Travessia do Mar Vermelho',
        modernName: 'Golfo de Suez / Lagos Amargos',
        x: 28,
        y: 42,
        description: 'Local do soberano milagre divisor de águas onde Deus libertou Seu povo e sepultou as forças militares de Faraó no abismo.',
        passages: ['Êxodo 14:13-31', 'Salmos 106:9-11', 'Hebreus 11:29'],
        characters: ['Moisés', 'Arão', 'Miriã'],
        books: ['Êxodo', 'Salmos', 'Hebreus']
      },
      {
        id: 'mara',
        name: 'Mara',
        modernName: 'Ain Hawara (Península do Sinai)',
        x: 32,
        y: 58,
        description: 'Lugar de águas amargas que Deus milagrosamente purificou e adocicou por meio de um pedaço de madeira que Moisés lançou nas águas.',
        passages: ['Êxodo 15:23-25'],
        characters: ['Moisés'],
        books: ['Êxodo']
      },
      {
        id: 'sinai',
        name: 'Monte Sinai (Horebe)',
        modernName: 'Jebel Musa (Egito)',
        x: 38,
        y: 80,
        description: 'O altar de aliança nacional. Onde Deus proclamou os Dez Mandamentos e entregou as tábuas da Lei, o projeto do Tabernáculo e o sacerdócio.',
        passages: ['Êxodo 19:1-25', 'Êxodo 20:1-21', 'Levítico 1:1-3'],
        characters: ['Moisés', 'Arão', 'Josué'],
        books: ['Êxodo', 'Levítico']
      },
      {
        id: 'ezion-geber',
        name: 'Eziom-Geber',
        modernName: 'Aqaba (Jordânia)',
        x: 52,
        y: 55,
        description: 'Ponto de acampamento e porto nas margens do Golfo de Ácaba, usado durante a longa caminhada dos 40 anos no deserto.',
        passages: ['Números 33:35', 'Deuteronômio 2:8'],
        characters: ['Moisés', 'Arão'],
        books: ['Números', 'Deuteronômio']
      },
      {
        id: 'cades',
        name: 'Cades-Barnéia',
        modernName: 'Ain el-Qudeirat (Sinai)',
        x: 46,
        y: 40,
        description: 'Lugar de rebelião e tragédia espiritual. Dali os doze espias foram enviados e, após o relatório incrédulo, a antiga geração foi sentenciada por Deus a morrer no deserto.',
        passages: ['Números 13:26-33', 'Números 14:1-38', 'Deuteronômio 1:19-46'],
        characters: ['Moisés', 'Josué', 'Calebe', 'Miriã'],
        books: ['Números', 'Deuteronômio']
      },
      {
        id: 'moabe',
        name: 'Planícies de Moabe (Nebo)',
        modernName: 'Monte Nebo (Jordânia)',
        x: 58,
        y: 22,
        description: 'Acampamento final em frente a Jericó. De onde Moisés contemplou soberanamente a Terra de Canaã de cima do Monte Nebo antes de morrer e ser sepultado por Deus.',
        passages: ['Números 22:1', 'Deuteronômio 34:1-8'],
        characters: ['Moisés', 'Josué', 'Balaão', 'Balaque'],
        books: ['Números', 'Deuteronômio']
      }
    ],
    routes: [
      {
        id: 'rota-exodo',
        name: 'A Rota do Êxodo e Peregrinação',
        color: '#dc2626',
        path: [
          { x: 15, y: 30 }, // Ramessés
          { x: 28, y: 42 }, // Travessia
          { x: 32, y: 58 }, // Mara
          { x: 38, y: 80 }, // Sinai
          { x: 52, y: 55 }, // Eziom-Geber
          { x: 46, y: 40 }, // Cades-Barnéia
          { x: 58, y: 22 }  // Moabe
        ]
      }
    ]
  },
  {
    id: 'conquista-canaa',
    title: 'A Conquista de Canaã',
    period: 'Aprox. 1400–1375 a.C.',
    chronologyOrder: 4,
    description: 'A tomada militar e espiritual da Terra Prometida sob a chefia de Josué, destruindo as fortalezas cananeias em campanhas ordenadas pelo Senhor.',
    theologicalContext: 'O julgamento sobre a iniquidade dos cananeus foi executado por Israel. Deus fez parar o rio Jordão, derrubou os muros de Jericó e fez parar o sol sobre Gibeão em favor de Seu povo.',
    viewBox: '0 0 500 800', // Vertical para focar na Palestina
    points: [
      {
        id: 'cq-jordao',
        name: 'Rio Jordão (Travessia)',
        modernName: 'Rio Jordão (Israel/Jordânia)',
        x: 52,
        y: 50,
        description: 'Milagre onde o rio Jordão teve suas águas cortadas a montante enquanto os sacerdotes sustentavam a Arca da Aliança, permitindo a Israel entrar a pé enxuto em Canaã.',
        passages: ['Josué 3:14-17', 'Josué 4:1-9'],
        characters: ['Josué'],
        books: ['Josué']
      },
      {
        id: 'cq-gilgal',
        name: 'Gilgal',
        modernName: 'Leste de Jericó (Israel)',
        x: 52,
        y: 55,
        description: 'O quartel-general das campanhas de Josué. Lugar onde o opróbrio do Egito foi removido, a circuncisão foi refeita, a Páscoa foi celebrada e o Maná cessou.',
        passages: ['Josué 4:19-20', 'Josué 5:2-12'],
        characters: ['Josué'],
        books: ['Josué']
      },
      {
        id: 'cq-jerico',
        name: 'Jericó',
        modernName: 'Tell es-Sultan (Cisjordânia)',
        x: 48,
        y: 56,
        description: 'A primeira cidade tomada em Canaã. Sob ordens litúrgicas de marcha de sete dias e toque de trombetas, seus impenetráveis muros ruíram soberanamente.',
        passages: ['Josué 6:1-27', 'Hebreus 11:30'],
        characters: ['Josué', 'Raabe'],
        books: ['Josué', 'Hebreus']
      },
      {
        id: 'cq-ai',
        name: 'Ai',
        modernName: 'Khirbet el-Maqatir (Palestina)',
        x: 44,
        y: 52,
        description: 'Cenário da primeira derrota por causa do pecado oculto de Acã. Após purificação nacional, a cidade foi conquistada através de uma brilhante tática de emboscada.',
        passages: ['Josué 7:1-26', 'Josué 8:1-29'],
        characters: ['Josué', 'Acã'],
        books: ['Josué']
      },
      {
        id: 'cq-gibeao',
        name: 'Gibeão',
        modernName: 'Al-Jib (Cisjordânia)',
        x: 41,
        y: 54,
        description: 'Cidade que enganou Israel por uma aliança astuta. Quando atacada por cinco reis amorreus, Josué interveio e Deus travou batalha enviando granizo e detendo o movimento solar no céu.',
        passages: ['Josué 9:1-27', 'Josué 10:1-15'],
        characters: ['Josué'],
        books: ['Josué']
      },
      {
        id: 'cq-hebron',
        name: 'Hebrom',
        modernName: 'Al-Khalil (Cisjordânia)',
        x: 42,
        y: 65,
        description: 'Cidade de gigantes (Anaquins) conquistada pela fé destemida de Calebe aos 85 anos, que a reivindicou como herança pessoal legítima.',
        passages: ['Josué 14:6-15', 'Josué 15:13-14'],
        characters: ['Calebe', 'Josué'],
        books: ['Josué']
      },
      {
        id: 'cq-hazor',
        name: 'Hazor',
        modernName: 'Tell Hazor (Israel)',
        x: 50,
        y: 22,
        description: 'A maior cidade e metrópole do norte de Canaã, governada pelo rei Jabim. Josué a derrotou, matou seus defensores e queimou a cidade como o golpe final da campanha do norte.',
        passages: ['Josué 11:1-14'],
        characters: ['Josué'],
        books: ['Josué']
      },
      {
        id: 'cq-silo',
        name: 'Siló',
        modernName: 'Khirbet Seilun (Cisjordânia)',
        x: 46,
        y: 45,
        description: 'Centro religioso e de partilha das terras. Onde o Tabernáculo foi estabelecido de forma fixa para guardar o culto e a Arca por séculos.',
        passages: ['Josué 18:1-10', '1 Samuel 1:3', 'Salmos 78:60'],
        characters: ['Josué', 'Eli', 'Samuel'],
        books: ['Josué', '1 Samuel', 'Salmos']
      }
    ],
    routes: [
      {
        id: 'campanha-central',
        name: 'Campanha Central e do Sul',
        color: '#dc2626',
        path: [
          { x: 52, y: 50 }, // Jordão
          { x: 52, y: 55 }, // Gilgal
          { x: 48, y: 56 }, // Jericó
          { x: 44, y: 52 }, // Ai
          { x: 41, y: 54 }, // Gibeão
          { x: 42, y: 65 }  // Hebrom
        ]
      },
      {
        id: 'campanha-norte',
        name: 'Campanha do Norte',
        color: '#2563eb',
        path: [
          { x: 46, y: 45 }, // Siló
          { x: 50, y: 22 }  // Hazor
        ]
      }
    ]
  },
  {
    id: 'reino-unido',
    title: 'O Reino Unido de Israel',
    period: 'Saul, Davi e Salomão (Aprox. 1050–930 a.C.)',
    chronologyOrder: 5,
    description: 'A unificação das doze tribos e a expansão imperial. Sob Davi, as fronteiras se expandiram; sob Salomão, o Templo de Jerusalém foi erguido e a paz floresceu.',
    theologicalContext: 'O auge geopolítico de Israel representa a aliança messiânica de Deus com Davi, garantindo que o descendente legítimo governaria um trono eterno.',
    viewBox: '0 0 500 800',
    points: [
      {
        id: 'ru-gibea',
        name: 'Gibeá de Saul',
        modernName: 'Tell el-Ful (Cisjordânia)',
        x: 48,
        y: 52,
        description: 'Cidade natal e capital de Saul, primeiro rei de Israel. Onde residia a corte rústica e militar de seu reinado turbulento.',
        passages: ['1 Samuel 10:26', '1 Samuel 15:34', '2 Samuel 21:6'],
        characters: ['Saul', 'Jonatas', 'Samuel'],
        books: ['1 Samuel', '2 Samuel']
      },
      {
        id: 'ru-hebron',
        name: 'Hebrom',
        modernName: 'Al-Khalil (Cisjordânia)',
        x: 46,
        y: 62,
        description: 'Primeira capital do rei Davi. Onde ele governou sobre a tribo de Judá por sete anos e meio antes de tomar a fortaleza dos jebuseus (Jerusalém).',
        passages: ['2 Samuel 2:1-4', '2 Samuel 5:1-5'],
        characters: ['Davi', 'Abner', 'Joabe'],
        books: ['2 Samuel']
      },
      {
        id: 'ru-jerusalem',
        name: 'Jerusalém',
        modernName: 'Jerusalém',
        x: 48,
        y: 55,
        description: 'A Cidade de Davi. Tomada aos jebuseus, tornou-se capital do Reino Unido. Ali Salomão edificou o Templo sobre o Monte Moriá, fixando o altar do culto de Israel.',
        passages: ['2 Samuel 5:6-10', '2 Samuel 6:12-19', '1 Reis 6:1-38'],
        characters: ['Davi', 'Salomão', 'Araúna'],
        books: ['2 Samuel', '1 Reis']
      },
      {
        id: 'ru-dan',
        name: 'Dã',
        modernName: 'Tell Dan (Norte de Israel)',
        x: 52,
        y: 15,
        description: 'O ponto extremo norte do Reino Unido, marcando o limite setentrional do governo das tribos ("de Dã a Berseba").',
        passages: ['Juízes 20:1', '1 Reis 4:25'],
        characters: ['Salomão', 'Saul'],
        books: ['1 Reis']
      },
      {
        id: 'ru-berseba',
        name: 'Berseba',
        modernName: 'Tel Beer Sheva (Israel)',
        x: 40,
        y: 72,
        description: 'Cidade oásis no extremo sul de Israel, famosa pelos poços dos patriarcas, definindo o limite sul do território nacional pacificado.',
        passages: ['1 Reis 4:25', '2 Samuel 24:15'],
        characters: ['Davi', 'Salomão'],
        books: ['1 Reis', '2 Samuel']
      },
      {
        id: 'ru-gezer',
        name: 'Gezer',
        modernName: 'Tel Gezer (Israel)',
        x: 38,
        y: 54,
        description: 'Cidade cananeia fortificada, oferecida como dote de casamento pela filha de Faraó a Salomão, que a reconstruiu como uma poderosa cidade-fortaleza de carros e cavalaria.',
        passages: ['1 Reis 9:15-17'],
        characters: ['Salomão', 'Faraó'],
        books: ['1 Reis']
      }
    ],
    routes: [
      {
        id: 'reino-extensao',
        name: 'Eixo de Governo (Dã a Berseba)',
        color: '#10b981',
        path: [
          { x: 52, y: 15 }, // Dã
          { x: 48, y: 52 }, // Gibeá
          { x: 48, y: 55 }, // Jerusalém
          { x: 46, y: 62 }, // Hebrom
          { x: 40, y: 72 }  // Berseba
        ]
      }
    ]
  },
  {
    id: 'reinos-divididos',
    title: 'Reinos Divididos',
    period: 'Aprox. 930–586 a.C.',
    chronologyOrder: 6,
    description: 'A divisão nacional. O Reino do Norte (Israel, constituído por 10 tribos, capital Samaria) e o Reino do Sul (Judá, constituído pelas tribos de Judá e Benjamim, capital Jerusalém).',
    theologicalContext: 'Em resposta à idolatria de Salomão, o reino se rompe. Judá persevera na linhagem davídica. Israel rapidamente cai no culto pagão, sendo julgado pelos profetas Elias, Eliseu e Amós.',
    viewBox: '0 0 500 800',
    points: [
      {
        id: 'rd-samaria',
        name: 'Samaria (Capital de Israel)',
        modernName: 'Sebastia (Palestina)',
        x: 46,
        y: 44,
        description: 'Capital do Reino do Norte fundada por Onri. Palco dos excessos pecaminosos de Acabe e Jezabel, confrontados duramente por Elias, e destruída pelos assírios em 722 a.C.',
        passages: ['1 Reis 16:24', '1 Reis 21:1', '2 Reis 17:5-6'],
        characters: ['Acabe', 'Jezabel', 'Elias', 'Eliseu'],
        books: ['1 Reis', '2 Reis']
      },
      {
        id: 'rd-jerusalem',
        name: 'Jerusalém (Capital de Judá)',
        modernName: 'Jerusalém',
        x: 48,
        y: 58,
        description: 'Baluarte e capital do Reino do Sul (Judá). Ali a promessa davídica permaneceu e o templo resistiu até ser arrasado e saqueado por Nabucodonosor em 586 a.C.',
        passages: ['1 Reis 12:21', '2 Reis 19:20-37', '2 Reis 25:1-10'],
        characters: ['Roboão', 'Ezequias', 'Isaías', 'Josias', 'Jeremias'],
        books: ['1 Reis', '2 Reis', 'Jeremias']
      },
      {
        id: 'rd-betel',
        name: 'Betel (Templo Cismático)',
        modernName: 'Beitin (Palestina)',
        x: 47,
        y: 53,
        description: 'Lugar escolhido por Jeroboão I para colocar um dos bezerros de ouro, criando um centro herético alternativo para afastar o povo da adoração em Jerusalém.',
        passages: ['1 Reis 12:28-33', '1 Reis 13:1-10', 'Amós 7:10-17'],
        characters: ['Jeroboão I', 'Amós'],
        books: ['1 Reis', 'Amós']
      },
      {
        id: 'rd-dan',
        name: 'Dã (Templo Cismático Norte)',
        modernName: 'Tell Dan (Norte de Israel)',
        x: 52,
        y: 15,
        description: 'Segundo santuário herético do bezerro de ouro, criado no extremo norte do reino para desencorajar as peregrinações anuais ao Templo de Jerusalém.',
        passages: ['1 Reis 12:28-30', '2 Reis 10:29'],
        characters: ['Jeroboão I', 'Jeú'],
        books: ['1 Reis', '2 Reis']
      },
      {
        id: 'rd-carmelo',
        name: 'Monte Carmelo',
        modernName: 'Monte Carmelo (Israel)',
        x: 35,
        y: 32,
        description: 'Lugar do confronto cósmico de fogo. Elias provou que Yahweh é o único Deus verdadeiro humilhando e degolando os 450 profetas de Baal sustentados pela corte pagã.',
        passages: ['1 Reis 18:16-40'],
        characters: ['Elias', 'Acabe'],
        books: ['1 Reis']
      },
      {
        id: 'rd-jezreel',
        name: 'Jezreel',
        modernName: 'Tel Jezreel (Israel)',
        x: 46,
        y: 35,
        description: 'Residência real de inverno de Acabe. Onde ficava a vinha de Nabote, ilegalmente confiscada após seu assassinato por Jezabel, o que atraiu a profecia de condenação da dinastia real.',
        passages: ['1 Reis 21:1-29', '2 Reis 9:30-37'],
        characters: ['Acabe', 'Jezabel', 'Nabote', 'Jeú'],
        books: ['1 Reis', '2 Reis']
      }
    ],
    routes: [
      {
        id: 'fronteira-dividida',
        name: 'Divisão de Territórios (Norte vs Sul)',
        color: '#7c3aed',
        path: [
          { x: 35, y: 32 }, // Carmelo
          { x: 46, y: 35 }, // Jezreel
          { x: 46, y: 44 }, // Samaria
          { x: 47, y: 53 }, // Betel
          { x: 48, y: 58 }  // Jerusalém
        ]
      }
    ]
  },
  {
    id: 'imperios-mundiais',
    title: 'Impérios do Antigo Testamento',
    period: 'Aprox. 745–60 a.C.',
    chronologyOrder: 7,
    description: 'A ascensão e queda dos impérios gentílicos: Assíria, Babilônia, Pérsia, Grécia e Roma. A sucessão histórica profetizada pela estátua de Daniel 2 e as feras de Daniel 7.',
    theologicalContext: 'Deus rege o trono dos reis pagãos para executar juízo e preservar o Seu povo, pavimentando de forma perfeita a geopolítica mundial para o advento de Jesus Cristo.',
    viewBox: '0 0 800 500',
    points: [
      {
        id: 'im-ninive',
        name: 'Nínive (Assíria)',
        modernName: 'Mosul (Iraque)',
        x: 65,
        y: 28,
        description: 'Centro do Império Assírio, a "cidade sanguinária". Executou o juízo divino exilando o Reino de Israel em 722 a.C., sendo destruída em 612 a.C. após as advertências de Naum.',
        passages: ['Jonas 3:1-10', 'Naum 1-3', '2 Reis 17:5-6'],
        characters: ['Jonas', 'Naum', 'Senaqueribe'],
        books: ['Jonas', 'Naum', '2 Reis']
      },
      {
        id: 'im-babilonia',
        name: 'Babilônia (Babilônico)',
        modernName: 'Al-Hillah (Iraque)',
        x: 72,
        y: 42,
        description: 'Cabeça de ouro da estátua de Daniel. Sob Nabucodonosor, devastou Jerusalém, levou Judá para o exílio de 70 anos e serviu de palco para o testemunho heróico de Daniel.',
        passages: ['2 Reis 24-25', 'Daniel 1-4', 'Jeremias 25:11-12'],
        characters: ['Nabucodonosor', 'Daniel', 'Ezequiel', 'Sidraque', 'Misaque', 'Abede-Nego'],
        books: ['Daniel', '2 Reis', 'Jeremias', 'Ezequiel']
      },
      {
        id: 'im-susa',
        name: 'Susa (Persa)',
        modernName: 'Shush (Irã)',
        x: 82,
        y: 44,
        description: 'Centro administrativo do Império Medo-Persa (peito e braços de prata). Palco do livramento de Ester, e do comissionamento de Neemias para reconstruir as muralhas de Jerusalém.',
        passages: ['Ester 1:1', 'Neemias 1:1', 'Daniel 8:2'],
        characters: ['Ester', 'Mordecai', 'Neemias', 'Artaxerxes', 'Daniel'],
        books: ['Ester', 'Neemias', 'Daniel']
      },
      {
        id: 'im-atenas',
        name: 'Atenas (Grego)',
        modernName: 'Atenas (Grécia)',
        x: 28,
        y: 30,
        description: 'Metrópole da civilização grega (ventre e coxas de bronze) sob Alexandre, o Grande, que espalhou a cultura helenista e a língua do Novo Testamento por todo o Oriente.',
        passages: ['Daniel 8:5-8', 'Atos 17:16-34'],
        characters: ['Paulo', 'Alexandre o Grande'],
        books: ['Daniel', 'Atos']
      },
      {
        id: 'im-roma',
        name: 'Roma (Romano)',
        modernName: 'Roma (Itália)',
        x: 10,
        y: 18,
        description: 'Poderoso império de ferro e barro. Estabeleceu a "Pax Romana" e a infraestrutura de estradas, servindo de palco para o nascimento, crucificação de Cristo e expansão apostólica.',
        passages: ['Lucas 2:1', 'Lucas 3:1', 'Atos 28:16-31'],
        characters: ['Augusto', 'Tibério', 'Pilatos', 'Paulo'],
        books: ['Lucas', 'Atos', 'Romanos']
      },
      {
        id: 'im-jerusalem',
        name: 'Jerusalém',
        modernName: 'Jerusalém',
        x: 52,
        y: 55,
        description: 'O epicentro do conflito e redenção, subjugado sucessivamente por babilônios, persas, gregos e romanos, mas sempre o centro do desígnio profético do Cordeiro.',
        passages: ['2 Reis 25:9', 'Esdras 1:1-4', 'Lucas 19:41-44'],
        characters: ['Daniel', 'Esdras', 'Jesus'],
        books: ['Daniel', 'Esdras', 'Lucas']
      }
    ],
    routes: [
      {
        id: 'sucessao-imperios',
        name: 'Caminho Imperial do Oriente ao Ocidente',
        color: '#db2777',
        path: [
          { x: 82, y: 44 }, // Susa (Pérsia)
          { x: 72, y: 42 }, // Babilônia
          { x: 65, y: 28 }, // Nínive (Assíria)
          { x: 52, y: 55 }, // Jerusalém
          { x: 28, y: 30 }, // Atenas (Grécia)
          { x: 10, y: 18 }  // Roma (Itália)
        ]
      }
    ]
  },
  {
    id: 'ministerio-jesus',
    title: 'Ministério de Jesus',
    period: 'Aprox. 4 a.C. – 30 d.C.',
    chronologyOrder: 8,
    description: 'A caminhada santa do Verbo Encarnado na Terra Santa, cruzando os limites da Galileia, Samaria e Judeia para proclamar a chegada do Reino.',
    theologicalContext: 'Cristo cumpre cirurgicamente as antigas demarcações geográficas descritas nas profecias (Miqueias 5:2, Isaías 9:1-2), validando Sua missão divina e salvando pecadores.',
    viewBox: '0 0 500 800',
    points: [
      {
        id: 'nazare',
        name: 'Nazaré',
        modernName: 'Nazaré (Israel)',
        x: 45,
        y: 28,
        description: 'Lugar humilde da Galileia onde Jesus cresceu em sabedoria, estatura e graça perante Deus e os homens, e onde foi rejeitado no início do Seu ministério.',
        passages: ['Lucas 2:39-40', 'Lucas 4:16-30', 'Mateus 2:23'],
        characters: ['Jesus', 'Maria', 'José'],
        books: ['Mateus', 'Lucas']
      },
      {
        id: 'cafarnaum',
        name: 'Cafarnaum',
        modernName: 'Kfar Nahum (Israel)',
        x: 55,
        y: 18,
        description: 'Sede e quartel-general de Jesus na Galileia. Cidade pesqueira à beira-mar de onde chamou Seus discípulos principais e efetuou prodígios e sermões indeléveis.',
        passages: ['Mateus 4:13', 'Marcos 1:21-28', 'Marcos 2:1-12', 'João 6:59'],
        characters: ['Jesus', 'Pedro', 'André', 'Tiago', 'João', 'Mateus'],
        books: ['Mateus', 'Marcos', 'João']
      },
      {
        id: 'belem',
        name: 'Belém da Judeia',
        modernName: 'Beit Lahm (Palestina)',
        x: 48,
        y: 72,
        description: 'Cidade de origem de Davi, onde o Filho de Deus nasceu na carne, em cumprimento à profecia exata escrita pelo profeta Miqueias.',
        passages: ['Mateus 2:1-6', 'Lucas 2:4-7', 'Miqueias 5:2'],
        characters: ['Jesus', 'Maria', 'José', 'Sábios do Oriente', 'Pastores'],
        books: ['Mateus', 'Lucas']
      },
      {
        id: 'jerusalem',
        name: 'Jerusalém',
        modernName: 'Jerusalém',
        x: 48,
        y: 65,
        description: 'Lugar do sacrifício supremo. Onde Jesus entrou montado em jumento, foi julgado, açoitado, crucificado no Calvário e sepultado, e de onde ressurgiu ao terceiro dia.',
        passages: ['Mateus 21:1-11', 'Mateus 26-28', 'Lucas 24:1-12', 'João 19-20'],
        characters: ['Jesus', 'Pedro', 'Pilatos', 'Caifás', 'Maria Madalena'],
        books: ['Mateus', 'Marcos', 'Lucas', 'João']
      },
      {
        id: 'cana',
        name: 'Caná da Galileia',
        modernName: 'Kafr Kanna (Israel)',
        x: 47,
        y: 24,
        description: 'Pequeno vilarejo da Galileia onde Jesus manifestou publicamente Sua glória divina pela primeira vez, transformando água em vinho num casamento.',
        passages: ['João 2:1-11', 'João 4:46-54'],
        characters: ['Jesus', 'Maria'],
        books: ['João']
      },
      {
        id: 'sicar',
        name: 'Sicar (Samaria)',
        modernName: 'Askar (Palestina)',
        x: 46,
        y: 45,
        description: 'Cidade samaritana junto ao poço de Jacó, onde Jesus quebrou barreiras culturais ao revelar Sua identidade como o Messias de forma amorosa a uma mulher sedenta por salvação.',
        passages: ['João 4:4-42'],
        characters: ['Jesus', 'Mulher Samaritana'],
        books: ['João']
      },
      {
        id: 'jerico-j',
        name: 'Jericó',
        modernName: 'Jericó (Cisjordânia)',
        x: 54,
        y: 60,
        description: 'Cidade sob o nível do mar onde Jesus curou o cego Bartimeu e hospedou-se de surpresa na casa do publicano cobrador de impostos Zaqueu, trazendo salvação.',
        passages: ['Lucas 18:35-43', 'Lucas 19:1-10'],
        characters: ['Jesus', 'Zaqueu', 'Bartimeu'],
        books: ['Lucas']
      },
      {
        id: 'cesareia-filipe',
        name: 'Cesareia de Filipe',
        modernName: 'Banias (Norte de Israel)',
        x: 58,
        y: 10,
        description: 'Aos pés do Monte Hermom. Ponto geográfico onde Pedro fez a histórica confissão guiada pelo Espírito: "Tu és o Cristo, o Filho do Deus vivo".',
        passages: ['Mateus 16:13-20', 'Marcos 8:27-30'],
        characters: ['Jesus', 'Pedro'],
        books: ['Mateus', 'Marcos']
      }
    ],
    routes: [
      {
        id: 'caminho-messianico',
        name: 'O Caminho Redentor de Jesus',
        color: '#0284c7',
        path: [
          { x: 58, y: 10 }, // Cesareia de Filipe
          { x: 55, y: 18 }, // Cafarnaum
          { x: 47, y: 24 }, // Caná
          { x: 45, y: 28 }, // Nazaré
          { x: 46, y: 45 }, // Sicar
          { x: 54, y: 60 }, // Jericó
          { x: 48, y: 65 }, // Jerusalém
          { x: 48, y: 72 }  // Belém
        ]
      }
    ]
  },
  {
    id: 'viagens-paulo',
    title: 'Viagens de Paulo',
    period: 'Século I (Aprox. 46–60 d.C.)',
    chronologyOrder: 9,
    description: 'A impressionante expansão global do Evangelho pelo Império Romano através dos exaustivos e guiados itinerários apostólicos efetuados pelo Apóstolo Paulo.',
    theologicalContext: 'O Espírito Santo conduz as barreiras de nações para a entrada do Evangelho aos gentios, mostrando que a Igreja avança soberanamente sob tribulações, naufrágios e prisões.',
    viewBox: '0 0 900 500',
    points: [
      {
        id: 'pa-antioquia',
        name: 'Antioquia da Síria',
        modernName: 'Antakya (Turquia)',
        x: 82,
        y: 65,
        description: 'Centro missionário vibrante que comissionou Paulo e Barnabé. Primeiro local onde os crentes em Jesus foram chamados de "cristãos".',
        passages: ['Atos 11:19-26', 'Atos 13:1-3', 'Atos 15:35-41'],
        characters: ['Paulo', 'Barnabé', 'Silas'],
        books: ['Atos', 'Gálatas']
      },
      {
        id: 'pa-tarso',
        name: 'Tarso',
        modernName: 'Tarsus (Turquia)',
        x: 75,
        y: 55,
        description: 'Cidade de nascimento e cidadania romana de Paulo, proeminente centro cultural de filosofia e educação da Cilícia.',
        passages: ['Atos 9:11', 'Atos 21:39', 'Atos 22:3'],
        characters: ['Paulo'],
        books: ['Atos']
      },
      {
        id: 'pa-derbe',
        name: 'Derbe',
        modernName: 'Kerti Huyuk (Turquia)',
        x: 70,
        y: 58,
        description: 'Cidade na Galácia meridional onde Paulo e Barnabé pregaram e ganharam grande quantidade de discípulos de forma vitoriosa.',
        passages: ['Atos 14:6-7', 'Atos 14:20-21'],
        characters: ['Paulo', 'Barnabé'],
        books: ['Atos']
      },
      {
        id: 'pa-listra',
        name: 'Listra',
        modernName: 'Hatunsaray (Turquia)',
        x: 67,
        y: 55,
        description: 'Onde Paulo curou um coxo e foi aclamado como deus pagão antes de ser apedrejado quase até a morte. Berço espiritual do jovem e fiel obreiro Timóteo.',
        passages: ['Atos 14:8-20', 'Atos 16:1-3', '2 Timóteo 3:10-11'],
        characters: ['Paulo', 'Barnabé', 'Timóteo'],
        books: ['Atos', '2 Timóteo']
      },
      {
        id: 'pa-icono',
        name: 'Icônio',
        modernName: 'Konya (Turquia)',
        x: 66,
        y: 51,
        description: 'Cidade na província da Galácia de onde Paulo e Barnabé fugiram após um complô armado para apedrejá-los por causa do evangelho.',
        passages: ['Atos 14:1-6', 'Atos 15:36'],
        characters: ['Paulo', 'Barnabé'],
        books: ['Atos']
      },
      {
        id: 'pa-efeso',
        name: 'Éfeso',
        modernName: 'Selçuk (Turquia)',
        x: 52,
        y: 42,
        description: 'A metrópole pagã do templo de Diana. Ali Paulo plantou uma comunidade de amadurecimento profundo, permanecendo por 3 anos ensinando diariamente na Escola de Tirano.',
        passages: ['Atos 19:1-41', 'Atos 20:17-38', 'Efésios 1:1-2'],
        characters: ['Paulo', 'Priscila', 'Áquila', 'Apolo', 'Timóteo'],
        books: ['Atos', 'Efésios', '1 Timóteo']
      },
      {
        id: 'pa-filipos',
        name: 'Filipos',
        modernName: 'Filippoi (Grécia)',
        x: 38,
        y: 22,
        description: 'Posto militar e romano na Macedônia. Palco da conversão de Lídia e do carcereiro de Filipos na prisão à meia-noite sob louvores.',
        passages: ['Atos 16:11-40', 'Filipenses 1:1-5'],
        characters: ['Paulo', 'Silas', 'Lídia', 'Timóteo'],
        books: ['Atos', 'Filipenses']
      },
      {
        id: 'pa-tessalonica',
        name: 'Tessalônica',
        modernName: 'Thessaloniki (Grécia)',
        x: 35,
        y: 24,
        description: 'Capital de província onde a ousada pregação de Paulo causou grande tumulto de opositores que os acusaram de perturbar o império.',
        passages: ['Atos 17:1-9', '1 Tessalonicenses 1:1-4'],
        characters: ['Paulo', 'Silas', 'Jasão'],
        books: ['Atos', '1 Tessalonicenses', '2 Tessalonicenses']
      },
      {
        id: 'pa-corinto',
        name: 'Corinto',
        modernName: 'Korinthos (Grécia)',
        x: 34,
        y: 48,
        description: 'Polo comercial e portuário agitado e imoral. Paulo trabalhou fazendo tendas por dezoito meses, auxiliado por Priscila e Áquila, sendo comissionado em visão a não temer.',
        passages: ['Atos 18:1-18', '1 Coríntios 1-2'],
        characters: ['Paulo', 'Áquila', 'Priscila', 'Galião', 'Timóteo'],
        books: ['Atos', '1 Coríntios', '2 Coríntios']
      },
      {
        id: 'pa-atenas',
        name: 'Atenas',
        modernName: 'Atenas (Grécia)',
        x: 35,
        y: 45,
        description: 'Berço intelectual grego. Paulo, tocado pela idolatria, debateu com estóicos e epicuristas no Areópago sobre o "Deus Desconhecido" ressurreto.',
        passages: ['Atos 17:16-34'],
        characters: ['Paulo', 'Dionísio', 'Dâmaris'],
        books: ['Atos']
      },
      {
        id: 'pa-roma',
        name: 'Roma',
        modernName: 'Roma (Itália)',
        x: 10,
        y: 18,
        description: 'Destino imperial e final da parusia. Paulo chegou acorrentado, pregou de sua casa sob custódia aos líderes locais e foi martirizado, cumprindo o chamado soberano.',
        passages: ['Atos 28:16-31', 'Romanos 1:15', '2 Timóteo 4:6-8'],
        characters: ['Paulo', 'Lucas'],
        books: ['Atos', 'Romanos', '2 Timóteo']
      }
    ],
    routes: [
      {
        id: 'viagem-roma',
        name: 'Viagem de Paulo a Roma',
        color: '#7c3aed',
        path: [
          { x: 82, y: 65 }, // Antioquia
          { x: 75, y: 55 }, // Tarso
          { x: 52, y: 42 }, // Éfeso
          { x: 35, y: 45 }, // Atenas
          { x: 34, y: 48 }, // Corinto
          { x: 10, y: 18 }  // Roma
        ]
      }
    ]
  },
  {
    id: 'mundo-nt',
    title: 'Mundo do Novo Testamento',
    period: 'Século I d.C. (Aprox. 30–100 d.C.)',
    chronologyOrder: 10,
    description: 'A dimensão geopolítica do Império Romano Mediterrâneo onde as igrejas locais apostólicas floresceram e os manuscritos do Novo Testamento foram remetidos.',
    theologicalContext: 'A infraestrutura comum do império serviu de meio providencial para o florescimento rápido e inabalável da fé no Único e Soberano Senhor.',
    viewBox: '0 0 900 500',
    points: [
      {
        id: 'nt-roma',
        name: 'Roma',
        modernName: 'Roma (Itália)',
        x: 10,
        y: 18,
        description: 'Centro político do império, local das terríveis perseguições de Nero mas também da propagação vitoriosa do evangelho até as altas autoridades.',
        passages: ['Romanos 1:7', 'Romanos 16', 'Atos 28:14'],
        characters: ['Paulo', 'Pedro', 'Nero'],
        books: ['Romanos', 'Atos']
      },
      {
        id: 'nt-corinto',
        name: 'Corinto',
        modernName: 'Korinthos (Grécia)',
        x: 34,
        y: 48,
        description: 'Polo mercantil e eclesiológico estratégico grego, e eiva de extensas correspondências corretivas de Paulo acerca dos dons e ressurreição.',
        passages: ['1 Coríntios 1:2', '2 Coríntios 1:1'],
        characters: ['Paulo', 'Timóteo', 'Priscila', 'Áquila'],
        books: ['1 Coríntios', '2 Coríntios']
      },
      {
        id: 'nt-efeso',
        name: 'Éfeso',
        modernName: 'Selçuk (Turquia)',
        x: 52,
        y: 42,
        description: 'Base eclesial proeminente gerida por Paulo, Timóteo e posteriormente João, destinatária do Apocalipse e um dos centros da patrística primitiva.',
        passages: ['Efésios 1:1', '1 Timóteo 1:3', 'Apocalipse 2:1-7'],
        characters: ['Paulo', 'Timóteo', 'João'],
        books: ['Efésios', '1 Timóteo', 'Apocalipse']
      },
      {
        id: 'nt-antioquia',
        name: 'Antioquia da Síria',
        modernName: 'Antakya (Turquia)',
        x: 82,
        y: 65,
        description: 'Primeira igreja genuinamente multiétnica e enviadora de missionários gentílicos na Ásia.',
        passages: ['Atos 11:20-26', 'Atos 13:1-3'],
        characters: ['Barnabé', 'Paulo', 'Simeão'],
        books: ['Atos']
      },
      {
        id: 'nt-damasco',
        name: 'Damasco',
        modernName: 'Damasco (Síria)',
        x: 86,
        y: 72,
        description: 'Palco do milagre da conversão de Saulo de Tarso no caminho por uma intensa visão de Cristo glorificado.',
        passages: ['Atos 9:1-22', 'Gálatas 1:17'],
        characters: ['Paulo', 'Ananias'],
        books: ['Atos', 'Gálatas']
      },
      {
        id: 'nt-jerusalem',
        name: 'Jerusalém',
        modernName: 'Jerusalém',
        x: 87,
        y: 80,
        description: 'Berço da igreja primitiva, local do Pentecostes, das primeiras pregações de Pedro e do Concílio de Jerusalém em Atos 15.',
        passages: ['Atos 2:1-4', 'Atos 15:1-35', 'Gálatas 1:18'],
        characters: ['Pedro', 'João', 'Tiago', 'Estêvão', 'Paulo'],
        books: ['Atos', 'Gálatas']
      },
      {
        id: 'nt-alexandria',
        name: 'Alexandria',
        modernName: 'Alexandria (Egito)',
        x: 74,
        y: 92,
        description: 'Grande capital científica do Egito helenístico. Berço do erudito e preguador bíblico Apolo, e local da confecção da Septuaginta.',
        passages: ['Atos 18:24-26', 'Atos 27:6'],
        characters: ['Apolo', 'Áquila', 'Priscila'],
        books: ['Atos']
      },
      {
        id: 'nt-patmos',
        name: 'Ilha de Patmos',
        modernName: 'Patmos (Grécia)',
        x: 50,
        y: 46,
        description: 'Pequena e rochosa ilha grega no Mar Egeu para onde João foi exilado sob o reinado de Domiciano, servindo de santuário para as visões do Apocalipse.',
        passages: ['Apocalipse 1:9-11'],
        characters: ['João', 'Jesus'],
        books: ['Apocalipse']
      }
    ],
    routes: [
      {
        id: 'mundo-igreja',
        name: 'Eixo de Comunidade Apostólica',
        color: '#10b981',
        path: [
          { x: 10, y: 18 }, // Roma
          { x: 34, y: 48 }, // Corinto
          { x: 50, y: 46 }, // Patmos
          { x: 52, y: 42 }, // Éfeso
          { x: 82, y: 65 }, // Antioquia
          { x: 86, y: 72 }, // Damasco
          { x: 87, y: 80 }  // Jerusalém
        ]
      }
    ]
  }
];
