import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  PenTool, 
  ChevronRight, 
  ChevronLeft, 
  BookMarked, 
  Sparkles, 
  Save, 
  Check, 
  RefreshCw, 
  Clock, 
  BookOpenCheck,
  Compass,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { useTheme } from '../styles/themeConstants';

interface DevotionalWeek {
  week: number;
  title: string;
  passage: string;
  passageRef: { bookId: string; chapter: number };
  reflection: string;
  questions: string[];
}

interface MonthlyTheme {
  id: number;
  name: string;
  monthName: string;
  title: string;
  summary: string;
  keyVerse: string;
  keyVerseRef: string;
  theologyFocus: string;
  weeks: DevotionalWeek[];
}

const MONTHLY_THEMES: MonthlyTheme[] = [
  {
    id: 1,
    monthName: 'Janeiro',
    name: 'Origens e Pacto',
    title: 'A Criação e a Aliança da Graça',
    summary: 'Investigue o início de todas as coisas: a criação majestosa, a tragédia da queda e a promessa inabalável do Redentor que esmagará a serpente.',
    keyVerse: 'No princípio, criou Deus os céus e a terra... E porei inimizade entre ti e a mulher, e entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.',
    keyVerseRef: 'Gênesis 1:1; 3:15',
    theologyFocus: 'Teologia Federal (Alianças), Criação Ex Nihilo, Soberania Divina e a Promessa do Protoevangelho.',
    weeks: [
      {
        week: 1,
        title: 'Criação e Ordem Cósmica',
        passage: 'Gênesis 1:1-31',
        passageRef: { bookId: 'GEN', chapter: 1 },
        reflection: 'Deus cria o cosmos não de uma matéria pré-existente, mas ex nihilo (do nada), apenas pela força de Sua Palavra ativa. Esta criação manifesta ordem, beleza e propósito eterno. O ser humano é colocado no centro desta criação como o portador da Imago Dei (Imagem de Deus), chamado a refletir a glória do Criador na terra.',
        questions: [
          'De que maneira o fato de sermos criados à imagem de Deus influencia nossa dignidade e missão hoje?',
          'Como podemos adorar a Deus ativamente ao contemplarmos a ordem e os detalhes do cosmos?'
        ]
      },
      {
        week: 2,
        title: 'A Queda e a Fratura Cósmica',
        passage: 'Gênesis 3:1-24',
        passageRef: { bookId: 'GEN', chapter: 3 },
        reflection: 'A desobediência no Éden introduz o pecado no mundo, fraturando a comunhão perfeita com o Criador, as relações interpessoais e a própria natureza. O julgamento divino é justo, porém a Graça se sobressai imediatamente: Deus promete que o Descendente da mulher esmagará a cabeça do tentador, inaugurando a redenção histórica.',
        questions: [
          'Como percebemos os efeitos da queda em nossas próprias vidas e inclinações diárias?',
          'Onde você encontra esperança ao ver a misericórdia de Deus agindo logo após a desobediência?'
        ]
      },
      {
        week: 3,
        title: 'O Pacto Noático e a Preservação',
        passage: 'Gênesis 9:1-17',
        passageRef: { bookId: 'GEN', chapter: 9 },
        reflection: 'Após o dilúvio purificador, Deus estabelece uma aliança perpétua de preservação com Noé, seus descendentes e toda a criação. O arco-íris se torna o selo desta promessa divina de que a vida na terra será sustentada até que a redenção final se cumpra. Deus demonstra ser o guardião paciente da história.',
        questions: [
          'Como a estabilidade da natureza e o cuidado preservador de Deus devem moldar nossa gratidão?',
          'De que forma o arco-íris nos lembra da fidelidade e da paciência divina?'
        ]
      },
      {
        week: 4,
        title: 'A Aliança Abraâmica e a Promessa',
        passage: 'Gênesis 15:1-21',
        passageRef: { bookId: 'GEN', chapter: 15 },
        reflection: 'Deus chama Abrão de uma terra pagã para fazer dele o pai de uma grande nação, por meio da qual todas as famílias da terra seriam abençoadas. No capítulo 15, Deus assume sozinho o juramento da aliança, passando pelas peças sacrificiais, garantindo que Ele mesmo cumprirá a promessa, baseando a justificação puramente na fé.',
        questions: [
          'Abrão creu em Deus, e isso lhe foi imputado como justiça. Como isso se conecta com nossa fé em Cristo?',
          'Quais áreas de sua vida exigem que você confie nas promessas invisíveis de Deus hoje?'
        ]
      }
    ]
  },
  {
    id: 2,
    monthName: 'Fevereiro',
    name: 'Libertação e Êxodo',
    title: 'A Redenção do Cativeiro e a Lei Aliançada',
    summary: 'Medite no clamor do povo, no poder das pragas do Egito, na travessia triunfal do Mar Vermelho e na revelação santa no Monte Sinai.',
    keyVerse: 'Eu sou o Senhor, teu Deus, que te tirei da terra do Egito, da casa da servidão. Não terás outros deuses diante de mim.',
    keyVerseRef: 'Êxodo 20:2-3',
    theologyFocus: 'Redenção Tipológica, Santidade da Lei (Decálogo), e a Glória Visível da Presença do Senhor (Tabernáculo).',
    weeks: [
      {
        week: 1,
        title: 'O Clamor Ouvido e o Libertador',
        passage: 'Êxodo 3:1-15',
        passageRef: { bookId: 'EXO', chapter: 3 },
        reflection: 'Deus não ignora a dor e a opressão de Seu povo sob o jugo egípcio. Ele Se revela a Moisés no arbusto ardente como o Deus de Abraão, Isaque e Jacó, revelando Seu nome sagrado: "EU SOU O QUE SOU" (YHVH). Deus demonstra ser o Deus que se importa, age na história humana e chama cooperadores para Seus planos.',
        questions: [
          'Qual é o impacto teológico do Nome de Deus ("EU SOU") em nossa compreensão de Sua eternidade?',
          'Como você se consola sabendo que Deus ouve perfeitamente os clamores e aflições do Seu povo?'
        ]
      },
      {
        week: 2,
        title: 'A Páscoa e o Cordeiro Substituto',
        passage: 'Êxodo 12:1-28',
        passageRef: { bookId: 'EXO', chapter: 12 },
        reflection: 'A libertação final do Egito exige o sangue do cordeiro sem mácula nos umbrais das portas. A Páscoa estabelece o princípio central da redenção: a substituição vicária. O anjo da morte passa por cima das casas marcadas pelo sangue, tipificando Cristo, nossa Páscoa eterna, cujo sangue nos livra do julgamento divino.',
        questions: [
          'De que forma os detalhes da Páscoa judaica apontam de forma brilhante para o sacrifício de Jesus Cristo?',
          'Como podemos celebrar nossa própria libertação do "Egito espiritual" do pecado?'
        ]
      },
      {
        week: 3,
        title: 'O Decálogo e a Vontade Revelada',
        passage: 'Êxodo 20:1-21',
        passageRef: { bookId: 'EXO', chapter: 20 },
        reflection: 'No Sinai, após resgatar Seu povo pela graça, Deus concede os Dez Mandamentos. A Lei não é um meio de salvação, mas a regra de vida para uma comunidade já redimida que deseja expressar gratidão e espelhar a santidade de Deus entre as nações. Ela revela o caráter imutável de Deus.',
        questions: [
          'Como a Lei de Deus reflete Seu amor e desejo de nos proteger e nos dar vida plena?',
          'Como você avalia seu amor ao próximo com base nos mandamentos morais que Deus prescreveu?'
        ]
      },
      {
        week: 4,
        title: 'O Tabernáculo: Deus Habita Conosco',
        passage: 'Êxodo 40:17-38',
        passageRef: { bookId: 'EXO', chapter: 40 },
        reflection: 'O clímax do Êxodo é a ereção do Tabernáculo. A nuvem de glória desce e enche o santuário, provando que o Deus Altíssimo deseja fazer morada no meio de Seu povo imperfeito. O Tabernáculo, com seus altares e véus, prefigura a encarnação de Jesus ("tabernaculou entre nós") e a habitação do Espírito.',
        questions: [
          'Se nosso corpo é o templo do Espírito hoje, como devemos zelar pela habitação sagrada em nós?',
          'Como o acesso livre ao Santo dos Santos através de Cristo impacta sua vida de oração diária?'
        ]
      }
    ]
  },
  {
    id: 3,
    monthName: 'Março',
    name: 'Santidade e Culto',
    title: 'Aproximação e Consagração ao Deus Vivo',
    summary: 'Aprofunde-se no sacerdócio, na pureza ritual, no Dia da Expiação e na chamada solene: "Sede santos, porque eu sou santo".',
    keyVerse: 'Santos sereis, porque eu, o Senhor, vosso Deus, sou santo.',
    keyVerseRef: 'Levítico 19:2',
    theologyFocus: 'Justiça e Expiação pelo Sangue, Propiciação, Santificação Prática, e o Culto Reverente.',
    weeks: [
      {
        week: 1,
        title: 'O Sacrifício e a Necessidade de Sangue',
        passage: 'Levítico 1:1-9; 17:11',
        passageRef: { bookId: 'LEV', chapter: 1 },
        reflection: 'Levítico ensina que a vida da carne está no sangue, e que o sangue é dado para fazer expiação pelas almas. Um Deus infinitamente santo não pode simplesmente ignorar o pecado; a justiça exige reparação. O ritual do sacrifício ensina que o pecado custa a vida e exige um substituto aceitável.',
        questions: [
          'Por que a seriedade do pecado é tão esquecida em nossa cultura atual?',
          'Como o custo do sacrifício vicário aumenta nosso apreço pelo preço pago por Cristo na cruz?'
        ]
      },
      {
        week: 2,
        title: 'O Dia da Expiação (Yom Kippur)',
        passage: 'Levítico 16:1-22',
        passageRef: { bookId: 'LEV', chapter: 16 },
        reflection: 'Uma vez por ano, o sumo sacerdote entrava no Santo dos Santos com o sangue dos sacrifícios. Dois bodes eram usados: um era imolado para propiciação (satisfazer a justiça) e o outro, o bode emissário, levava os pecados confessados do povo para o deserto (expiação/afastamento da culpa).',
        questions: [
          'Como Jesus desempenha simultaneamente o papel de Sumo Sacerdote, Cordeiro Sacrificado e Bode Emissário?',
          'Você sente que seus pecados foram totalmente "levados para o deserto" por Jesus, ou ainda carrega culpa?'
        ]
      },
      {
        week: 3,
        title: 'Santidade no Cotidiano',
        passage: 'Levítico 19:1-18',
        passageRef: { bookId: 'LEV', chapter: 19 },
        reflection: 'A santidade em Levítico não se restringe a rituais do templo; ela transborda para o cuidado com o necessitado, honestidade nos negócios, justiça nos tribunais e o amor prático ao próximo. Ser santo é agir com justiça nas relações mais ordinárias da vida diária.',
        questions: [
          'O que significa na prática "amar o próximo como a si mesmo" no seu ambiente de trabalho ou estudo?',
          'Como sua rotina diária pode demonstrar a santidade prática que reflete o caráter de Deus?'
        ]
      },
      {
        week: 4,
        title: 'O Fogo Sagrado do Culto',
        passage: 'Levítico 9:22-10:7',
        passageRef: { bookId: 'LEV', chapter: 9 },
        reflection: 'Após a inauguração solene do sacerdócio, o fogo do Senhor consome o holocausto, gerando adoração coletiva. Todavia, Nadabe e Abiú oferecem fogo profano e são consumidos. Deus lembra de forma solene que Ele deve ser santificado por todos os que se aproximam Dele. Nosso culto requer reverência e temor.',
        questions: [
          'De que maneira podemos cair no perigo de adorar a Deus "à nossa própria maneira" em vez de como Ele revelou?',
          'Como equilibrar a íntima filiação de Deus com o temor reverente e o respeito à Sua majestade?'
        ]
      }
    ]
  },
  {
    id: 4,
    monthName: 'Abril',
    name: 'Terra Prometida e Conquista',
    title: 'Fidelidade nas Batalhas e Herança Espiritual',
    summary: 'Acompanhe a transição de liderança para Josué, a queda das muralhas de Jericó e a distribuição da terra prometida.',
    keyVerse: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo, por onde quer que andares.',
    keyVerseRef: 'Josué 1:9',
    theologyFocus: 'Soberania nas Vitórias, Batalha Espiritual, Herança Prometida e a Liderança Teocrática.',
    weeks: [
      {
        week: 1,
        title: 'A Chamada à Coragem de Josué',
        passage: 'Josué 1:1-18',
        passageRef: { bookId: 'JOS', chapter: 1 },
        reflection: 'Com a morte de Moisés, Josué assume a liderança do povo rumo à promessa. O segredo do seu sucesso não residia na estratégia militar, mas na obediência radical e meditação diária na Lei de Deus, acompanhada da certeza de que o Senhor estaria com ele em cada passo.',
        questions: [
          'Como a meditação diária na Palavra de Deus atua como escudo contra o medo e a ansiedade?',
          'Em qual desafio atual Deus está chamando você a se esforçar e ter "bom ânimo"?'
        ]
      },
      {
        week: 2,
        title: 'Fé e Salvação em Jericó',
        passage: 'Josué 2:1-24; 6:1-20',
        passageRef: { bookId: 'JOS', chapter: 2 },
        reflection: 'A conquista de Jericó ensina que a vitória pertence ao Senhor. Os muros não caem pelo poder humano, mas pelo cumprimento de instruções incomuns baseadas na fé. Além disso, a fé de Raabe, uma estrangeira, a salva da ruína, incluindo-a na linhagem da promessa messiânica.',
        questions: [
          'O que a salvação de Raabe nos revela sobre o alcance universal e escandaloso da graça de Deus?',
          'Quais "muralhas" em sua vida parecem intransponíveis e requerem obediência e paciência na fé?'
        ]
      },
      {
        week: 3,
        title: 'O Perigo do Pecado Oculto',
        passage: 'Josué 7:1-26',
        passageRef: { bookId: 'JOS', chapter: 7 },
        reflection: 'A derrota em Ai revela que o pecado de um indivíduo (Acã) afeta toda a comunidade da aliança. O apego ao proibido e a desobediência secreta bloqueiam o agir de Deus. A santidade exige que lidemos seriamente com aquilo que Deus ordenou que destruíssemos em nosso coração.',
        questions: [
          'De que maneira o pecado oculto corrói nossa comunhão espiritual e prejudica os que nos cercam?',
          'Como você pode exercitar a confissão sincera para restaurar a comunhão com o Senhor?'
        ]
      },
      {
        week: 4,
        title: 'Firmeza no Fim da Jornada',
        passage: 'Josué 24:1-28',
        passageRef: { bookId: 'JOS', chapter: 24 },
        reflection: 'No ocaso de sua vida, Josué reúne a congregação e recapitula todas as obras salvíficas de Deus. Ele confronta o povo a tomar uma decisão consciente e definitiva: abandonar os ídolos e servir exclusivamente ao Senhor. "Eu e a minha casa serviremos ao Senhor" é o lema da devoção familiar.',
        questions: [
          'Quais ídolos modernos ou sutis competem com o trono de Deus em seu coração?',
          'Como você e sua família podem estabelecer marcos visíveis de servir unicamente ao Senhor?'
        ]
      }
    ]
  },
  {
    id: 5,
    monthName: 'Maio',
    name: 'Realeza e Sabedoria',
    title: 'O Trono Davídico e os Provérbios de Vida',
    summary: 'Aprofunde-se na aliança eterna com Davi, na busca de Salomão por sabedoria e na expressão poética da vida devocional nos Salmos.',
    keyVerse: 'O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo, a prudência.',
    keyVerseRef: 'Provérbios 9:10',
    theologyFocus: 'Realeza Messiânica (Pacto Davídico), Antropologia Prática na Literatura de Sabedoria, Adoração Expressiva.',
    weeks: [
      {
        week: 1,
        title: 'A Aliança Davídica Eterna',
        passage: '2 Samuel 7:1-17',
        passageRef: { bookId: '2SA', chapter: 7 },
        reflection: 'Davi deseja edificar um templo de pedra para Deus, mas o Senhor faz um anúncio surpreendente: Ele é quem estabelecerá a casa de Davi, levantando de sua descendência um Trono e um Reino que subsistirão para sempre. Esta aliança gloriosa se cumpre perfeitamente na pessoa de Jesus Cristo, o Filho de Davi.',
        questions: [
          'Como a soberana inversão de Deus (Ele faz uma casa para Davi, e não o contrário) consola seu coração?',
          'O que representa confessar que Jesus Cristo é o Rei definitivo que governa sobre o seu viver?'
        ]
      },
      {
        week: 2,
        title: 'A Busca pela Verdadeira Sabedoria',
        passage: '1 Reis 3:3-15; Provérbios 2:1-11',
        passageRef: { bookId: '1KI', chapter: 3 },
        reflection: 'Salomão, ao assumir o trono, roga a Deus não por riquezas ou vida longa, mas por um coração sábio e obediente para governar com justiça. A sabedoria bíblica não é mera capacidade intelectual, mas a arte prática de viver em retidão e integridade, debaixo do temor inteligente do Senhor.',
        questions: [
          'Qual a diferença fundamental entre a sabedoria secular/acadêmica e a sabedoria que vem do Temor do Senhor?',
          'Se você pudesse pedir algo a Deus agora, o que seu coração mais desejaria pedir?'
        ]
      },
      {
        week: 3,
        title: 'O Coração Devoto nos Salmos',
        passage: 'Salmo 23; Salmo 51',
        passageRef: { bookId: 'PSA', chapter: 23 },
        reflection: 'Os Salmos constituem o cancioneiro inspirado do povo de Deus. Eles revelam toda a gama de emoções humanas: desde a profunda paz em meio à tribulação (Salmo 23) até a angústia dilacerante e o arrependimento sincero após o pecado moral (Salmo 51). Eles nos ensinam a conversar honestamente com Deus.',
        questions: [
          'Como o Salmo 51 nos ajuda a formular uma oração de quebrantamento e restauração diante de Deus?',
          'De que maneira você pode expressar suas emoções e fraquezas de forma saudável em sua vida de oração?'
        ]
      },
      {
        week: 4,
        title: 'A Vaidade e o Propósito da Existência',
        passage: 'Eclesiastes 12:1-14',
        passageRef: { bookId: 'ECC', chapter: 12 },
        reflection: 'Eclesiastes analisa a vida "debaixo do sol" e conclui que sem Deus tudo é vazio, passageiro e ilusório ("vaidade"). O clímax do livro nos remete à sabedoria eterna: "Lembra-te do teu Criador nos dias da tua mocidade... Teme a Deus e guarda os seus mandamentos; porque este é o dever de todo homem".',
        questions: [
          'Como o reconhecimento de que a vida terrena é breve e frágil nos impulsiona a focar na eternidade?',
          'De que forma você pode viver com mais intencionalidade espiritual hoje?'
        ]
      }
    ]
  },
  {
    id: 6,
    monthName: 'Junho',
    name: 'Profecia e Exílio',
    title: 'Julgamento, Misericórdia e a Nova Aliança',
    summary: 'Aprofunde-se na mensagem dos profetas de Israel que proclamavam arrependimento, anunciavam o julgamento do exílio e apontavam para a Nova Aliança.',
    keyVerse: 'E dar-vos-ei um coração novo e porei dentro de vós um espírito novo; e tirarei o coração de pedra da vossa carne e vos darei um coração de carne.',
    keyVerseRef: 'Ezequiel 36:26',
    theologyFocus: 'A Nova Aliança, Regeneração pelo Espírito, Restauração e Promessas Escatológicas.',
    weeks: [
      {
        week: 1,
        title: 'O Clamor contra a Injustiça',
        passage: 'Isaías 1:1-20',
        passageRef: { bookId: 'ISA', chapter: 1 },
        reflection: 'Os profetas eram os advogados de Deus para a aliança. Isaías denuncia um culto exteriormente perfeito, cheio de sacrifícios, mas desprovido de justiça social e arrependimento real. Deus recusa cultos vazios e exige corações limpos que buscam o direito e defendem o órfão e a viúva.',
        questions: [
          'Como podemos evitar a armadilha de manter uma rotina religiosa "perfeita", mas vazia de amor e justiça?',
          'De que forma a exortação "lavai-vos, purificai-vos" se cumpre no perdão oferecido em Cristo Jesus?'
        ]
      },
      {
        week: 2,
        title: 'O Profeta Sofredor e a Nova Aliança',
        passage: 'Jeremias 31:31-34',
        passageRef: { bookId: 'JER', chapter: 31 },
        reflection: 'Em meio às ruínas iminentes de Jerusalém, Jeremias profetiza a Nova Aliança. Diferente da aliança do Sinai que o povo quebrou, esta nova aliança gravará a lei de Deus no íntimo e no coração dos crentes, assegurando o perdão completo dos pecados e o conhecimento universal e íntimo de Deus.',
        questions: [
          'Como a Nova Aliança substitui a obediência por obrigação exterior pela obediência por amor e prazer interior?',
          'Como você desfruta da promessa "todos me conhecerão, desde o menor até ao maior"?'
        ]
      },
      {
        week: 3,
        title: 'O Coração Novo pelo Espírito',
        passage: 'Ezequiel 36:22-38',
        passageRef: { bookId: 'EZE', chapter: 36 },
        reflection: 'Ezequiel explica como se dará a transformação da Nova Aliança: Deus aspergirá água pura sobre nós, purificando-nos de todas as imundícias. Ele retirará o coração de pedra insensível e rebelde, dando-nos um coração de carne sensível, e colocará Seu próprio Espírito dentro de nós para nos capacitar a andar em Seus decretos.',
        questions: [
          'Como a promessa do transplante de coração espiritual (pedra por carne) explica o mistério do novo nascimento?',
          'Como você percebe a ação do Espírito Santo inclinando sua vontade a obedecer a Deus diariamente?'
        ]
      },
      {
        week: 4,
        title: 'Fidelidade na Babilônia do Exílio',
        passage: 'Daniel 6:1-24',
        passageRef: { bookId: 'DAN', chapter: 6 },
        reflection: 'No exílio babilônico e persa, os fiéis enfrentam pressões extremas para se amoldarem à cultura pagã. Daniel decide não se contaminar e mantém sua rotina inabalável de oração três vezes ao dia, preferindo a cova dos leões à deslealdade ao Senhor. Deus mostra Seu domínio soberano sobre reinos humanos.',
        questions: [
          'Quais "decretos" culturais de nossa época testam sua fidelidade e integridade cristã?',
          'Como cultivar uma disciplina de oração e comunhão diária firme o suficiente para resistir a pressões?'
        ]
      }
    ]
  },
  {
    id: 7,
    monthName: 'Julho',
    name: 'A Encarnação do Verbo',
    title: 'A Vinda do Messias e o Reino de Deus',
    summary: 'Aprofunde-se no nascimento virginal, no Sermão do Monte, nas parábolas transformadoras e nos sinais milagrosos que revelam o Reino.',
    keyVerse: 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória, como a glória do Unigênito do Pai, cheio de graça e de verdade.',
    keyVerseRef: 'João 1:14',
    theologyFocus: 'Cristologia (União Hipostática), A Ética do Reino, Milagres e a Revelação do Amor de Deus.',
    weeks: [
      {
        week: 1,
        title: 'O Verbo Encarnado',
        passage: 'João 1:1-18',
        passageRef: { bookId: 'JHN', chapter: 1 },
        reflection: 'O Evangelho de João abre com uma declaração majestosa sobre a divindade eterna de Jesus: Ele é o Logos (Verbo), estava com Deus e era Deus. Na encarnação, Ele assumiu a natureza humana de forma plena, sem pecar, a fim de revelar de forma visível e infalível a graça e a verdade invisíveis do Pai.',
        questions: [
          'De que maneira a encarnação de Cristo valida a importância de nossa vida corporal e terrena?',
          'Como "contemplar a glória" de Jesus afeta sua comunhão pessoal e seu testemunho prático?'
        ]
      },
      {
        week: 2,
        title: 'A Ética Contracultural do Reino',
        passage: 'Mateus 5:1-20',
        passageRef: { bookId: 'MAT', chapter: 5 },
        reflection: 'No Sermão do Monte, Jesus expõe a verdadeira justiça do Reino de Deus. Ele não anula a Lei, mas a aprofunda, mostrando que o adultério e o homicídio começam no coração. As bem-aventuranças subvertem os valores do mundo, exaltando os humildes, os pacificadores e os puros de coração.',
        questions: [
          'Como você pode exercer o papel de "sal da terra e luz do mundo" em suas esferas de convívio hoje?',
          'De que forma a ética de Jesus confronta o orgulho e o exibicionismo espiritual?'
        ]
      },
      {
        week: 3,
        title: 'O Mistério das Parábolas',
        passage: 'Lucas 15:1-32',
        passageRef: { bookId: 'LUK', chapter: 15 },
        reflection: 'Através de parábolas cotidianas, Jesus revela os maiores segredos da teologia da graça. Em Lucas 15, as parábolas da ovelha perdida, da dracma perdida e do pai misericordioso (filho pródigo) revelam o coração amoroso de Deus, que busca ativamente o pecador e se alegra profundamente com o seu retorno.',
        questions: [
          'Com qual dos personagens da parábola do Filho Pródigo (o pródigo, o irmão mais velho, ou o pai) você mais se identifica no momento?',
          'Como a alegria de Deus em perdoar deve nos motivar a acolher com amor aqueles que caem?'
        ]
      },
      {
        week: 4,
        title: 'O Poder sobre as Trevas e a Doença',
        passage: 'Marcos 4:35-41; 5:1-20',
        passageRef: { bookId: 'MRK', chapter: 4 },
        reflection: 'Os milagres de Jesus não eram meros truques de espetáculo, mas "sinais" visíveis do Reino inaugurado. Ao acalmar a tempestade com uma palavra ("Cala-te, emudece!") e libertar o endemoninhado gadareno, Jesus demonstra autoridade absoluta sobre a natureza física e o reino das trevas.',
        questions: [
          'Por que os discípulos temeram tanto mesmo vendo Jesus no barco? Como lidamos com a fé em nossas "tempestades"?',
          'Qual área da sua vida ainda precisa experimentar o toque libertador e pacificador do Senhor Jesus?'
        ]
      }
    ]
  },
  {
    id: 8,
    monthName: 'Agosto',
    name: 'Cruz e Ressurreição',
    title: 'A Vitória sobre a Morte e a Redenção Efetuada',
    summary: 'Acompanhe o Calvário, o túmulo vazio, as aparições pós-ressurreição e a Grande Comissão que impulsiona a Igreja.',
    keyVerse: 'Mas ele foi ferido pelas nossas transgressões e moído pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e, pelas suas pisaduras, fomos sarados.',
    keyVerseRef: 'Isaías 53:5',
    theologyFocus: 'Expiação Substitutiva, Justificação, Ressurreição Corporal de Cristo e a Vitória sobre o Inferno.',
    weeks: [
      {
        week: 1,
        title: 'O Getsêmani e a Taça da Ira',
        passage: 'Mateus 26:36-46',
        passageRef: { bookId: 'MAT', chapter: 26 },
        reflection: 'No jardim do Getsêmani, Jesus experimenta o peso terrível do cálice que haveria de beber — o cálice da justa ira de Deus contra o pecado da humanidade. Diante da agonia extrema, Ele submete voluntariamente Sua vontade à vontade do Pai: "Não seja como eu quero, mas como tu queres".',
        questions: [
          'Como a agonia de Cristo no Getsêmani revela a imensa gravidade e o real preço do pecado?',
          'Como a atitude de submissão de Jesus nos inspira a render nossas vontades nos momentos difíceis?'
        ]
      },
      {
        week: 2,
        title: 'O Gólgota: Consumado Está',
        passage: 'João 19:16-30',
        passageRef: { bookId: 'JHN', chapter: 19 },
        reflection: 'Na cruz do Calvário, Jesus cumpre de forma absoluta o papel de Cordeiro substituto. Ele brada "Tetelestai!" ("Está consumado!"), anunciando que a dívida do pecado foi completamente paga e cancelada. O véu do templo se rasga de alto a baixo, abrindo para sempre o livre acesso a Deus.',
        questions: [
          'Quais mentiras sobre nossa insuficiência são anuladas pela certeza de que a obra de Jesus na cruz está "totalmente consumada"?',
          'De que maneira o acesso livre ao trono da graça muda sua atitude ao buscar o Senhor?'
        ]
      },
      {
        week: 3,
        title: 'O Túmulo Vazio e a Ressurreição',
        passage: 'Lucas 24:1-12; 1 Coríntios 15:12-28',
        passageRef: { bookId: 'LUK', chapter: 24 },
        reflection: 'A ressurreição corporal de Cristo é a pedra angular da fé cristã. Se Cristo não ressuscitou, nossa fé é inútil. Ao vencer a sepultura no terceiro dia, Jesus prova a aceitação divina do Seu sacrifício, derrota a morte e garante a futura ressurreição de todos os que Nele creem.',
        questions: [
          'De que forma a certeza histórica e teológica da ressurreição de Cristo elimina o medo humano da morte?',
          'Como a realidade do túmulo vazio impacta suas esperanças de recomeço e restauração pessoal hoje?'
        ]
      },
      {
        week: 4,
        title: 'A Grande Comissão e a Ascensão',
        passage: 'Mateus 28:16-20; Atos 1:1-11',
        passageRef: { bookId: 'MAT', chapter: 28 },
        reflection: 'Antes de ascender ao céu para reinar à direita do Pai, Jesus comissiona Seus discípulos a fazer discípulos de todas as nações, batizando-os e ensinando-os. Ele nos deixa uma promessa consoladora: "Eis que estou convosco todos os dias, até à consumação dos séculos".',
        questions: [
          'Como você pode desempenhar de forma prática a Grande Comissão em sua vida cotidiana, na família ou vizinhança?',
          'De que maneira a presença contínua de Jesus com você serve de âncora em momentos de solidão?'
        ]
      }
    ]
  },
  {
    id: 9,
    monthName: 'Setembro',
    name: 'A Igreja e o Espírito',
    title: 'O Nascimento da Comunidade Missionária',
    summary: 'Estude a descida do Espírito Santo no Pentecostes, a vida comunitária da igreja primitiva e o testemunho ousado dos apóstolos.',
    keyVerse: 'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.',
    keyVerseRef: 'Atos 1:8',
    theologyFocus: 'Pneumatologia (Doutrina do Espírito), Eclesiologia (Doutrina da Igreja) e o Poder da Missão Urbana e Global.',
    weeks: [
      {
        week: 1,
        title: 'O Pentecostes: O Fogo Derramado',
        passage: 'Atos 2:1-21',
        passageRef: { bookId: 'ACT', chapter: 2 },
        reflection: 'No dia de Pentecostes, o Espírito Santo é derramado sobre os discípulos reunidos, capacitando-os a pregar em línguas inteligíveis as maravilhas de Deus. Pedro prega com poder ousado, e cerca de três mil almas são convertidas, provando que a missão se faz pelo sopro soberano e capacitador do Espírito.',
        questions: [
          'De que forma a vinda do Espírito Santo no Pentecostes cumpre as profecias do Antigo Testamento?',
          'Como podemos depender mais do Espírito Santo em vez de nossas próprias forças para testemunhar de Jesus?'
        ]
      },
      {
        week: 2,
        title: 'A Comunidade dos Sonhos de Deus',
        passage: 'Atos 2:42-47; 4:32-35',
        passageRef: { bookId: 'ACT', chapter: 2 },
        reflection: 'A primeira igreja em Jerusalém se caracterizava pela dedicação contínua à doutrina dos apóstolos, à comunhão fraterna, ao partir do pão e às orações. O amor mútuo era tão evidente que compartilhavam os bens materiais, não havendo necessitados entre eles, conquistando a simpatia do povo.',
        questions: [
          'Quais elementos da igreja primitiva estão mais ausentes em nossa experiência de igreja comunitária hoje?',
          'Como você pode incentivar uma comunhão mais sincera, generosa e profunda com seus irmãos de fé?'
        ]
      },
      {
        week: 3,
        title: 'A Ousadia diante da Oposição',
        passage: 'Atos 4:1-22',
        passageRef: { bookId: 'ACT', chapter: 4 },
        reflection: 'Diante da perseguição e do encarceramento pelas autoridades religiosas, Pedro e João respondem com convicção inabalável: "Não podemos deixar de falar do que temos visto e ouvido". Ao invés de orarem pedindo o fim da oposição, a igreja ora por mais ousadia e ousadia para anunciar a Palavra.',
        questions: [
          'Quando pressionado a calar sua fé, qual tem sido sua reação? Como obter a ousadia do Espírito?',
          'Como as crises externas fortalecem a unidade espiritual da igreja genuína de Cristo?'
        ]
      },
      {
        week: 4,
        title: 'A Conversão do Perseguidor Saul',
        passage: 'Atos 9:1-22',
        passageRef: { bookId: 'ACT', chapter: 9 },
        reflection: 'Saulo de Tarso, respirando ameaças e morte contra os discípulos, é confrontado pelo Cristo ressuscitado na estrada de Damasco. A luz divina o cega temporariamente para abrir seus olhos espirituais. O arqui-inimigo da fé é transformado pela soberana graça no Apóstolo dos Gentios.',
        questions: [
          'A conversão de Saulo prova que ninguém está fora do alcance da graça soberana de Deus. Há alguém por quem você havia desistido de orar?',
          'De que forma seu próprio encontro com Jesus reorientou as prioridades e a missão da sua vida?'
        ]
      }
    ]
  },
  {
    id: 10,
    monthName: 'Outubro',
    name: 'Justificação e Fé',
    title: 'A Glória da Justificação somente pela Graça',
    summary: 'Aprofunde-se nos fundamentos teológicos da Reforma: Sola Fide (somente a fé) e Sola Gratia (somente a graça) expostos na carta aos Romanos.',
    keyVerse: 'Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo.',
    keyVerseRef: 'Romanos 5:1',
    theologyFocus: 'Justificação Forense, Depravação Humana, União com Cristo, e a Paz com Deus.',
    weeks: [
      {
        week: 1,
        title: 'A Universalidade do Pecado',
        passage: 'Romanos 3:9-26',
        passageRef: { bookId: 'ROM', chapter: 3 },
        reflection: 'Paulo expõe cirurgicamente a condição moral da humanidade: todos pecaram e carecem da glória de Deus. Não há sequer um justo. Diante desse diagnóstico desesperador, a justiça de Deus se manifesta sem a lei, mediante a fé em Jesus Cristo, justificando gratuitamente o pecador por Sua graça redentora.',
        questions: [
          'Por que compreender nossa total falência moral é o passo indispensável para valorizar a salvação?',
          'Como você descreveria com suas palavras o conceito de "justificação forense" realizada por Cristo?'
        ]
      },
      {
        week: 2,
        title: 'Paz com Deus e Firmeza',
        passage: 'Romanos 5:1-11',
        passageRef: { bookId: 'ROM', chapter: 5 },
        reflection: 'Uma vez declarados justos por Deus pela fé, o veredito é imutável: temos paz com Deus e acesso permanente à Sua graça. Esta paz objetiva nos sustenta inclusive no sofrimento, sabendo que as tribulações produzem perseverança, caráter aprovado e uma esperança que nunca decepciona.',
        questions: [
          'A paz com Deus não é um sentimento emocional, mas uma realidade judicial estável. Como isso acalma seu coração?',
          'Como o sofrimento tem sido usado por Deus para amadurecer e testar sua fé?'
        ]
      },
      {
        week: 3,
        title: 'Nenhuma Condenação em Cristo',
        passage: 'Romanos 8:1-17',
        passageRef: { bookId: 'ROM', chapter: 8 },
        reflection: 'Para aqueles que estão unidos com Cristo Jesus, o veredito final já foi pronunciado: Nenhuma Condenação! O Espírito de Deus habita neles, libertando-os da lei do pecado e da morte, conduzindo-os à plena filiação divina, pela qual podemos clamar com íntimo amor: "Aba, Pai".',
        questions: [
          'De que maneira o clamor íntimo "Aba, Pai" difere de uma religiosidade baseada no medo servil?',
          'Como você pode combater pensamentos recorrentes de auto-condenação usando a verdade de Romanos 8:1?'
        ]
      },
      {
        week: 4,
        title: 'O Amor Inseparável de Deus',
        passage: 'Romanos 8:28-39',
        passageRef: { bookId: 'ROM', chapter: 8 },
        reflection: 'O ápice da teologia de Paulo é a garantia da soberana segurança do crente. Deus coopera em todas as coisas para o bem dos que O amam. Se Deus é por nós, quem será contra nós? Nenhuma força cósmica, angústia, perseguição ou morte poderá nos separar do amor de Deus que está em Cristo Jesus.',
        questions: [
          'O que significa na prática que "todas as coisas cooperam para o bem" daqueles que amam a Deus?',
          'Como a certeza do amor inseparável de Deus ajuda você a enfrentar adversidades extremas com coragem?'
        ]
      }
    ]
  },
  {
    id: 11,
    monthName: 'Novembro',
    name: 'Santificação e Caminhar',
    title: 'A Fé Prática que se traduz em Obras de Justiça',
    summary: 'Aprofunde-se no chamado à santidade pessoal, no controle da língua, no amor ativo aos pobres e nos frutos do Espírito.',
    keyVerse: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.',
    keyVerseRef: 'Gálatas 5:22',
    theologyFocus: 'Fruto do Espírito, Santificação Progressiva, Tiago e a Fé Viva, Prática do Amor Cristão.',
    weeks: [
      {
        week: 1,
        title: 'Fé Viva e Ativa',
        passage: 'Tiago 2:14-26',
        passageRef: { bookId: 'JAS', chapter: 2 },
        reflection: 'Tiago ensina que uma fé que não produz frutos e obras de amor é morta e inútil. A fé bíblica salvadora não é apenas um assentimento mental à ortodoxia, mas uma confiança viva que se expressa de forma natural e necessária em obediência prática e generosidade com os necessitados.',
        questions: [
          'Se somos salvos somente pela fé, mas a fé salvadora nunca está só, como equilibrar Paulo e Tiago de forma saudável?',
          'Quais obras práticas de amor você tem realizado ultimamente como fruto espontâneo de sua fé?'
        ]
      },
      {
        week: 2,
        title: 'O Poder e o Freio da Língua',
        passage: 'Tiago 3:1-12',
        passageRef: { bookId: 'JAS', chapter: 3 },
        reflection: 'A língua, embora seja um pequeno membro, possui um poder extraordinário para edificar ou destruir. Tiago a compara ao leme de um navio e a uma fagulha que incendeia florestas. O controle das palavras é o teste definitivo de maturidade e genuína espiritualidade cristã.',
        questions: [
          'De que maneira nossas palavras na internet e no convívio diário refletem o estado do nosso coração?',
          'Como você pode usar ativamente suas palavras hoje para abençoar, curar e edificar em vez de ferir?'
        ]
      },
      {
        week: 3,
        title: 'Andar no Espírito e o Fruto',
        passage: 'Gálatas 5:16-26',
        passageRef: { bookId: 'GAL', chapter: 5 },
        reflection: 'A vida cristã é uma batalha constante entre os desejos da carne e os impulsos do Espírito. Andar no Espírito é submeter-se à Sua influência diária, permitindo que Ele cultive em nós o Seu Fruto singular. Esse fruto não é produzido por esforço moralista, mas pela comunhão vital com Cristo.',
        questions: [
          'Quais virtudes do Fruto do Espírito (ex: mansidão, temperança, paz) mais precisam crescer em você no momento?',
          'Como podemos mortificar ativamente os "desejos da carne" no cotidiano moderno?'
        ]
      },
      {
        week: 4,
        title: 'O Hino ao Amor Divino',
        passage: '1 Coríntios 13:1-13',
        passageRef: { bookId: '1CO', chapter: 13 },
        reflection: 'Mesmo que tivéssemos os dons mais espetaculares, realizássemos milagres ou doássemos tudo o que possuímos, se não tivermos amor, nada disso teria valor aos olhos de Deus. O amor cristão (Ágape) é sacrificial, paciente, não invejoso, não orgulhoso e subsistirá quando tudo o mais passar.',
        questions: [
          'Substituindo a palavra "amor" por seu próprio nome em 1 Co 13:4-7, quais discrepâncias gritam mais alto?',
          'Como podemos receber o amor de Deus a fim de transbordá-lo para pessoas difíceis do nosso cotidiano?'
        ]
      }
    ]
  },
  {
    id: 12,
    monthName: 'Dezembro',
    name: 'Escatologia e Nova Criação',
    title: 'A Vinda do Rei e a Consumação de Todas as Coisas',
    summary: 'Aprofunde-se na bem-aventurada esperança da manifestação da glória do Senhor, no julgamento do mal e no estabelecimento da Nova Jerusalém.',
    keyVerse: 'E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor; porque já as primeiras coisas são passadas.',
    keyVerseRef: 'Apocalipse 21:4',
    theologyFocus: 'Parusia (Segunda Vinda de Cristo), Céus Novos e Terra Nova, a Derrota Final de Satanás e a Glória Eterna.',
    weeks: [
      {
        week: 1,
        title: 'A Promessa do Retorno do Senhor',
        passage: '1 Tessalonicenses 4:13-18; 5:1-11',
        passageRef: { bookId: '1TH', chapter: 4 },
        reflection: 'A vinda de Cristo ("Parusia") é a esperança suprema do cristão. Não devemos viver desinformados ou desesperançados quanto aos que dormem em Cristo. O Senhor virá com alarido e voz de arcanjo, reunindo Seus eleitos para viverem para sempre com Ele. Isso nos convoca a vigiar e viver sobriamente.',
        questions: [
          'Como a promessa do retorno de Cristo influencia a maneira como você lida com o luto e as perdas terrestres?',
          'O que significa na prática "viver em vigilância e sobriedade" no mundo contemporâneo?'
        ]
      },
      {
        week: 2,
        title: 'A Revelação de Cristo Glorioso',
        passage: 'Apocalipse 1:9-20',
        passageRef: { bookId: 'REV', chapter: 1 },
        reflection: 'No exílio de Patmos, o apóstolo João vê o Cristo ressuscitado não mais em Sua fraqueza humana, mas em Sua glória deslumbrante: olhos como chama de fogo, pés como bronze polido e Sua voz como som de muitas águas. Ele tem as chaves da morte e do inferno, lembrando a Sua igreja perseguida que Ele é o Soberano.',
        questions: [
          'Como o retrato de Cristo em Apocalipse 1 corrige imagens muito sentimentalistas ou limitadas sobre Jesus?',
          'Como você reage sabendo que Aquele que tem as chaves da morte e do inferno é o seu Pastor e Salvador?'
        ]
      },
      {
        week: 3,
        title: 'A Queda da Grande Babilônia',
        passage: 'Apocalipse 19:1-16',
        passageRef: { bookId: 'REV', chapter: 19 },
        reflection: 'Apocalipse descreve o triunfo definitivo da justiça de Deus contra todos os sistemas de opressão e rebeldia anticristã corporificados na "Babilônia". O Rei dos reis e Senhor dos senhores monta Seu cavalo branco, julgando e guerreando com justiça, restaurando o governo moral absoluto do cosmos.',
        questions: [
          'Por que a justiça divina contra o mal e a opressão é motivo de louvor e "Aleluia" em todo o céu?',
          'Como podemos viver no mundo sem nos contaminarmos com o "vinho da Babilônia" de nosso tempo?'
        ]
      },
      {
        week: 4,
        title: 'A Nova Jerusalém: Sem Pranto ou Dor',
        passage: 'Apocalipse 21:1-27; 22:1-5',
        passageRef: { bookId: 'REV', chapter: 21 },
        reflection: 'A história termina não com a destruição do mundo físico, mas com a restauração gloriosa de todas as coisas: Céus Novos e Terra Nova. A Nova Jerusalém desce do céu, e Deus habitará de forma plena e sem barreiras com os homens. Não haverá mais pecado, sofrimento, morte ou pranto. A criação original é redimida e aperfeiçoada.',
        questions: [
          'Qual promessa da Nova Jerusalém (fim das lágrimas, presença visível de Deus, o Rio da Vida) gera mais expectativa em sua alma?',
          'Como a oração final "Maranata! Ora, vem, Senhor Jesus!" deve guiar nossos suspiros diários?'
        ]
      }
    ]
  }
];

