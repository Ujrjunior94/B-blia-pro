import { BIBLE_JOURNEY_STUDIES } from './bibleJourneyData';

export interface QuickBookSummary {
  author: string;
  period: string;
  centralTheme: string;
  keyWord: string;
  summary: string;
  christConnection?: string;
  keyVerse?: string;
}

export const BOOK_QUICK_SUMMARIES: Record<string, QuickBookSummary> = {
  // Antigo Testamento - Pentateuco
  GEN: {
    author: 'Moisés',
    period: 'Aprox. 1440–1400 a.C.',
    centralTheme: 'As Origens da Criação, a Queda e o Início da Aliança da Redenção',
    keyWord: 'Princípio / Aliança',
    summary: 'Gênesis é o alicerce da revelação bíblica. Narra a criação do cosmos, a entrada do pecado, e a escolha soberana dos patriarcas (Abraão, Isaque, Jacó e José) para abençoar a humanidade.',
    christConnection: 'Cristo é a Semente da mulher que esmaga a serpente (Gn 3:15) e o cordeiro providenciado no Monte Moriá.',
    keyVerse: 'Gênesis 3:15'
  },
  EXO: {
    author: 'Moisés',
    period: 'Aprox. 1440–1400 a.C.',
    centralTheme: 'A Redenção da Escravidão, a Lei no Sinai e a Glória Divina no Tabernáculo',
    keyWord: 'Libertação / Tabernáculo',
    summary: 'Êxodo registra o resgate miraculoso de Israel da opressão no Egito, a entrega dos Dez Mandamentos e o estabelecimento do santuário onde Deus habita no meio do Seu povo.',
    christConnection: 'Jesus é o Cordeiro Pascal libertador e o verdadeiro Tabernáculo encarnado.',
    keyVerse: 'Êxodo 6:6-7'
  },
  LEV: {
    author: 'Moisés',
    period: 'Aprox. 1440 a.C.',
    centralTheme: 'A Santidade de Deus, o Sistema de Sacrifícios e o Chamado à Purificação',
    keyWord: 'Santidade / Expiação',
    summary: 'Levítico estabelece como um povo imperfeito pode se aproximar do Deus Santo através dos sacrifícios sacerdotais, das leis de pureza e do Dia da Expiação (Yom Kippur).',
    christConnection: 'Cristo é o Sumo Sacerdote Perfeito e a oferta viva que perdoa definitivamente todo pecado.',
    keyVerse: 'Levítico 11:44'
  },
  NUM: {
    author: 'Moisés',
    period: 'Aprox. 1440–1400 a.C.',
    centralTheme: 'A Peregrinação no Deserto, a Incredulidade e a Fidelidade de Deus',
    keyWord: 'Peregrinação / Fé',
    summary: 'Números contrasta a rebeldia da geração de Israel durante os 40 anos no deserto com a fidelidade inabalável de Deus em guiar e suprir Seu povo até a Terra Prometida.',
    christConnection: 'Jesus é a Serpente de Bronze erguida na cruz para curar todo aquele que crê.',
    keyVerse: 'Números 14:22-23'
  },
  DEU: {
    author: 'Moisés',
    period: 'Aprox. 1406 a.C.',
    centralTheme: 'A Renovação da Aliança, o Amor e a Obediência de Coração',
    keyWord: 'Lembrar / Amar',
    summary: 'Deuteronômio reúne os discursos de despedida de Moisés à nova geração antes de entrar em Canaã, enfatizando o amor a Deus com todo o coração (Shema Israel).',
    christConnection: 'Jesus é o Profeta maior do que Moisés cujas palavras trazem a verdadeira vida.',
    keyVerse: 'Deuteronômio 6:4-5'
  },

  // Antigo Testamento - Históricos
  JOS: {
    author: 'Josué (tradicional)',
    period: 'Aprox. 1400–1370 a.C.',
    centralTheme: 'A Conquista da Terra Prometida e o Cumprimento das Promessas de Deus',
    keyWord: 'Conquista / Herança',
    summary: 'Josué relata a travessia do Jordão, a queda de Jericó e a divisão de Canaã entre as doze tribos, demonstrando que nenhuma palavra de Deus falha.',
    christConnection: 'Josué (cujo nome significa "O SENHOR é Salvação") prefigura Jesus como Capitão da nossa salvação.',
    keyVerse: 'Josué 1:9'
  },
  JDG: {
    author: 'Samuel (tradicional)',
    period: 'Aprox. 1050–1000 a.C.',
    centralTheme: 'O Ciclo de Apostasia, Opressão, Arrependimento e Libertação pelos Juízes',
    keyWord: 'Libertadores / Ciclos',
    summary: 'Juízes descreve o período sombrio em que "cada um fazia o que parecia reto aos seus olhos", mostrando a misericórdia de Deus ao levantar libertadores como Gideão e Sansão.',
    christConnection: 'Jesus é o Libertador Supremo que nos resgata do ciclo destrutivo do pecado.',
    keyVerse: 'Juízes 21:25'
  },
  RUT: {
    author: 'Samuel (tradicional)',
    period: 'Aprox. 1000 a.C.',
    centralTheme: 'A Redenção da Família, a Providência Divina e a Linhagem do Rei Davi',
    keyWord: 'Redentor / Lealdade',
    summary: 'Uma belíssima narrativa de amor, lealdade e providência onde Rute, uma moabita, é acolhida por Boaz e inserida na linhagem real do Messias.',
    christConnection: 'Boaz atua como o parente-remidor, apontando para Cristo, nosso Redentor celestial.',
    keyVerse: 'Rute 1:16-17'
  },
  '1SA': {
    author: 'Samuel, Gade e Natã',
    period: 'Aprox. 1100–1010 a.C.',
    centralTheme: 'A Transição da Teocracia para a Monarquia e a Escolha de Davi',
    keyWord: 'Rei / Coração',
    summary: 'Registra o ministério de Samuel, o reinado falho do rei Saul e a unção de Davi, o homem segundo o coração de Deus.',
    christConnection: 'Davi ungido é o protótipo de Cristo, o Ungido de Deus para sempre.',
    keyVerse: '1 Samuel 16:7'
  },
  '2SA': {
    author: 'Gade e Natã',
    period: 'Aprox. 1010–970 a.C.',
    centralTheme: 'O Reinado de Davi, a Aliança Davídica e a Graça de Deus',
    keyWord: 'Reinado / Aliança',
    summary: 'Foca no reinado de Davi em Jerusalém, o estabelecimento do pacto de um trono eterno e o triunfo do perdão de Deus após a tragédia do pecado.',
    christConnection: 'A promessa de um trono eterno se cumpre perfeitamente no Reinado de Jesus Cristo.',
    keyVerse: '2 Samuel 7:12-13'
  },
  '1KI': {
    author: 'Jeremias (tradicional)',
    period: 'Aprox. 970–850 a.C.',
    centralTheme: 'A Glória do Templo de Salomão, a Divisão do Reino e o Ministério de Elias',
    keyWord: 'Sabedoria / Divisão',
    summary: 'Descreve o ápice do reinado de Salomão, a divisão de Israel nos reinos do Norte e do Sul, e o confronto profético de Elias contra o baalismo.',
    christConnection: 'Jesus é o Rei mais sábio do que Salomão e o construtor do Templo Vivo.',
    keyVerse: '1 Reis 8:23'
  },
  '2KI': {
    author: 'Jeremias (tradicional)',
    period: 'Aprox. 850–560 a.C.',
    centralTheme: 'A Declínio Espiritual dos Reinos, os Milagres de Eliseu e o Cativeiro',
    keyWord: 'Juício / Exílio',
    summary: 'Narra a queda do Reino do Norte (Assíria) e a ruína e destruição de Jerusalém com o cativeiro na Babilônia devido ao abandono da Aliança.',
    christConnection: 'Os milagres de Eliseu prefiguram a compaixão e o ministério restaurador de Jesus.',
    keyVerse: '2 Reis 17:13'
  },
  '1CH': {
    author: 'Esdras (tradicional)',
    period: 'Aprox. 450 a.C.',
    centralTheme: 'A Genealogia da Aliança, a Adoração e a Preparação para o Templo por Davi',
    keyWord: 'Genealogia / Adoração',
    summary: 'Escrito pós-exílio para relembrar a comunidade restaurada da linhagem davídica e da centralidade da adoração espiritual no Templo.',
    christConnection: 'Reafirma a genealogia inquebrável que conduz ao nascimento de Cristo.',
    keyVerse: '1 Crônicas 16:28-29'
  },
  '2CH': {
    author: 'Esdras (tradicional)',
    period: 'Aprox. 450 a.C.',
    centralTheme: 'A História dos Reis de Judá, as Reformas Espirituais e a Restauração',
    keyWord: 'Reavivamento / Oração',
    summary: 'Foca no reino de Judá, nos reavivamentos espirituais sob reis tementes (como Ezequias e Josias) e no decreto de Ciro que permite o retorno a Jerusalém.',
    christConnection: 'O Templo reconstruído aponta para a habitação definitiva de Deus conosco em Cristo.',
    keyVerse: '2 Crônicas 7:14'
  },
  EZR: {
    author: 'Esdras',
    period: 'Aprox. 538–450 a.C.',
    centralTheme: 'O Retorno do Exílio e a Reconstrução do Templo em Jerusalém',
    keyWord: 'Restauração / Palavra',
    summary: 'Narra a volta dos exilados babilônicos sob Zorobabel e Esdras, reconstruindo o Templo e reensinando a Lei do Senhor ao povo.',
    christConnection: 'Esdras, o escriba dedicado, aponta para Cristo instruindo-nos no caminho da verdade.',
    keyVerse: 'Esdras 7:10'
  },
  NEH: {
    author: 'Neemias',
    period: 'Aprox. 445–420 a.C.',
    centralTheme: 'A Reconstrução dos Muros de Jerusalém e a Renovação Comunitária',
    keyWord: 'Reconstrução / Oração',
    summary: 'Relata a liderança admirável de Neemias na reconstrução dos muros em apenas 52 dias, combinando oração incessante, planejamento e reformas morais.',
    christConnection: 'Neemias demonstra a compaixão de Cristo em edificar o que estava destruído.',
    keyVerse: 'Neemias 8:10'
  },
  EST: {
    author: 'Mardoqueu (tradicional)',
    period: 'Aprox. 483–473 a.C.',
    centralTheme: 'A Providência Soberana de Deus Preservando Seu Povo da Exterminação',
    keyWord: 'Providência / Preservação',
    summary: 'Embora o nome de Deus não apareça explicitamente, Sua mão protetora orquestra os eventos na Pérsia elevando Ester a rainha para salvar os judeus.',
    christConnection: 'Ester arriscou sua vida para interceder por seu povo, antecipando nossa salvação por Cristo.',
    keyVerse: 'Ester 4:14'
  },

  // Antigo Testamento - Poéticos e Sabedoria
  JOB: {
    author: 'Desconhecido (Jó / Moisés)',
    period: 'Era Patriarcal (Aprox. 2000–1800 a.C.)',
    centralTheme: 'O Sofrimento do Justo, a Soberania Divina e a Confiança Suprema',
    keyWord: 'Redentor / Soberania',
    summary: 'Aborda o mistério da dor humana. Jó perde tudo, contesta com seus amigos, e encontra consolo não em respostas filosóficas, mas na revelação da majestade de Deus.',
    christConnection: 'Jó clama: "Eu sei que o meu Redentor vive" — profetizando o Cristo vivo (Jó 19:25).',
    keyVerse: 'Jó 19:25'
  },
  PSA: {
    author: 'Davi, Asafe, Corá, Salomão, Moisés e outros',
    period: 'Aprox. 1400–450 a.C.',
    centralTheme: 'A Adoração Sincera, o Clamor na Dor e o Reinado do Messias',
    keyWord: 'Louvor / Confiança',
    summary: 'O hinário inspirado da Bíblia contendo 150 salmos de louvor, oração, lamentação, confissão e profecias profundas sobre o Rei Messiânico.',
    christConnection: 'Jesus é o Bom Pastor (Sl 23), o Rei Sofredor (Sl 22) e a Pedra Angular (Sl 118).',
    keyVerse: 'Salmos 23:1'
  },
  PRO: {
    author: 'Salomão, Agur e Lemuel',
    period: 'Aprox. 950–700 a.C.',
    centralTheme: 'A Sabedoria Prática Fundamentada no Temor do Senhor',
    keyWord: 'Sabedoria / Temor',
    summary: 'Manual de instrução moral e espiritual com máximas proverbiais para o trabalho, casamento, finanças, controle da língua e integridade.',
    christConnection: 'Cristo é a própria Sabedoria de Deus encarnada (1Co 1:30).',
    keyVerse: 'Provérbios 1:7'
  },
  ECC: {
    author: 'Salomão (O Pregador)',
    period: 'Aprox. 935 a.C.',
    centralTheme: 'A Vaidade do Mundo sem Deus e o Significado Verdadeiro da Vida',
    keyWord: 'Sentido / Temor',
    summary: 'Reflexão filosófica sobre as limitações dos prazeres, riquezas e realizações "debaixo do sol", concluindo que temer a Deus é o dever de todo homem.',
    christConnection: 'Jesus sacia o vazio da alma humana oferecendo água de vida eterna.',
    keyVerse: 'Eclesiastes 12:13'
  },
  SNG: {
    author: 'Salomão',
    period: 'Aprox. 960 a.C.',
    centralTheme: 'A Beleza do Amor Conjugal e a Paixão em Relacionamentos Sagrados',
    keyWord: 'Amor / União',
    summary: 'Poema lírico celebrado pela beleza do afeto conjugal entre o noivo e a noiva, simbolizando também o amor zeloso de Deus por Seu povo.',
    christConnection: 'Espelha o amor sacrificial de Cristo por Sua Igreja, Sua Noiva amada.',
    keyVerse: 'Cântico dos Cânticos 8:7'
  },

  // Antigo Testamento - Profetas Maiores
  ISA: {
    author: 'Isaías',
    period: 'Aprox. 740–680 a.C.',
    centralTheme: 'A Santidade de Deus, o Juízo e o Servo Sofredor',
    keyWord: 'Santo de Israel / Salvação',
    summary: 'Conhecido como "O Evangelho do Antigo Testamento". Contém denúncias sublimes sobre a falta de fé e visões translúcidas da Paixão do Messias (Is 53).',
    christConnection: 'Jesus é o Emanuel (Is 7:14), o Maravilhoso Conselheiro (Is 9:6) e o Servo Sofredor (Is 53).',
    keyVerse: 'Isaías 53:5'
  },
  JER: {
    author: 'Jeremias',
    period: 'Aprox. 627–586 a.C.',
    centralTheme: 'O Juízo sobre a Idolatria e a Promessa da Nova Aliança',
    keyWord: 'Nova Aliança / Arrependimento',
    summary: 'O profeta chorão adverte Judá por 40 anos com grande paixão, assiste à queda de Jerusalém e anuncia o pacto transformador gravado nos corações.',
    christConnection: 'Jesus instituiu na ceia a Nova Aliança profetizada por Jeremias (Jr 31:31).',
    keyVerse: 'Jeremias 31:33'
  },
  LAM: {
    author: 'Jeremias',
    period: 'Aprox. 586 a.C.',
    centralTheme: 'O Duelo pela Destruição de Jerusalém e as Misericórdias de Deus',
    keyWord: 'Lamentação / Fidelidade',
    summary: 'Cinco poemas acrósticos de profunda dor pela ruína de Sião, que resplandecem a esperança nas misericórdias do Senhor que se renovam a cada manhã.',
    christConnection: 'A dor de Jeremias sobre a cidade reflete o choro de Jesus sobre Jerusalém.',
    keyVerse: 'Lamentações 3:22-23'
  },
  EZK: {
    author: 'Ezequiel',
    period: 'Aprox. 593–571 a.C.',
    centralTheme: 'A Glória de Deus no Exílio, o Juízo e a Visão da Restauração',
    keyWord: 'Glória / Restauração',
    summary: 'O profeta sacerdote às margens do rio Quebar recebe visões celestiais dramáticas da glória divina, o vale dos ossos secos renascendo e o Templo futuro.',
    christConnection: 'Jesus é o Bom Pastor e a Fonte de Água Viva profetizada por Ezequiel.',
    keyVerse: 'Ezequiel 36:26'
  },
  DAN: {
    author: 'Daniel',
    period: 'Aprox. 605–536 a.C.',
    centralTheme: 'A Soberania Absoluta de Deus sobre os Impérios e o Reino Eterno',
    keyWord: 'Soberania / Reino Eterno',
    summary: 'Registra a fidelidade dos jovens hebreus na Babilônia (como na cova dos leões) e revela visões proféticas impressionantes do Reino dos Céus suplantando impérios.',
    christConnection: 'Jesus identifica a Si mesmo como o "Filho do Homem" vindo nas nuvens (Dn 7:13).',
    keyVerse: 'Daniel 2:44'
  },

  // Antigo Testamento - Profetas Menores
  HOS: {
    author: 'Oséias',
    period: 'Aprox. 755–715 a.C.',
    centralTheme: 'O Amor Incondicional de Deus por um Povo Espiritualmente Infiel',
    keyWord: 'Amor Leal / Redenção',
    summary: 'Deus ordena que Oséias se case com Gomer para ilustrar plasticamente o amor perseverante do Senhor ao resgatar Israel de seus adultérios espirituais.',
    christConnection: 'Cristo busca e ama Sua Igreja mesmo quando resgatada do pecado.',
    keyVerse: 'Oséias 6:6'
  },
  JOL: {
    author: 'Joel',
    period: 'Aprox. 835–796 a.C.',
    centralTheme: 'O Dia do Senhor, o Arrependimento e o Derramamento do Espírito',
    keyWord: 'Dia do Senhor / Espírito',
    summary: 'A partir de uma praga de gafanhotos, Joel profetiza o terrível Dia do Senhor e o glorioso derramamento do Espírito Santo sobre toda a carne.',
    christConnection: 'A profecia de Joel se cumpre no dia de Pentecostes no envio do Espírito Santo (At 2).',
    keyVerse: 'Joel 2:28-29'
  },
  AMO: {
    author: 'Amós',
    period: 'Aprox. 760–750 a.C.',
    centralTheme: 'A Justiça Social, a Retidão no Culto e o Juízo sobre a Hipocrisia',
    keyWord: 'Justiça / Equidade',
    summary: 'Um boiadeiro de Tecoa denuncia com indignação sagrada os ricos opressores de Samaria que praticavam cultos religiosos vazios enquanto exploravam os pobres.',
    christConnection: 'Jesus encarna a perfeita justiça social e moral exigida pelo Pai.',
    keyVerse: 'Amós 5:24'
  },
  OBA: {
    author: 'Obadias',
    period: 'Aprox. 586 a.C.',
    centralTheme: 'O Juízo sobre Edom pelo Orgulho e Opressão a Israel',
    keyWord: 'Orgulho / Juízo',
    summary: 'O livro mais curto do Antigo Testamento anuncia a queda dos edomitas (descendentes de Esaú) por se alegrarem com a ruína de Jerusalém.',
    christConnection: 'Demonstra que o Reino pertencerá soberanamente ao Senhor.',
    keyVerse: 'Obadias 1:21'
  },
  JON: {
    author: 'Jonas',
    period: 'Aprox. 785–760 a.C.',
    centralTheme: 'A Misericórdia de Deus para com Todas as Nações e a Compaixão',
    keyWord: 'Graça / Compaixão',
    summary: 'O profeta fujão tenta escapar de pregar em Nínive, é engolido por um grande peixe e aprende que a compaixão de Deus se estende até aos inimigos.',
    christConnection: 'Três dias nas entranhas do peixe é o "sinal de Jonas" apontando a sepultura e ressurreição de Cristo (Mt 12:40).',
    keyVerse: 'Jonas 4:2'
  },
  MIC: {
    author: 'Miquéias',
    period: 'Aprox. 735–700 a.C.',
    centralTheme: 'A Exigência de Praticar a Justiça, Amar a Misericórdia e o Nascimento do Messias em Belém',
    keyWord: 'Justiça / Belém',
    summary: 'Denuncia a corrupção em Jerusalém, promete o perdão aos arrependidos e profetiza com precisão que o Rei Messias nasceria em Belém de Efrata.',
    christConnection: 'Profetiza explicitamente a cidade natal do Messias em Belém (Mq 5:2).',
    keyVerse: 'Miquéias 6:8'
  },
  NAM: {
    author: 'Naum',
    period: 'Aprox. 663–612 a.C.',
    centralTheme: 'O Juízo Solene sobre Nínive e o Refúgio para os Fiéis',
    keyWord: 'Juízo / Refúgio',
    summary: 'Anuncia a ruína inevitável do Império Assírio pela sua crueldade e idolatria, confortando os fiéis que Deus é o refúgio seguro no dia da angústia.',
    christConnection: 'Deus traz boas-novas de libertação aos Seus servos.',
    keyVerse: 'Naum 1:7'
  },
  HAB: {
    author: 'Habacuc',
    period: 'Aprox. 612–589 a.C.',
    centralTheme: 'O Justo Viverá da Fé em Meio à Perplexidade Teológica',
    keyWord: 'Fé / Confiança',
    summary: 'Um diálogo sincero onde Habacuc questiona a Deus sobre a injustiça em Judá e o uso dos caldeus como juízo, terminando em um hino memorável de fé inabalável.',
    christConnection: 'A declaração "o justo viverá da fé" é a espinha dorsal do Evangelho citado por Paulo (Rm 1:17).',
    keyVerse: 'Habacuc 2:4'
  },
  ZEP: {
    author: 'Sofonias',
    period: 'Aprox. 640–621 a.C.',
    centralTheme: 'A Purificação pelo Dia do Senhor e o Cântico de Alegria de Deus',
    keyWord: 'Purificação / Alegria Divina',
    summary: 'Adverte sobre o Dia do Senhor purificando a terra, prometendo a salvação a um remanescente humilde sobre quem Deus Se alegrará com cânticos.',
    christConnection: 'Jesus é o Rei de Israel que afasta os nossos juízos (Sf 3:15).',
    keyVerse: 'Sofonias 3:17'
  },
  HAG: {
    author: 'Ageu',
    period: 'Aprox. 520 a.C.',
    centralTheme: 'A Prioridade de Reconstruir a Casa de Deus e a Glória Vindoura',
    keyWord: 'Prioridades / Glória',
    summary: 'Exorta com vigor os exilados retornados a pararem de cuidar apenas de suas casas luxuosas e terminarem a reconstrução do Templo do Senhor.',
    christConnection: 'A glória da segunda casa seria maior por causa da presença física de Jesus no Templo.',
    keyVerse: 'Ageu 2:9'
  },
  ZEC: {
    author: 'Zacarias',
    period: 'Aprox. 520–480 a.C.',
    centralTheme: 'Visões Proféticas do Rei Messias Humilde e Triunfante',
    keyWord: 'Messias / Esperança',
    summary: 'Profeta pós-exílio que recebe 8 visões noturnas encorajadoras e revela muitos detalhes da primeira e segunda vinda do Messias.',
    christConnection: 'Profetiza a entrada humilde de Jesus montado num jumentinho (Zc 9:9) e as 30 moedas de prata (Zc 11:12).',
    keyVerse: 'Zacarias 9:9'
  },
  MAL: {
    author: 'Malaquias',
    period: 'Aprox. 430 a.C.',
    centralTheme: 'O Chamado à Fidelidade no Culto, Família e Dízimo e a Vinda do Mensageiro',
    keyWord: 'Fidelidade / Sol da Justiça',
    summary: 'O último profeta do Antigo Testamento confronta o sacerdócio insensível e anuncia o envio de João Batista preparando o caminho para o Sol da Justiça.',
    christConnection: 'Jesus é o Sol da Justiça que traz salvação e cura nas Suas asas (Ml 4:2).',
    keyVerse: 'Malaquias 3:1'
  },

  // Novo Testamento - Evangelhos
  MAT: {
    author: 'Mateus (Levi)',
    period: 'Aprox. 60–70 d.C.',
    centralTheme: 'Jesus como o Rei Messias que Cumpre as Profecias e Estabelece o Reino',
    keyWord: 'Reino dos Céus / Cumprimento',
    summary: 'Escrito primariamente para os judeus, demonstra detalhadamente como Jesus é o Filho de Davi prometido, trazendo o Sermão do Monte e a Grande Comissão.',
    christConnection: 'Jesus é o Emanuel e o Rei da linhagem de Davi.',
    keyVerse: 'Mateus 16:16'
  },
  MRK: {
    author: 'João Marcos',
    period: 'Aprox. 55–65 d.C.',
    centralTheme: 'Jesus como o Servo Sofredor Dinâmico que Veio para Servir e Dar a Vida',
    keyWord: 'Imediatamente / Servo',
    summary: 'O Evangelho mais rápido e conciso. Foca nas ações poderosas, milagres e sacrifício de Jesus como o Servo de Deus que atrai a humanidade.',
    christConnection: 'Jesus é o Filho do Homem que veio não para ser servido, mas para servir.',
    keyVerse: 'Marcos 10:45'
  },
  LUK: {
    author: 'Lucas (O Médico Amado)',
    period: 'Aprox. 60–62 d.C.',
    centralTheme: 'Jesus como o Salvador Perfeito e Compassivo de Toda a Humanidade',
    keyWord: 'Filho do Homem / Compaixão',
    summary: 'Com apuro histórico meticuloso, Lucas retrata a simpatia de Jesus pelos pobres, mulheres, pecadores e samaritanos, trazendo parábolas inesquecíveis como a do Filho Pródigo.',
    christConnection: 'Jesus é o Filho do Homem que veio buscar e salvar o que se havia perdido.',
    keyVerse: 'Lucas 19:10'
  },
  JHN: {
    author: 'Apóstolo João',
    period: 'Aprox. 85–95 d.C.',
    centralTheme: 'Jesus como o Filho de Deus Encarnado, o Verbo da Vida e o Caminho',
    keyWord: 'Crer / Vida Eterna',
    summary: 'Evangelho teológico e íntimo destacando as 7 declarações "EU SOU" e os milagres como sinais para que creiamos que Jesus é o Cristo, Filho de Deus.',
    christConnection: 'Jesus é o Verbo feito carne (Jo 1:14), o Pão da Vida, a Luz do Mundo e o Bom Pastor.',
    keyVerse: 'João 20:31'
  },

  // Novo Testamento - Histórico
  ACT: {
    author: 'Lucas',
    period: 'Aprox. 62–64 d.C.',
    centralTheme: 'A Expansão da Igreja pelo Poder do Espírito Santo de Jerusalém a Roma',
    keyWord: 'Espírito Santo / Testemunhas',
    summary: 'Continuação do Evangelho de Lucas. Registra o nascimento da Igreja em Pentecostes, a coragem de Pedro e Estêvão, a conversão de Paulo e as viagens missionárias.',
    christConnection: 'Jesus ressuscitado reina no céu e capacita a Igreja através do Espírito Santo.',
    keyVerse: 'Atos 1:8'
  },

  // Novo Testamento - Cartas Paulinas
  ROM: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 57 d.C.',
    centralTheme: 'A Justificação pela Fé Somente na Graça e o Poder do Evangelho',
    keyWord: 'Justiça / Fé / Graça',
    summary: 'A obra-prima teológica do Novo Testamento. Explica a culpa universal do homem, o perdão imputado em Cristo, a santificação no Espírito e a vida cristã prática.',
    christConnection: 'Jesus é nossa propiciação e o Segundo Adão que nos traz justificativa de vida.',
    keyVerse: 'Romanos 1:16-17'
  },
  '1CO': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 55 d.C.',
    centralTheme: 'A Unidade no Corpo de Cristo, a Pureza Moral e o Supremo Amor',
    keyWord: 'Unidade / Amor / Cruz',
    summary: 'Paulo responde a problemas sérios na igreja de Corinto: divisões, imoralidade, litígios, uso dos dons espirituais e a esperança inabalável da Ressurreição (cap. 15).',
    christConnection: 'Jesus é o poder e a sabedoria de Deus e as primícias da ressurreição.',
    keyVerse: '1 Coríntios 13:13'
  },
  '2CO': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 56 d.C.',
    centralTheme: 'O Ministério da Reconciliação, a Força na Fraqueza e a Graça de Dar',
    keyWord: 'Reconciliação / Fraqueza',
    summary: 'Carta pessoal e comovedora onde Paulo abre o coração sobre os seus sofrimentos, defendendo o verdadeiro ministério apostólico baseado na força de Deus aperfeiçoada na fraqueza.',
    christConnection: 'Jesus Se fez pobre por amor a nós para que nos tornássemos ricos na Sua graça.',
    keyVerse: '2 Coríntios 12:9'
  },
  GAL: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 48–49 d.C.',
    centralTheme: 'A Liberdade Cristã da Lei e a Caminhada no Fruto do Espírito',
    keyWord: 'Liberdade / Graça / Espírito',
    summary: 'A carta da liberdade cristã. Ataca veementemente o legalismo judaizante que exigia a circuncisão para a salvação, ensinando que somos salvos exclusivamente pela fé.',
    christConnection: 'Cristo nos resgatou da maldição da Lei tornando Se maldição em nosso lugar.',
    keyVerse: 'Gálatas 5:1'
  },
  EPH: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 60–62 d.C.',
    centralTheme: 'A Riqueza da Igreja em Cristo, a Unidade Espiritual e a Armadura de Deus',
    keyWord: 'Em Cristo / Igreja',
    summary: 'Revela o plano eterno de Deus para unir judeus e gentios num só Corpo glorioso em Cristo, detalhando as bênçãos celestiais e o combate espiritual.',
    christConnection: 'Jesus é a Cabeça da Igreja e a nossa paz que derrubou a parede de separação.',
    keyVerse: 'Efésios 2:8-9'
  },
  PHP: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 61–62 d.C.',
    centralTheme: 'A Alegria Inabalável no Senhor e a Humildade de Cristo',
    keyWord: 'Alegria / Humildade',
    summary: 'Escrita da prisão romana com transbordante gratidão e alegria. Apresenta o célebre poema da kenosis (humilhação e exaltação de Cristo) e o segredo do contentamento.',
    christConnection: 'Jesus é o modelo supremo de humildade que Se esvaziou a Si mesmo até à morte de cruz.',
    keyVerse: 'Filipenses 4:4'
  },
  COL: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 60–62 d.C.',
    centralTheme: 'A Supremacia Absoluta e Suficiência de Cristo sobre Todas as Coisas',
    keyWord: 'Supremacia / Plenitude',
    summary: 'Combate heresias que misturavam filosofia e ascetismo, proclamando que em Cristo habita corporalmente toda a plenitude da divindade.',
    christConnection: 'Jesus é a imagem do Deus invisível, o primogênito de toda a criação.',
    keyVerse: 'Colossenses 1:18'
  },
  '1TH': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 51 d.C.',
    centralTheme: 'A Esperança da Segunda Vinda de Cristo e a Vida de Santificação',
    keyWord: 'Volta de Cristo / Santidade',
    summary: 'Encoraja os jovens cristãos de Tessalônica a viverem de modo santo e alerta sobre o glorioso retorno do Senhor para arrebatar Sua Igreja.',
    christConnection: 'Jesus é o Senhor que descenderá do céu com alarido e voz de arcanjo.',
    keyVerse: '1 Tessalonicenses 4:16-17'
  },
  '2TH': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 51–52 d.C.',
    centralTheme: 'A Perseverança nas Tribulações e o Alerta contra Falsos Ensinos',
    keyWord: 'Perseverança / Dia do Senhor',
    summary: 'Esclarece mal-entendidos sobre o Dia do Senhor, advertindo sobre a manifestação do homem da iniquidade e incentivando o trabalho honesto.',
    christConnection: 'Jesus virá em labaredas de fogo para fazer justiça e ser glorificado nos Seus santos.',
    keyVerse: '2 Tessalonicenses 3:3'
  },
  '1TI': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 62–64 d.C.',
    centralTheme: 'A Liderança Pastoral, a Sã Doutrina e a Ordem na Igreja',
    keyWord: 'Fé Guardada / Liderança',
    summary: 'Instruções pastorais de Paulo a seu filho na fé Timóteo sobre a conduta na Casa de Deus, os qualificadores de bispos/diáconos e o combate a falsos mestres.',
    christConnection: 'Jesus é o único Mediador entre Deus e os homens.',
    keyVerse: '1 Timóteo 2:5'
  },
  '2TI': {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 66–67 d.C.',
    centralTheme: 'A Fidelidade ao Evangelho diante das Provações e a Palavra de Deus',
    keyWord: 'Combater o Bom Combate / Escritura',
    summary: 'O testamento final de Paulo prestes a ser martirizado no cárcere mamertino em Roma. Exorta a pregar a Palavra a tempo e fora de tempo.',
    christConnection: 'Jesus é o Justo Juiz que dará a coroa da justiça a todos os que amam a Sua vinda.',
    keyVerse: '2 Timóteo 4:7-8'
  },
  TIT: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 62–64 d.C.',
    centralTheme: 'A Organização de Igrejas Saudáveis e o Zelo por Boas Obras',
    keyWord: 'Boas Obras / Sã Doutrina',
    summary: 'Orienta Tito a consagrar presbíteros na ilha de Creta e ensina que a graça de Deus nos adestra a viver de forma sóbria, justa e piedosa.',
    christConnection: 'Jesus é o nosso Grande Deus e Salvador que nos remiu para sermos um povo zeloso de boas obras.',
    keyVerse: 'Tito 2:11-12'
  },
  PHM: {
    author: 'Apóstolo Paulo',
    period: 'Aprox. 60–62 d.C.',
    centralTheme: 'O Perdão, a Reconciliação Fraterna e o Amor em Ação',
    keyWord: 'Perdão / Fraternidade',
    summary: 'Paulo escreve a Filemom pedindo que acolha de volta o escravo fugitivo Onésimo não mais como escravo, mas como um irmão amado em Cristo.',
    christConnection: 'Paulo assumindo a dívida de Onésimo espelha Cristo pagando a nossa dívida na cruz.',
    keyVerse: 'Filemom 1:16'
  },

  // Novo Testamento - Cartas Gerais
  HEB: {
    author: 'Desconhecido (Paulo, Apolo ou Barnabé)',
    period: 'Aprox. 64–68 d.C.',
    centralTheme: 'A Superioridade Absoluta de Cristo e da Nova Aliança',
    keyWord: 'Melhor / Fé / Sacerdote',
    summary: 'Demostra aos cristãos hebreus tentados a voltar ao judaísmo que Jesus é superior aos anjos, a Moisés, a Josué e ao sacerdócio antigo.',
    christConnection: 'Jesus é o Sumo Sacerdote segundo a ordem de Melquisedeque que rasgou o véu.',
    keyVerse: 'Hebreus 12:2'
  },
  JAS: {
    author: 'Tiago (Irmão do Senhor)',
    period: 'Aprox. 45–48 d.C.',
    centralTheme: 'A Fé Viva Demonstrada por Obras Práticas no Cotidiano',
    keyWord: 'Fé Prática / Obras',
    summary: 'Um dos escritos mais antigos do Novo Testamento. Ensina com sabedoria límpida sobre o controle da língua, o cuidado com os órfãos e a fé que atua pelo amor.',
    christConnection: 'Jesus é o Senhor da Glória cuja palavra implantada salva as nossas almas.',
    keyVerse: 'Tiago 2:17'
  },
  '1PE': {
    author: 'Apóstolo Pedro',
    period: 'Aprox. 62–64 d.C.',
    centralTheme: 'A Esperança Viva e a Fidelidade em Meio ao Sofrimento',
    keyWord: 'Esperança Viva / Graça',
    summary: 'Dirigida aos "peregrinos da dispersão" sofrendo perseguição. Encoraja a manter uma conduta exemplar e a olhar para o exemplo de Cristo.',
    christConnection: 'Jesus é a Pedra Viva rejeitada e o Pastor e Bispo das nossas almas.',
    keyVerse: '1 Pedro 1:3'
  },
  '2PE': {
    author: 'Apóstolo Pedro',
    period: 'Aprox. 65–68 d.C.',
    centralTheme: 'O Crescimento na Graça e o Alerta contra Falsos Mestres',
    keyWord: 'Conhecimento / Alerta',
    summary: 'Última exortação de Pedro advertindo contra os zombadores dos últimos dias, reafirmando a certeza da promessa dos Novos Céus e Nova Terra.',
    christConnection: 'Jesus é a Estrela da Alva que desponta em nossos corações.',
    keyVerse: '2 Pedro 3:18'
  },
  '1JN': {
    author: 'Apóstolo João',
    period: 'Aprox. 85–95 d.C.',
    centralTheme: 'A Certeza da Vida Eterna, o Amor Fraterno e a Comunhão',
    keyWord: 'Deus é Amor / Luz',
    summary: 'Escrita para dar convicção de salvação aos crentes. Define que Deus é Luz e Amor, e que quem ama a Deus ama necessariamente seu irmão.',
    christConnection: 'Jesus é o nosso Advogado junto ao Pai e a propiciação pelos nossos pecados.',
    keyVerse: '1 João 5:13'
  },
  '2JN': {
    author: 'Apóstolo João',
    period: 'Aprox. 85–95 d.C.',
    centralTheme: 'Andar na Verdade e no Amor Guardando-se de Enganadores',
    keyWord: 'Verdade / Amor',
    summary: 'Pequena carta dirigida à "senhora eleita", alertando contra falsos mestres que negavam a vinda de Jesus em carne.',
    christConnection: 'Guardar os mandamentos de Jesus é a prova suprema de amor.',
    keyVerse: '2 João 1:6'
  },
  '3JN': {
    author: 'Apóstolo João',
    period: 'Aprox. 85–95 d.C.',
    centralTheme: 'A Hospitalidade Cristã e a Cooperação com a Verdade',
    keyWord: 'Hospitalidade / Verdade',
    summary: 'Elogia o fiel Gaio pela sua acolhida aos missionários itinerantes e censura o orgulhoso Diótrefes que gostava de primar.',
    christConnection: 'Cuidar dos servos de Cristo é cooperar diretamente com o Seu Reino.',
    keyVerse: '3 João 1:4'
  },
  JUD: {
    author: 'Judas (Irmão de Tiago)',
    period: 'Aprox. 65–80 d.C.',
    centralTheme: 'Batalhar Pela Fé e Guardar-se dos Falsos Ensinos',
    keyWord: 'Batalhar pela Fé / Guardados',
    summary: 'Exorta os crentes a lutarem zelosamente pela fé entregue aos santos, concluindo com uma das mais belas doxologias da Bíblia.',
    christConnection: 'Jesus é Aquele que é poderoso para nos guardar de tropeçar e nos apresentar irrepreensíveis.',
    keyVerse: 'Judas 1:24-25'
  },

  // Novo Testamento - Revelação
  REV: {
    author: 'Apóstolo João',
    period: 'Aprox. 95 d.C.',
    centralTheme: 'A Vitória Definitiva do Cordeiro Glorificado e a Nova Jerusalém',
    keyWord: 'O Cordeiro / Vitória',
    summary: 'A revelação apocalíptica de Jesus vitorioso. Consola a igreja perseguida mostrando o julgamento das forças do mal e o triunfo eterno dos Novos Céus e Nova Terra.',
    christConnection: 'Jesus é o Leão da Tribo de Judá, o Cordeiro de Deus, o Alfa e o Ômega e o Rei dos Reis.',
    keyVerse: 'Apocalipse 21:3-4'
  }
};

