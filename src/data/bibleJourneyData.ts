import { BookStudyGuide } from '../types';

export const BIBLE_JOURNEY_STUDIES: Record<string, BookStudyGuide> = {
  GEN: {
    bookId: 'GEN',
    bookName: 'Gênesis',
    traditionalAuthor: 'Moisés',
    historicalPeriod: 'Aprox. 1440–1400 a.C. (Criação até o Século XVII a.C. na época de José)',
    nameMeaning: 'Do grego "Gênesis" = Origem, Nascimento, Princípio (Em hebraico "Bereshit" = No Princípio)',
    centralTheme: 'As Origens da Criação, a Queda da Humanidade e o Início da Aliança da Redenção',
    keyWord: 'Princípio / Aliança',
    keyVerse: 'Gênesis 3:15 & Gênesis 12:2-3',
    generalSummary:
      'Gênesis é o alicerce fundamental de toda a revelação bíblica. Divide-se em duas grandes partes: a História Primordial (caps. 1–11: Criação, Queda, Dilúvio e Torre de Babel) e a História Patriarcal (caps. 12–50: Abraão, Isaque, Jacó e José). Revela o Deus Todo-Poderoso criando um mundo perfeito, a tragédia da rebelião humana, e o plano gracioso de Deus para abençoar todas as famílias da terra através de uma descendência prometida.',
    mainCharacters: [
      { name: 'Adão e Eva', role: 'Primeiro casal', description: 'Criados à imagem de Deus para governar e desfrutar da criação; caíram na tentação da desobediência.' },
      { name: 'Noé', role: 'Homem justo', description: 'Andou com Deus no meio de uma geração corrompida e preservou a vida no arca sob a graça divina.' },
      { name: 'Abraão', role: 'Pai da fé', description: 'Chamado por Deus para deixar sua terra natal e receber a grande promessa da aliança.' },
      { name: 'Isaque', role: 'Filho da promessa', description: 'Herdeiro milagroso de Abraão e prenúncio do Filho oferecido em sacrifício.' },
      { name: 'Jacó (Israel)', role: 'Patriarca das 12 Tribos', description: 'Transformado por Deus de enganador a príncipe com Deus.' },
      { name: 'José', role: 'Preservador do povo', description: 'Vendido pelos irmãos, exaltado no Egito e instrumento de salvação no tempo da fome.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Gn 1–2', title: 'A Criação Majestosa', description: 'Deus cria o cosmos com ordem e beleza, culminando na humanidade à Sua imagem.' },
      { chapterRange: 'Gn 3–5', title: 'A Queda e Suas Consequências', description: 'A entrada do pecado, a promessa da Semente e o primeiro homicídio (Caim e Abel).' },
      { chapterRange: 'Gn 6–11', title: 'O Dilúvio e Babel', description: 'O julgamento global do pecado, o pacto com Noé e a dispersão dos povos na Torre de Babel.' },
      { chapterRange: 'Gn 12–25', title: 'A Aliança com Abraão', description: 'O chamado da fé, as promessas da terra e descendência, e a provação do Moriá.' },
      { chapterRange: 'Gn 26–36', title: 'Isaque e Jacó', description: 'A continuidade da promessa e as lutas de Jacó até o encontro na Peniel.' },
      { chapterRange: 'Gn 37–50', title: 'A História de José no Egito', description: 'Providência soberana: a traição transformada em salvação para muitas vidas.' },
    ],
    theologicalPurposes: [
      'Estabelecer que Deus é o único Criador soberano de todas as coisas.',
      'Explicar a origem do pecado, da dor e da mortalidade no mundo humano.',
      'Revelar o início do plano da redenção graciosa de Deus por meio da Aliança.',
      'Demonstrar a providência divina que transforma o mal em bem para o Seu povo.',
    ],
    ChristInTheBook:
      'Gênesis aponta para Cristo de forma extraordinária: Ele é o Protoevangelho — a Semente da mulher que esmagaria a cabeça da serpente (Gn 3:15); a Arca de Noé que nos salva do julgamento; o Filho único de Abraão carregando a madeira para o sacrifício no Moriá (Gn 22); a Escada de Jacó conectando o céu e a terra (Gn 28); a Tribo de Judá da qual viria o Siló (Gn 49:10); e José, o servo injustamente rejeitado por seus irmãos que se tornou o salvador do mundo.',
    practicalApplication: [
      'Confie na palavra criadora de Deus para trazer ordem e esperança mesmo nos momentos de caos na sua vida.',
      'Aprenda com Abraão a andar por fé e não por vista, mesmo quando o cumprimento das promessas parecer demorar.',
      'Enxergue a soberania de Deus acima das injustiças e dores humanas: "Vocês pensaram em me fazer o mal, mas Deus o transformou em bem" (Gn 50:20).',
    ],
  },

  EXO: {
    bookId: 'EXO',
    bookName: 'Êxodo',
    traditionalAuthor: 'Moisés',
    historicalPeriod: 'Aprox. 1440–1400 a.C. (A libertação do Egito e a promulgação da Lei no Sinai)',
    nameMeaning: 'Do grego "Exodos" = Saída, Partida, Libertação',
    centralTheme: 'A Redenção do Cativeiro, a Revelação da Lei e a Habitação da Glória de Deus no Tabernáculo',
    keyWord: 'Libertação / Tabernáculo',
    keyVerse: 'Êxodo 6:6-7 & Êxodo 19:5-6',
    generalSummary:
      'Êxodo narra a libertação dramática dos israelitas da escravidão egípcia pelo poder de Deus, a promulgação dos Dez Mandamentos no Monte Sinai e a construção do Tabernáculo. Deus revela Seu nome YHWH a Moisés, demonstra Sua supremacia sobre os deuses do Egito através das dez pragas e conduz Seu povo através do Mar Vermelho para formar uma nação sacerdotal.',
    mainCharacters: [
      { name: 'Moisés', role: 'Libertador e mediador', description: 'Salvo das águas, chamado na sarça ardente e líder humilde do povo.' },
      { name: 'Arão', role: 'Primeiro Sumo Sacerdote', description: 'Irmão de Moisés e porta-voz perante Faraó.' },
      { name: 'Faraó', role: 'Rei opressor do Egito', description: 'Exemplo de coração endurecido contra o comando soberano de Deus.' },
      { name: 'Josué', role: 'Comandante e sucessor', description: 'Líder militar na batalha contra Amaleque e servo fiel de Moisés.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Êx 1–6', title: 'O Clamor e o Chamado de Moisés', description: 'A opressão no Egito e a revelação do Nome Divino na sarça ardente.' },
      { chapterRange: 'Êx 7–12', title: 'As Pragas e a Páscoa', description: 'Os juízos sobre os deuses do Egito e a celebração da noite de libertação pelo sangue do cordeiro.' },
      { chapterRange: 'Êx 13–18', title: 'A Travessia e a Jornada no Deserto', description: 'O milagre do Mar Vermelho, o maná do céu e a água da rocha.' },
      { chapterRange: 'Êx 19–24', title: 'A Aliança no Sinai e a Lei', description: 'Os Dez Mandamentos e o Código da Aliança entregues ao povo.' },
      { chapterRange: 'Êx 25–40', title: 'O Tabernáculo e a Glória', description: 'As instruções do santuário, o pecado do bezerro de ouro e a descida da Glória de Deus.' },
    ],
    theologicalPurposes: [
      'Revelar Deus como o Redentor libertador que ouve o clamor dos oprimidos.',
      'Constituir Israel como uma nação santa em aliança com Yahweh.',
      'Demonstrar que a adoração verdadeira exige pureza e obediência às instruções divinas.',
    ],
    ChristInTheBook:
      'Jesus é o verdadeiro e definitivo Cordeiro Pascal, cujo sangue nos livra da morte eterna (1Co 5:7). Ele é o Maná que desceu do céu para dar vida ao mundo (Jo 6) e a Rocha ferida da qual jorra a água viva (1Co 10:4). O Tabernáculo em cada detalhe é uma figura de Cristo habitando ("tabernaculando") entre nós (Jo 1:14), tornando-se o nosso perfeito Sumo Sacerdote e Sacrifício.',
    practicalApplication: [
      'Lembre-se de que Deus nos libertou do cativeiro do pecado para pertencermos a Ele e servirmos com alegria.',
      'Guarde os mandamentos divinos não para comprar a salvação, mas como resposta de amor a Quem já nos salvou.',
      'Confie na provisão diária de Deus no deserto das tribulações cotidianas.',
    ],
  },

  LEV: {
    bookId: 'LEV',
    bookName: 'Levítico',
    traditionalAuthor: 'Moisés',
    historicalPeriod: 'Aprox. 1440 a.C. (1 mês no acampamento ao pé do Monte Sinai)',
    nameMeaning: 'Referente aos Levitas (A tribo sacerdotal encarregada do culto)',
    centralTheme: 'A Santidade de Deus, o Sistema de Sacrifícios e o Apelo à Santificação do Povo',
    keyWord: 'Santidade / Expiação',
    keyVerse: 'Levítico 11:44 & Levítico 17:11',
    generalSummary:
      'Levítico responde à pergunta crucial: Como um Deus absolutamente santo pode habitar no meio de um povo pecador? O livro detalha os sacrifícios ritualísticos, a ordenação dos sacerdotes, as leis de pureza e o solene Dia da Expiação (Yom Kippur).',
    mainCharacters: [
      { name: 'Arão', role: 'Sumo Sacerdote', description: 'Consagrado para oferecer os sacrifícios e interceder pelo povo.' },
      { name: 'Nadabe e Abiú', role: 'Filhos de Arão', description: 'Sacerdotes que julgaram levianamente a santidade e ofereceram fogo estranho.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Lv 1–7', title: 'Os Cinco Sacrifícios Principais', description: 'Holocausto, Oferta de Cereais, Sacrifício de Paz, Oferta pelo Pecado e Oferta pela Culpa.' },
      { chapterRange: 'Lv 8–10', title: 'Sacerdócio e o Apelo ao Respeito', description: 'Consagração de Arão e o juízo severo sobre o fogo estranho.' },
      { chapterRange: 'Lv 11–15', title: 'Leyes de Pureza e Limpeza', description: 'Instruções sanitárias e rituais de purificação cotidiana.' },
      { chapterRange: 'Lv 16', title: 'O Dia da Expiação (Yom Kippur)', description: 'O ritual máximo de purificação dos pecados de toda a nação.' },
      { chapterRange: 'Lv 17–27', title: 'O Código de Santidade', description: 'A vida de santidade moral, familiar, social e os feasts anuais.' },
    ],
    theologicalPurposes: [
      'Demonstrar a gravidade do pecado diante de um Deus infinitamente santo.',
      'Prover o único caminho divinamente ordenado de expiação e reconciliação.',
      'Ensinar que a salvação gera um estilo de vida moralmente distinto do mundo.',
    ],
    ChristInTheBook:
      'Cristo cumpre com perfeição cada oferta de Levítico. Ele é a vítima sem mácula que substitui o pecador e o Cordeiro pascal cujo sangue entra no santuário celestial. No Yom Kippur, Jesus é tanto o Sumo Sacerdote que oferece o sacrifício definitivo quanto o Bode Expiatório que leva para longe todos os nossos pecados (Hb 9–10).',
    practicalApplication: [
      'Busque a santidade em todos os aspectos da vida diária, pois Deus é santo.',
      'Agradeça profundamente o sacrifício consumado de Jesus que rasgou o véu e nos deu livre acesso ao Trono da Graça.',
    ],
  },

  NUM: {
    bookId: 'NUM',
    bookName: 'Números',
    traditionalAuthor: 'Moisés',
    historicalPeriod: 'Aprox. 1440–1400 a.C. (38 anos e 9 meses de peregrinação no deserto)',
    nameMeaning: 'Do grego "Arithmoi" = Contagens/Recenseamentos (Em hebraico "Bamidbar" = No Deserto)',
    centralTheme: 'A Peregrinação no Deserto, as Consequências da Incredulidade e a Fidelidade Sustentadora de Deus',
    keyWord: 'Peregrinação / Murmuração',
    keyVerse: 'Números 14:22-23 & Números 20:12',
    generalSummary:
      'Números contrasta a rebeldia do ser humano com a paciência e fidelidade de Deus. Começa com a organização militar do povo no Sinai, relata a trágica recusa de entrar na Terra Prometida por medo dos gigantes, e narra os 40 anos de peregrinação até a chegada às planícies de Moabe com a nova geração.',
    mainCharacters: [
      { name: 'Moisés e Arão', role: 'Líderes', description: 'Servos que enfrentaram repetidas rebeliões do povo.' },
      { name: 'Josué e Calebe', role: 'Espias fiéis', description: 'Os dois únicos espias que mantiveram a fé no poder de Deus para conquistar a terra.' },
      { name: 'Balaão', role: 'Profeta ganancioso', description: 'Contratado para amaldiçoar Israel, mas constrangido por Deus a abençoar.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Nm 1–10', title: 'Preparação e Recenseamento no Sinai', description: 'A organização das tribos ao redor do Tabernáculo.' },
      { chapterRange: 'Nm 11–14', title: 'Murmurações e a Crise em Cades-Barnéia', description: 'A recusa do povo em crer na promessa e a sentença da peregrinação.' },
      { chapterRange: 'Nm 15–20', title: 'Anos de Deserto e Rebeliões', description: 'A revolta de Corá, a vara de Arão que floresceu e a água da rocha de Meribá.' },
      { chapterRange: 'Nm 21–36', title: 'Rumo à Terra e a Segunda Geração', description: 'A serpente de bronze, as profecias de Balaão e o novo recenseamento.' },
    ],
    theologicalPurposes: [
      'Advertir severamente contra a murmuração e a falta de fé nas promessas divinas.',
      'Revelar que Deus disciplina Seu povo, mas jamais abandona Sua aliança.',
    ],
    ChristInTheBook:
      'A serpente de bronze levantada no poste para curar quem olhasse com fé é uma figura direta de Cristo crucificado na cruz para salvar quem Nele crê (Jo 3:14-15). Jesus é também a Rocha que nos segue e a Estrela de Jacó profetizada por Balaão (Nm 24:17).',
    practicalApplication: [
      'Substitua a murmuração por ações de graças diárias.',
      'Mantenha os olhos na promessa de Deus, sem se intimidar pelos gigantes de dificuldades.',
    ],
  },

  DEU: {
    bookId: 'DEUTERONÔMIO',
    bookName: 'Deuteronômio',
    traditionalAuthor: 'Moisés',
    historicalPeriod: 'Aprox. 1406 a.C. (Últimas semanas da vida de Moisés em Moabe)',
    nameMeaning: 'Do grego "Deuteronomion" = Segunda Lei / Repetição da Lei',
    centralTheme: 'A Renovação da Aliança, o Apelo ao Amor e à Obediência de Coração antes da Conquista',
    keyWord: 'Lembrar / Amar / Obedecer',
    keyVerse: 'Deuteronômio 6:4-5 & Deuteronômio 30:19-20',
    generalSummary:
      'Deuteronômio consiste nos discursos de despedida emocionais e pastorais de Moisés à nova geração de Israel prestes a atravessar o Jordão. Ele recapitula as maravilhas de Deus no deserto, reacende o compromisso com a Lei (contendo o grande Shema Israel) e coloca diante do povo a escolha vital entre a bênção e a maldição.',
    mainCharacters: [
      { name: 'Moisés', role: 'Sábio legislador', description: 'Entrega suas últimas palavras e abençoa as tribos antes de subir ao Monte Nebo.' },
      { name: 'Josué', role: 'Comandante encarregado', description: 'Confirmado por Deus para liderar a conquista.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Dt 1–4', title: 'Primeiro Discurso: A Fidelidade no Passado', description: 'Recapitulando a jornada desde Horebe.' },
      { chapterRange: 'Dt 5–26', title: 'Segundo Discurso: A Exposição da Lei', description: 'O Shema Israel (Dt 6:4-5) e os mandamentos para a nova terra.' },
      { chapterRange: 'Dt 27–30', title: 'Terceiro Discurso: Bênção ou Maldição', description: 'A escolha solene entre a vida e a morte.' },
      { chapterRange: 'Dt 31–34', title: 'Últimos Atos de Moisés', description: 'O cântico de Moisés, as bênçãos finais e sua morte no Monte Nebo.' },
    ],
    theologicalPurposes: [
      'Ensinar que a obediência a Deus nasce do amor de um coração transformado.',
      'Instruir sobre a responsabilidade de transmitir a fé de geração em geração.',
    ],
    ChristInTheBook:
      'Moisés profetiza a vinda de um Profeta semelhante a ele, a quem o povo deveria ouvir — uma profecia cumprida perfeitamente em Jesus Cristo (Dt 18:15; At 3:22). Foi de Deuteronômio que Jesus citou três vezes ao derrotar a tentação de Satanás no deserto (Mt 4).',
    practicalApplication: [
      'Ame ao Senhor seu Deus de todo o seu coração, de toda a sua alma e de todas as suas forças.',
      'Ensine as verdades da Palavra de Deus diligentemente aos seus filhos no cotidiano.',
    ],
  },

  PSA: {
    bookId: 'PSA',
    bookName: 'Salmos',
    traditionalAuthor: 'Davi, Asafe, Filhos de Corá, Salomão, Moisés, Etã e Autores Anônimos',
    historicalPeriod: 'Aprox. 1400 a.C. a 450 a.C. (Cerca de 1000 anos de composição hino-poética)',
    nameMeaning: 'Do grego "Psalmoi" = Cânticos Acompanhados de Instrumentos (Em hebraico "Tehillim" = Louvores)',
    centralTheme: 'A Adoração Sincera do Coração Humano, o Clamor na Dor, a Majestade de Deus e o Reinado Messiânico',
    keyWord: 'Louvor / Confiança / Oração',
    keyVerse: 'Salmos 23:1 & Salmos 150:6',
    generalSummary:
      'O livro de Salmos é o hinário e livro de orações inspirado da Bíblia. Compreende 150 poemas líricos divididos em cinco livros que espelham o Pentateuco. Expressa toda a gama de emoções humanas — desde o êxtase da gratidão até o abismo da lamentação e desespero — conduzindo sempre a alma à confiança soberana em Deus.',
    mainCharacters: [
      { name: 'Davi', role: 'O Doce Salmista de Israel', description: 'Autor de pelo menos 73 salmos; homem segundo o coração de Deus.' },
      { name: 'Asafe e Filhos de Corá', role: 'Músicos do Templo', description: 'Líderes de louvor e autores de poesias profundas sobre a glória de Deus.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Livro I (Sl 1–41)', title: 'Guerra e Libertação', description: 'Dominado por salmos individuais de Davi.' },
      { chapterRange: 'Livro II (Sl 42–72)', title: 'A Redenção do Rei', description: 'Clamores em tempos de perseguição e o salmo de Salomão.' },
      { chapterRange: 'Livro III (Sl 73–89)', title: 'A Crise Nacional e o Templo', description: 'Reflexões sobre a justiça divina e o exílio.' },
      { chapterRange: 'Livro IV (Sl 90–106)', title: 'O SENHOR Reina', description: 'A temporalidade humana em contraste com a eternidade de Deus.' },
      { chapterRange: 'Livro V (Sl 107–150)', title: 'Consumação e Louvor Universal', description: 'Salmos de Peregrinação (Degraus) e a doxologia final.' },
    ],
    theologicalPurposes: [
      'Prover modelos inspirados de oração, louvor, confissão e lamentação para o povo de Deus.',
      'Revelar o caráter gracioso, justo e majestoso do SENHOR soberano sobre o cosmos.',
    ],
    ChristInTheBook:
      'Salmos é o livro do Antigo Testamento mais citado no Novo Testamento sobre a pessoa de Cristo. Ele é o Pastor do Salmo 23, o Rei Sofredor do Salmo 22 cujas vestes são sorteadas, o Sacerdote Eterno segundo a ordem de Melquisedeque (Sl 110), a Pedra Angular rejeitada pelos edificadores (Sl 118:22) e o Rei Messiânico Glorioso (Sl 2 e 45).',
    practicalApplication: [
      'Derrama seu coração diante de Deus com honestidade total em momentos de dor ou alegria.',
      'Transforme a leitura dos Salmos em sua oração pessoal diária.',
    ],
  },

  PRO: {
    bookId: 'PRO',
    bookName: 'Provérbios',
    traditionalAuthor: 'Salomão, com contribuições de Agur e Lemuel',
    historicalPeriod: 'Aprox. 950–700 a.C.',
    nameMeaning: 'Do hebraico "Mishlei" = Sentenças Comparativas, Parábolas ou Provérbios de Sabedoria Prática',
    centralTheme: 'A Sabedoria Prática Fundamentada no Temor do SENHOR para Todas as Esferas da Vida',
    keyWord: 'Sabedoria / Temor do SENHOR',
    keyVerse: 'Provérbios 1:7 & Provérbios 3:5-6',
    generalSummary:
      'Provérbios é um guia prático para viver com sabedoria, discernimento e retidão no mundo de Deus. Contrasta o caminho do sábio com o caminho do tolo em áreas cotidianas como trabalho, finanças, casamento, palavras, relacionamentos e domínio próprio.',
    mainCharacters: [
      { name: 'A Senhora Sabedoria', role: 'Personificação divina', description: 'A sabedoria apresentada como um presente precioso que chama nas praças.' },
      { name: 'O Tolo e o Preguiçoso', role: 'Advertências vivas', description: 'Modelos de vidas negligentes e rebeldes às instruções.' },
      { name: 'A Mulher Virtuosa (Pr 31)', role: 'Modelo de Sabedoria Aplicada', description: 'Exemplo de diligência, bondade, sabedoria e temor a Deus.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Pr 1–9', title: 'Exortações à Sabedoria', description: 'Discursos de um pai a seu filho sobre o valor supremo da sabedoria.' },
      { chapterRange: 'Pr 10–24', title: 'Provérbios de Salomão', description: 'Máximas antitéticas de aplicação prática no dia a dia.' },
      { chapterRange: 'Pr 25–29', title: 'Provérbios Compilados por Ezequias', description: 'Instruções para governantes e cidadãos.' },
      { chapterRange: 'Pr 30–31', title: 'Palavras de Agur e Lemuel', description: 'A oração equilibrada e o poema da mulher de valor.' },
    ],
    theologicalPurposes: [
      'Mostrar que a verdadeira sabedoria não é mero intelecto, mas temor a Deus aplicado à conduta ética.',
    ],
    ChristInTheBook:
      'Cristo é a própria Sabedoria de Deus encarnada (1Co 1:30; Cl 2:3). Ele é o Mestre maior do que Salomão (Mt 12:42) cuja palavra edifica a casa na rocha inabalável.',
    practicalApplication: [
      'Pense cuidadosamente antes de falar; a língua tem poder de vida e de morte (Pr 18:21).',
      'Confie no Senhor de todo o seu coração e não se estribes no seu próprio entendimento.',
    ],
  },

  ISA: {
    bookId: 'ISA',
    bookName: 'Isaías',
    traditionalAuthor: 'Isaías (Filho de Amoz)',
    historicalPeriod: 'Aprox. 740–680 a.C. (Reinados de Uzias, Jotão, Acaz e Ezequias em Judá)',
    nameMeaning: 'Do hebraico "Yeshayahu" = O SENHOR é Salvação',
    centralTheme: 'A Santidade de Deus, o Juízo sobre a Idolatria e a Promessa Gloriosa do Servo Sofredor e do Reino Messiânico',
    keyWord: 'Santo de Israel / Salvação / Servo',
    keyVerse: 'Isaías 9:6, Isaías 53:5 & Isaías 6:3',
    generalSummary:
      'Frequentemente chamado de "O Quinto Evangelho", Isaías é uma obra-prima profética que combina denúncias veementes contra o pecado de Judá e das nações com as mais sublimes visões da graça, do Messias sofredor e da restauração do cosmos.',
    mainCharacters: [
      { name: 'Isaías', role: 'O Profeta da Corte', description: 'Chamado na visão do Trono e mensageiro da salvação divina.' },
      { name: 'Rei Ezequias', role: 'Rei fiel de Judá', description: 'Buscou a Deus na invasão assíria e foi milagrosamente liberto.' },
      { name: 'O Servo do SENHOR', role: 'O Messias', description: 'A figura misteriosa e justa que carrega nossas dores na cruz.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Is 1–39', title: 'O Livro do Juízo', description: 'A visão do Trono (cap. 6), a profecia do Emanuel (cap. 7), a criança prometida (cap. 9) e os oráculos contra as nações.' },
      { chapterRange: 'Is 40–55', title: 'O Livro da Consolação', description: 'O Servo do SENHOR (cap. 52-53) e o convite gracioso à salvação (cap. 55).' },
      { chapterRange: 'Is 56–66', title: 'O Livro da Glória Futura', description: 'A verdadeira adoração e a promessa dos Novos Céus e Nova Terra.' },
    ],
    theologicalPurposes: [
      'Proclamar que Yahweh é o Santo de Israel que não tolera a injustiça nem a falsa religiosidade.',
      'Revelar o plano eterno da salvação universal estendida também aos gentios.',
    ],
    ChristInTheBook:
      'Isaías apresenta a visão mais nítida do Messias no Antigo Testamento: Ele nascerá de uma virgem e será chamado Emanuel (7:14); será o Maravilhoso Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz (9:6); e, em Isaías 53, é retratado com precisão impressionante como o Servo ferido por nossas transgressões para nos trazer a paz.',
    practicalApplication: [
      'Contemple a santidade de Deus para viver em humilde arrependimento.',
      'Encontre consolo inabalável na promessa do Senhor que perdoa e renova as forças daqueles que Nele esperam.',
    ],
  },

  MAT: {
    bookId: 'MAT',
    bookName: 'Mateus',
    traditionalAuthor: 'Mateus (Levi), ex-publicano e apóstolo de Jesus',
    historicalPeriod: 'Aprox. 60–70 d.C. (Narra os eventos do nascimento de Jesus a 33 d.C.)',
    nameMeaning: 'Do hebraico "Mattityahu" = Dom do SENHOR',
    centralTheme: 'Jesus como o Rei Messias, o Filho de Davi que Cumpre as Escrituras e Estabelece o Reino dos Céus',
    keyWord: 'Reino dos Céus / Cumprimento',
    keyVerse: 'Mateus 16:16 & Mateus 28:18-20',
    generalSummary:
      'Mateus é a ponte perfeita entre o Antigo e o Novo Testamento. Escrito primariamente para judeus, demonstra exaustivamente como Jesus de Nazaré cumpre todas as profecias messiânicas da Lei e dos Profetas. Organiza o ensino de Jesus em 5 grandes discursos (com destaque para o Sermão do Monte) e conclui com a Grande Comissão.',
    mainCharacters: [
      { name: 'Jesus Cristo', role: 'O Rei Messias', description: 'Filho de Davi, Filho de Abraão, o Cumpridor de toda a justiça.' },
      { name: 'Os Doze Apóstolos', role: 'Discípulos chamados', description: 'Instruídos por Jesus para levar o Evangelho às nações.' },
      { name: 'Fariseus e Saduceus', role: 'Líderes religiosos opressores', description: 'Confrontados por Jesus por causa do hipócrito legalismo.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Mt 1–4', title: 'O Nascimento e Preparação do Rei', description: 'Genealogia messiânica, visita dos magos, batismo e tentação no deserto.' },
      { chapterRange: 'Mt 5–7', title: 'O Sermão do Monte', description: 'As Bem-Aventuranças e o manifesto ético do Reino dos Céus.' },
      { chapterRange: 'Mt 8–12', title: 'Milagres e Oposição', description: 'Curas surpreendentes, autoridade sobre demônios e o conflito com os fariseus.' },
      { chapterRange: 'Mt 13–20', title: 'Parábolas do Reino e Confissão no Cesaréia', description: 'A revelação do mistério do Reino e a confissão de Pedro.' },
      { chapterRange: 'Mt 21–25', title: 'Semana da Paixão e Discurso Escatológico', description: 'Entrada triunfal, purificação do Templo e o sermão profético.' },
      { chapterRange: 'Mt 26–28', title: 'Morte, Ressurreição e Grande Comissão', description: 'A traição, crucificação, vitória gloriosa na tumba e envio dos discípulos.' },
    ],
    theologicalPurposes: [
      'Provar categoricamente que Jesus é o Rei prometido da linhagem real de Davi.',
      'Definir a ética espiritual profunda do Reino dos Céus que supera a justiça meramente exterior.',
    ],
    ChristInTheBook:
      'Jesus é o Emanuel ("Deus conosco"), o Novo Moisés que promulga a verdadeira interpretação da Lei, o Filho de Davi que reina eternamente e a Pedra de Esquina da Sua Igreja triunfante.',
    practicalApplication: [
      'Viva os valores do Sermão do Monte como sal da terra e luz do mundo.',
      'Obedeça com paixão à Grande Comissão: ide e fazei discípulos de todas as nações.',
    ],
  },

  ROM: {
    bookId: 'ROM',
    bookName: 'Romanos',
    traditionalAuthor: 'Apóstolo Paulo',
    historicalPeriod: 'Aprox. 57 d.C. (Escrita a partir de Corinto)',
    nameMeaning: 'Carta enviada aos cristãos residentes na capital do Império Romano',
    centralTheme: 'A Justificação Pela Fé Somente na Graça de Deus e o Poder Transformador do Evangelho',
    keyWord: 'Justiça de Deus / Fé / Graça',
    keyVerse: 'Romanos 1:16-17 & Romanos 5:1',
    generalSummary:
      'Romanos é considerada a obra teológica suprema do Novo Testamento. Paulo apresenta sistematicamente o Evangelho: a culpa universal da humanidade (judeus e gentios), a salvação graciosa imputada mediante a fé no sacrifício de Cristo, a santificação pelo Espírito Santo, o plano soberano de Deus para Israel e os gentios, e a conduta ética diária.',
    mainCharacters: [
      { name: 'Apóstolo Paulo', role: 'Servo de Cristo', description: 'Embaixador do Evangelho desejoso de visitar Roma.' },
      { name: 'Febe, Priscila e Áquila', role: 'Colaboradores fiéis', description: 'Exemplos da vibrante comunidade de fé do primeiro século.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Rm 1–3', title: 'A Necessidade da Salvação', description: 'Todos pecaram e destituídos estão da glória de Deus.' },
      { chapterRange: 'Rm 4–5', title: 'O Caminho da Justificação', description: 'Abraão salvo pela fé e a paz com Deus por meio do nosso Senhor Jesus Cristo.' },
      { chapterRange: 'Rm 6–8', title: 'A Vida no Espírito e Santificação', description: 'Mortos para o pecado, livres da condenação e sustentados no amor que nada pode separar.' },
      { chapterRange: 'Rm 9–11', title: 'A Soberania de Deus e Israel', description: 'A eleição graciosa, o endurecimento parcial e a misericórdia universal.' },
      { chapterRange: 'Rm 12–16', title: 'A Prática Cristã Cotidiana', description: 'Apresentar os corpos como sacrifício vivo e os cumprimentos finais.' },
    ],
    theologicalPurposes: [
      'Explicar exaustivamente a doutrina central da justificação somente pela fé.',
      'Unir cristãos judeus e gentios em uma única família de Deus sob a graça.',
    ],
    ChristInTheBook:
      'Jesus é o Segundo Adão que trouxe vida e justiça onde o Primeiro Adão trouxe morte e condenação. Ele é o nosso Propiciatório (o lugar de expiação), por cujo sangue somos declarados justos diante do tribunal divino.',
    practicalApplication: [
      'Não se envergonhe do Evangelho, pois ele é o poder de Deus para a salvação de todo aquele que crê.',
      'Ofereça sua vida inteira diariamente a Deus como um culto racional e agradável.',
    ],
  },

  REV: {
    bookId: 'REV',
    bookName: 'Apocalipse',
    traditionalAuthor: 'Apóstolo João',
    historicalPeriod: 'Aprox. 95 d.C. (Escrito na Ilha de Patmos sob a perseguição de Domiciano)',
    nameMeaning: 'Do grego "Apokalupsis" = Revelação, Desvendamento de coisas ocultas',
    centralTheme: 'A Vitória Definitiva do Cordeiro Glorificado sobre o Mal, o Julgamento Final e o Triunfo dos Novos Céus e Nova Terra',
    keyWord: 'O Cordeiro / Vitória / Revelação',
    keyVerse: 'Apocalipse 1:8, Apocalipse 11:15 & Apocalipse 21:1-4',
    generalSummary:
      'O Apocalipse é o encerramento majestoso de toda a Bíblia. Através de uma rica linguagem simbólica e visões apocalípticas, consolida a igreja perseguida mostrando que, por trás da história humana, Cristo reina soberanamente. Descreve o juízo de Deus sobre a Babilônia e a Besta, a segunda vinda de Cristo em glória, e a eternidade do povo salvo na Nova Jerusalém.',
    mainCharacters: [
      { name: 'Jesus Cristo', role: 'O Cordeiro de Deus e Rei dos Reis', description: 'Aquele que foi morto, mas vive para todo o sempre e tem as chaves da morte.' },
      { name: 'João', role: 'Apóstolo e profeta', description: 'Exilado por amor ao Evangelho e testemunha das visões celestiais.' },
      { name: 'A Noiva de Cristo', role: 'A Igreja Fiel', description: 'Guardada e purificada para as Bodas do Cordeiro.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Ap 1', title: 'A Visão do Cristo Glorificado', description: 'O Senhor no meio dos sete candeeiros de ouro.' },
      { chapterRange: 'Ap 2–3', title: 'As Cartas às Sete Igrejas da Ásia', description: 'Elogios, exortações e promessas aos vencedores.' },
      { chapterRange: 'Ap 4–5', title: 'A Adoração Celestial e o Cordeiro', description: 'O Trono de Deus e Aquele que é digno de abrir o livro e seus selos.' },
      { chapterRange: 'Ap 6–18', title: 'Os Julgamentos e Conflitos Universais', description: 'Selos, trombetas, taças, a queda da Babilônia e a derrota das forças das trevas.' },
      { chapterRange: 'Ap 19–20', title: 'A Segunda Vinda e o Grande Trono Branco', description: 'O Cavaleiro do cavalo branco, a derrota definitiva do Dragão e o juízo final.' },
      { chapterRange: 'Ap 21–22', title: 'Novos Céus, Nova Terra e a Nova Jerusalém', description: 'Deus habitando com os homens sem mais dor, choro ou morte.' },
    ],
    theologicalPurposes: [
      'Garantir aos crentes de todos os tempos a certeza do triunfo final do Reino de Deus.',
      'Conclamar a igreja à perseverança, fidelidade e pureza diante das pressões do mundo.',
    ],
    ChristInTheBook:
      'Jesus é apresentado como o Leão da Tribo de Judá que é também o Cordeiro que parecia ter sido morto; o Alfa e o Ômega; o Fiel e Verdadeiro; o Rei dos Reis e Senhor dos Senhores; e a Resplandecente Estrela da Manhã.',
    practicalApplication: [
      'Persevere com firmeza na fé mesmo em tempos de oposição e tribulação.',
      'Viva na bendita esperança do retorno visível de Jesus dizendo do fundo do coração: "Amém! Vem, Senhor Jesus!"',
    ],
  },
};