interface MonthlyDevotionalsViewProps {
  onOpenPassage: (bookId: string, chapter: number) => void;
}

export const MonthlyDevotionalsView: React.FC<MonthlyDevotionalsViewProps> = ({ onOpenPassage }) => {
  const { theme } = useTheme();
  
  // Current month of user (0-indexed, Jan is 0, Dec is 11)
  const currentSystemMonth = new Date().getMonth();
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(currentSystemMonth);

  const [activeWeekIndex, setActiveWeekIndex] = useState<number>(0);
  
  // Devotional state: keys like "mX_wY" for completions and text journals
  const [completions, setCompletions] = useState<Record<string, boolean>>({});
  const [journals, setJournals] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const activeTheme = MONTHLY_THEMES[selectedThemeIndex];
  const activeWeek = activeTheme.weeks[activeWeekIndex];

  // Load saved state on mount
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem('jornada_monthly_devotionals_v1');
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        setCompletions(parsed.completions || {});
        setJournals(parsed.journals || {});
      }
    } catch (e) {
      console.error('Error loading devotions from localStorage', e);
    }
  }, []);

  const handleToggleComplete = (themeId: number, weekNum: number) => {
    const key = `theme_${themeId}_week_${weekNum}`;
    const updatedCompletions = {
      ...completions,
      [key]: !completions[key]
    };
    setCompletions(updatedCompletions);
    saveToStorage(updatedCompletions, journals);
  };

  const handleSaveJournal = (themeId: number, weekNum: number, text: string) => {
    const key = `theme_${themeId}_week_${weekNum}`;
    const updatedJournals = {
      ...journals,
      [key]: text
    };
    setJournals(updatedJournals);
    
    setIsSaving(true);
    setSaveSuccess(false);
    
    setTimeout(() => {
      saveToStorage(completions, updatedJournals);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 450);
  };

  const saveToStorage = (comps: Record<string, boolean>, jours: Record<string, string>) => {
    try {
      localStorage.setItem('jornada_monthly_devotionals_v1', JSON.stringify({
        completions: comps,
        journals: jours,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.error('Error saving devotion data', e);
    }
  };

  // Calculations for current theme progress
  const getThemeCompletionStats = (theme: MonthlyTheme) => {
    const totalWeeks = theme.weeks.length;
    let completed = 0;
    theme.weeks.forEach(w => {
      if (completions[`theme_${theme.id}_week_${w.week}`]) {
        completed++;
      }
    });
    const percentage = Math.round((completed / totalWeeks) * 100);
    return { completed, totalWeeks, percentage };
  };

  const activeThemeStats = getThemeCompletionStats(activeTheme);

  // Total annual progress
  const getAnnualProgress = () => {
    let total = 0;
    let completed = 0;
    MONTHLY_THEMES.forEach(theme => {
      theme.weeks.forEach(w => {
        total++;
        if (completions[`theme_${theme.id}_week_${w.week}`]) {
          completed++;
        }
      });
    });
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const annualProgress = getAnnualProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-theme-primary font-modern pb-24 animate-fade-in">
      
      {/* 1. Header Hero Panel with theological atmosphere */}
      <div className="relative overflow-hidden rounded-3xl border border-theme bg-theme-card p-6 sm:p-8 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-accent/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#D4A24C]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#D4A24C]">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-sans font-extrabold uppercase tracking-widest">
                Scriptorium Acadêmico
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-classic font-bold text-theme-primary">
              Centro de Estudos e Devocionais Mensais
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary font-manuscript max-w-2xl italic leading-relaxed">
              Descubra um plano exegético estruturado para cada mês do ano. Aprofunde-se na teologia sistemática de temas centrais por meio de leituras, análises e questionários práticos.
            </p>
          </div>

          {/* Annual Progress Shield Badge */}
          <div className="shrink-0 flex flex-col items-center justify-center p-4 bg-theme-app border border-theme rounded-2xl w-28 text-center">
            <Award className="w-6 h-6 text-[#D4A24C] mb-1 animate-pulse" />
            <span className="text-[10px] font-sans font-bold text-theme-muted uppercase tracking-wider">Ano Teológico</span>
            <span className="font-classic font-bold text-lg text-theme-primary mt-1">{annualProgress.percentage}%</span>
            <span className="text-[9px] text-theme-secondary mt-0.5">{annualProgress.completed}/{annualProgress.total} Concluídos</span>
          </div>
        </div>

        {/* Month Selector Carousel slider */}
        <div className="mt-6 pt-5 border-t border-theme/60 overflow-x-auto no-scrollbar flex items-center gap-1.5 scroll-smooth">
          {MONTHLY_THEMES.map((theme, idx) => {
            const isSelected = selectedThemeIndex === idx;
            const isSystemMonth = currentSystemMonth === idx;
            const stats = getThemeCompletionStats(theme);
            
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedThemeIndex(idx);
                  setActiveWeekIndex(0);
                }}
                className={`px-3 py-2 rounded-xl border flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer text-xs font-sans font-bold relative ${
                  isSelected
                    ? 'bg-[#3E5641] dark:bg-[#D4A24C] text-white dark:text-[#1F1B16] border-[#3E5641] dark:border-[#D4A24C] shadow-3xs'
                    : 'bg-theme-card border-theme text-theme-muted hover:text-theme-primary hover:border-theme-accent/20'
                }`}
              >
                {isSystemMonth && !isSelected && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-accent"></span>
                  </span>
                )}
                <span>{theme.monthName}</span>
                {stats.percentage > 0 && (
                  <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-theme-accent/10 text-theme-accent'
                  }`}>
                    {stats.percentage}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Theme Card Info & Focus of the Month */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Month Summary & Theological Focus */}
        <div className="md:col-span-1 p-5 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-theme space-y-4 shadow-3xs">
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-extrabold text-[#D4A24C] uppercase tracking-widest block">
              Tema de {activeTheme.monthName}
            </span>
            <h3 className="font-classic font-bold text-lg text-theme-primary">
              {activeTheme.name}
            </h3>
            <p className="text-xs text-theme-secondary leading-relaxed">
              {activeTheme.title}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-theme-app border border-theme/80 space-y-2">
            <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-[#D4A24C]" />
              Foco Teológico
            </span>
            <p className="text-[11px] font-mono text-theme-primary leading-normal">
              {activeTheme.theologyFocus}
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
              Versículo-Chave da Aliança
            </span>
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 relative">
              <span className="absolute -top-2.5 -left-1 text-2xl font-serif text-[#D4A24C] opacity-40">“</span>
              <p className="text-xs font-serif italic text-theme-primary leading-relaxed">
                {activeTheme.keyVerse}
              </p>
              <p className="text-[10px] font-sans font-extrabold text-theme-accent text-right mt-2">
                — {activeTheme.keyVerseRef}
              </p>
            </div>
          </div>

          {/* Monthly Completion Progress */}
          <div className="pt-3 border-t border-theme/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-sans font-extrabold">
              <span className="text-theme-muted uppercase tracking-wider">Conclusão do Mês</span>
              <span className="text-theme-accent">{activeThemeStats.percentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-theme-app overflow-hidden border border-theme">
              <div 
                className="h-full bg-[#3E5641] dark:bg-[#D4A24C] rounded-full transition-all duration-500"
                style={{ width: `${activeThemeStats.percentage}%` }}
              />
            </div>
            <p className="text-[10px] text-theme-secondary text-center">
              {activeThemeStats.completed} de {activeThemeStats.totalWeeks} lições finalizadas
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Weekly Devotions */}
        <div className="md:col-span-2 space-y-4">
          {/* Week list header tab bar */}
          <div className="flex p-0.5 rounded-2xl bg-theme-app border border-theme text-xs font-sans font-bold">
            {activeTheme.weeks.map((wk, idx) => {
              const isWeekActive = activeWeekIndex === idx;
              const isWeekCompleted = completions[`theme_${activeTheme.id}_week_${wk.week}`];
              
              return (
                <button
                  key={wk.week}
                  onClick={() => setActiveWeekIndex(idx)}
                  className={`flex-1 py-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 relative cursor-pointer ${
                    isWeekActive 
                      ? 'bg-white dark:bg-stone-800 text-theme-accent shadow-3xs font-extrabold' 
                      : 'text-theme-muted hover:text-theme-primary'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Semana {wk.week}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] truncate max-w-[80px] sm:max-w-none">{wk.title}</span>
                    {isWeekCompleted && (
                      <Check className="w-3 h-3 text-[#3E5641] dark:text-[#D4A24C] shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Weekly Devotional details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTheme.id}_${activeWeek.week}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="p-6 rounded-3xl bg-theme-card border border-theme space-y-5 shadow-3xs"
            >
              {/* Devotional metadata */}
              <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap pb-3 border-b border-theme/60">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-theme-accent/10 border border-theme-accent/20 text-theme-accent font-sans font-extrabold text-[9px] uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    <span>Estudo da Semana {activeWeek.week}</span>
                  </div>
                  <h4 className="font-classic font-bold text-xl text-theme-primary leading-tight">
                    {activeWeek.title}
                  </h4>
                </div>

                {/* Mark as Completed toggle button */}
                <button
                  onClick={() => handleToggleComplete(activeTheme.id, activeWeek.week)}
                  className={`px-4 py-2 rounded-xl border text-xs font-sans font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    completions[`theme_${activeTheme.id}_week_${activeWeek.week}`]
                      ? 'bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] border-[#3E5641]/30 hover:bg-[#3E5641]/15'
                      : 'bg-[#3E5641] hover:bg-[#324534] dark:bg-[#D4A24C] dark:hover:bg-[#B28236] text-white dark:text-[#1F1B16] border-transparent shadow-3xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completions[`theme_${activeTheme.id}_week_${activeWeek.week}`]
                      ? 'Estudo Concluído!'
                      : 'Marcar Concluído'}
                  </span>
                </button>
              </div>

              {/* Bible passage to read */}
              <div className="p-4 rounded-2xl bg-theme-app border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-accent/10 text-theme-accent flex items-center justify-center border border-theme-accent/15 shrink-0">
                    <BookOpen className="w-5 h-5 text-[#D4A24C]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                      LEITURA BÍBLICA RECOMENDADA
                    </span>
                    <span className="font-classic font-bold text-sm text-theme-primary mt-0.5 block">
                      {activeWeek.passage}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenPassage(activeWeek.passageRef.bookId, activeWeek.passageRef.chapter)}
                  className="px-3 py-1.5 rounded-xl border border-[#E7DECF] dark:border-stone-850 hover:bg-[#F7F1E5] dark:hover:bg-stone-900 text-xs font-sans font-extrabold text-theme-accent flex items-center gap-1.5 cursor-pointer shadow-3xs transition-all"
                >
                  <span>Abrir no Leitor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Exegesis / Reflection content text */}
              <div className="space-y-2">
                <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  Exegese & Reflexão Acadêmica
                </span>
                <p className="text-xs sm:text-sm text-theme-secondary font-manuscript leading-relaxed italic pr-1">
                  {activeWeek.reflection}
                </p>
              </div>

              {/* Reflections Questions and Interactive Journal */}
              <div className="space-y-4 pt-4 border-t border-theme/60">
                <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  Perguntas de Fixação & Diário de Bordo
                </span>

                <div className="space-y-3">
                  {activeWeek.questions.map((q, qidx) => (
                    <div key={qidx} className="flex gap-2 text-xs text-theme-primary">
                      <span className="font-mono text-theme-accent font-extrabold">{qidx + 1}.</span>
                      <p className="font-sans leading-relaxed text-theme-secondary">{q}</p>
                    </div>
                  ))}
                </div>

                {/* Journal form field */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-sans font-bold text-theme-muted uppercase tracking-wider block">
                    Seu Diário Espiritual (Respostas, Orações e Anotações)
                  </label>
                  <JournalArea 
                    themeId={activeTheme.id}
                    weekNum={activeWeek.week}
                    initialText={journals[`theme_${activeTheme.id}_week_${activeWeek.week}`] || ''}
                    onSave={(text) => handleSaveJournal(activeTheme.id, activeWeek.week, text)}
                    isSaving={isSaving}
                    saveSuccess={saveSuccess}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface JournalAreaProps {
  themeId: number;
  weekNum: number;
  initialText: string;
  onSave: (text: string) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

const JournalArea: React.FC<JournalAreaProps> = ({ 
  themeId, 
  weekNum, 
  initialText, 
  onSave, 
  isSaving, 
  saveSuccess 
}) => {
  const [text, setText] = useState<string>(initialText);

  // Sync state if index shifts
  useEffect(() => {
    setText(initialText);
  }, [themeId, weekNum, initialText]);

  return (
    <div className="space-y-2 relative">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva aqui suas reflexões, respostas às perguntas acima ou uma oração devocional para este tema. Suas notas serão sincronizadas e armazenadas de forma segura..."
        rows={4}
        className="w-full p-4 bg-theme-app dark:bg-stone-900/60 border border-theme rounded-2xl text-xs sm:text-sm font-sans text-theme-primary focus:outline-none focus:border-[#3E5641] dark:focus:border-[#D4A24C] transition-colors shadow-3xs placeholder-stone-400 dark:placeholder-stone-600 resize-y"
      />
      
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] text-stone-400 dark:text-stone-600 font-sans italic">
          {text.length} caracteres inseridos
        </span>

        <button
          onClick={() => onSave(text)}
          disabled={isSaving}
          className="px-4 py-2 rounded-xl bg-theme-app border border-theme hover:bg-theme-card-hover/80 text-[#3E5641] dark:text-amber-100 font-sans font-extrabold text-[10px] uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 shadow-3xs"
        >
          {isSaving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : saveSuccess ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{isSaving ? 'Salvando...' : saveSuccess ? 'Salvo!' : 'Salvar Diário'}</span>
        </button>
      </div>
    </div>
  );
};