/**
 * Gets a quick summary (author, historical period, central theme, key word, summary text)
 * for any given Bible book ID (e.g., 'GEN', 'MAT', 'ROM').
 */
export function getQuickBookSummary(bookId: string): QuickBookSummary {
  const normalizedId = bookId.toUpperCase();
  
  // First check if detailed study guide has specific theme & author info
  if (BIBLE_JOURNEY_STUDIES[normalizedId]) {
    const study = BIBLE_JOURNEY_STUDIES[normalizedId];
    return {
      author: study.traditionalAuthor,
      period: study.historicalPeriod,
      centralTheme: study.centralTheme,
      keyWord: study.keyWord,
      summary: study.generalSummary,
      christConnection: study.ChristInTheBook,
      keyVerse: study.keyVerse,
    };
  }

  // Check our curated BOOK_QUICK_SUMMARIES map
  if (BOOK_QUICK_SUMMARIES[normalizedId]) {
    return BOOK_QUICK_SUMMARIES[normalizedId];
  }

  // Fallback for edge cases
  return {
    author: 'Autor inspirado pelo Espírito Santo',
    period: 'Período bíblico canônico',
    centralTheme: 'A revelação da graça e da aliança de Deus com Seu povo.',
    keyWord: 'Aliança / Fé / Salvação',
    summary: `O livro ${normalizedId} faz parte do cânon sagrado da Bíblia, revelando o plano de Deus para a redenção humana através da história.`,
    christConnection: 'Aponta para Jesus Cristo como a consumação da salvação divina.',
  };
}