// Fallback generator for books not fully hardcoded in the static bundle
export function getBookStudyGuide(bookId: string): BookStudyGuide {
  const normalizedId = bookId.toUpperCase();
  if (BIBLE_JOURNEY_STUDIES[normalizedId]) {
    return BIBLE_JOURNEY_STUDIES[normalizedId];
  }

  // Generate structured study overview for any other canonical book dynamically
  return {
    bookId: normalizedId,
    bookName: normalizedId,
    traditionalAuthor: 'Autor inspirado pelo Espírito Santo',
    historicalPeriod: 'Período bíblico canônico',
    nameMeaning: `Significado do nome do livro ${normalizedId}`,
    centralTheme: 'A fidelidade de Deus e a revelação do Seu plano redentor',
    keyWord: 'Aliança / Fé / Salvação',
    keyVerse: 'Versículo chave de ensinamento e edificação',
    generalSummary: `Estudo teológico aprofundado do livro ${normalizedId}. Este livro faz parte do cânon inspirado das Escrituras e revela a glória de Deus e Seu cuidado com Seu povo através da história humana.`,
    mainCharacters: [
      { name: 'Líderes e Servos de Deus', role: 'Testemunhas da Fé', description: 'Instrumentos usados por Deus para manifestar Sua vontade.' },
    ],
    keyEventsAndOutline: [
      { chapterRange: 'Caps. Iniciais', title: 'Introdução e Contexto', description: 'Apresentação do plano de Deus e chamado ao povo.' },
      { chapterRange: 'Caps. Centrais', title: 'Desenvolvimento e Desafios', description: 'Lutas, ensino teológico e providência divina.' },
      { chapterRange: 'Caps. Finais', title: 'Exortação e Esperança', description: 'Conclusão e apontamento para a redenção plena em Cristo.' },
    ],
    theologicalPurposes: [
      'Revelar a santidade e o amor incondicional de Deus.',
      'Instruir a comunidade de fé para uma vida de retidão e adoração.',
    ],
    ChristInTheBook:
      'Este livro aponta para Jesus Cristo como a consumação da promessa divina, mostrando a necessidade da graça e do perfeito Redentor enviado por Deus.',
    practicalApplication: [
      'Medite diariamente nas Escrituras para discernir a vontade de Deus.',
      'Aplique os princípios morais e espirituais em seu caminhar diário com Cristo.',
    ],
  };
}
