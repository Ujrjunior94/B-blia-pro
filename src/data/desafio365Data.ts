export interface DesafioWeek {
  weekNumber: number;
  theme: string;
  reflection: string;
  meditationQuestions: string[];
  practicalApplication: string;
  readings: {
    day: number;
    title: string;
    passage: string;
    bookId: string;
    chapter: number;
  }[];
}

export const DESAFIO_WEEKS: DesafioWeek[] = [
  {
    weekNumber: 1,
    theme: "O Deus da Criação e o Início de Todas as Coisas",
    reflection: "Tudo começa em Deus. O livro de Gênesis abre as cortinas do tempo revelando que o universo não é fruto do acaso, mas da palavra criadora e intencional do Eterno. Ao contemplar o sopro de vida em Adão e a vinda da verdadeira Luz ao mundo (João 1), entendemos que nossa origem e propósito estão Nele. A criação é o grande palco onde Deus manifestará Seu plano redentor através de Jesus Cristo.",
    meditationQuestions: [
      "De que forma o fato de Deus ter criado todas as coisas intencionalmente traz significado para a sua vida pessoal?",
      "Como você pode alinhar o início do seu dia (ou do seu ano) sob o governo da soberana palavra de Deus?",
      "Ao ler João 1, qual a relação que você percebe entre a criação do mundo e a encarnação de Jesus Cristo?"
    ],
    practicalApplication: "Dedique os primeiros 15 minutos do seu dia para contemplar o Criador em silêncio. Entregue em oração os seus projetos, reconhecendo que Ele é o Alfa e o Ômega de tudo o que você realiza.",
    readings: [
      { day: 1, title: "A Criação do Universo", passage: "Gênesis 1", bookId: "GEN", chapter: 1 },
      { day: 2, title: "A Criação do Homem e o Jardim", passage: "Gênesis 2", bookId: "GEN", chapter: 2 },
      { day: 3, title: "A Queda e a Primeira Promessa da Redenção", passage: "Gênesis 3", bookId: "GEN", chapter: 3 },
      { day: 4, title: "O Crescimento do Pecado e a Graça em Noé", passage: "Gênesis 4", bookId: "GEN", chapter: 4 },
      { day: 5, title: "O Altar de Noé e o Pacto da Aliança", passage: "Gênesis 8", bookId: "GEN", chapter: 8 },
      { day: 6, title: "A Chamada de Abraão e a Promessa das Nações", passage: "Gênesis 12", bookId: "GEN", chapter: 12 },
      { day: 7, title: "O Verbo Eterno se Fez Carne", passage: "João 1", bookId: "JHN", chapter: 1 }
    ]
  },
  {
    weekNumber: 2,
    theme: "A Aliança da Promessa e a Provisão Divina",
    reflection: "Deus não apenas cria; Ele entra em aliança com Suas criaturas. A história de Abraão e Isaac ilustra o teste supremo da fé e nos dá um vislumbre maravilhoso do Calvário: o Pai que não poupou Seu próprio Filho, mas o entregou por todos nós. Na provisão do cordeiro no monte Moriá, vemos o coração gracioso de Jeová Jireh (o Senhor Proverá), cujo maior presente é o Cordeiro que tira o pecado do mundo.",
    meditationQuestions: [
      "Quais áreas de sua vida exigem que você confie plenamente na provisão de Deus, mesmo sem ver o cordeiro antecipadamente?",
      "Como a atitude de Abraão ao obedecer a Deus inspira sua própria atitude de consagração e submissão?",
      "Ao olhar para Jesus Cristo como a provisão definitiva, que tipo de descanso e paz isso gera no seu coração?"
    ],
    practicalApplication: "Faça uma lista de três grandes provisões que Deus já te concedeu no passado. Quando bater o desânimo ou o medo do futuro, leia essa lista em voz alta e agradeça a Deus por Sua fidelidade eterna.",
    readings: [
      { day: 8, title: "Deus Confirma a Aliança com Abrão", passage: "Gênesis 15", bookId: "GEN", chapter: 15 },
      { day: 9, title: "A Aliança do Selo e a Promessa de Isaque", passage: "Gênesis 17", bookId: "GEN", chapter: 17 },
      { day: 10, title: "O Sacrifício de Isaque e Jeová Jireh", passage: "Gênesis 22", bookId: "GEN", chapter: 22 },
      { day: 11, title: "A Promessa Renovada a Jacó em Betel", passage: "Gênesis 28", bookId: "GEN", chapter: 28 },
      { day: 12, title: "O Encontro Transformador de Peniel", passage: "Gênesis 32", bookId: "GEN", chapter: 32 },
      { day: 13, title: "O Cordeiro Provido por Deus", passage: "João 1:29-51", bookId: "JHN", chapter: 1 },
      { day: 14, title: "O Primeiro Sinal da Provisão em Caná", passage: "João 2", bookId: "JHN", chapter: 2 }
    ]
  },
  {
    weekNumber: 3,
    theme: "Redenção, Libertação e a Páscoa do Cordeiro",
    reflection: "No Êxodo, vemos o Deus que ouve o clamor de Seu povo escravizado e desce para libertá-los. O sangue do cordeiro aspergido nos umbrais das portas salvou os primogênitos do julgamento e marcou o nascimento da Páscoa. Essa poderosa libertação é a sombra perfeita da cruz de Cristo, nossa Páscoa eterna, cujo sangue nos resgata do poder do pecado, do medo da morte e da escravidão espiritual.",
    meditationQuestions: [
      "Você se sente verdadeiramente livre em Cristo ou ainda carrega amarras de escravidão do passado?",
      "De que forma o sangue aspergido na Páscoa do Êxodo aumenta sua gratidão pelo sangue derramado de Jesus Cristo na cruz?",
      "Qual papel a Palavra e os mandamentos de Deus devem desempenhar na vida de um povo que foi liberto por pura graça?"
    ],
    practicalApplication: "Interceda hoje por pessoas que você conhece que ainda vivem sob escravidões emocionais ou espirituais (vícios, mágoa, medo). Ore para que elas conheçam a verdadeira libertação que há na Páscoa de Cristo.",
    readings: [
      { day: 15, title: "Deus Ouve o Clamor e Revela Seu Nome", passage: "Êxodo 3", bookId: "EXO", chapter: 3 },
      { day: 16, title: "A Instituição da Páscoa e o Sangue do Cordeiro", passage: "Êxodo 12", bookId: "EXO", chapter: 12 },
      { day: 17, title: "A Travessia do Mar Vermelho", passage: "Êxodo 14", bookId: "EXO", chapter: 14 },
      { day: 18, title: "O Pão do Céu no Deserto", passage: "Êxodo 16", bookId: "EXO", chapter: 16 },
      { day: 19, title: "A Aliança e os Dez Mandamentos no Sinai", passage: "Êxodo 20", bookId: "EXO", chapter: 20 },
      { day: 20, title: "O Diálogo com Nicodemos sobre o Novo Nascimento", passage: "João 3", bookId: "JHN", chapter: 3 },
      { day: 21, title: "A Fonte de Água Viva para a Samaritana", passage: "João 4", bookId: "JHN", chapter: 4 }
    ]
  },
  {
    weekNumber: 4,
    theme: "Santidade, Sacerdócio e o Tabernáculo de Deus",
    reflection: "Como pode um Deus Santo habitar com um povo imperfeito? Através do tabernáculo, dos sacrifícios e da intercessão do sumo sacerdote, Deus revelou o caminho de aproximação. Mas tudo isso era provisório. Hoje, Jesus é o nosso Sumo Sacerdote perfeito, que entrou no santuário definitivo com Seu próprio sangue e rasgou o véu. Agora temos livre acesso à presença do Pai e somos transformados em templos vivos do Espírito Santo.",
    meditationQuestions: [
      "De que maneira o livre acesso à presença de Deus (o véu rasgado) tem sido valorizado em sua vida diária de oração?",
      "Como o chamado à santidade em Levítico se traduz em sua vida diária hoje no trabalho, na família e no uso do seu tempo?",
      "Ao contemplar Jesus como o verdadeiro Tabernáculo ('habitou entre nós'), como você experimenta a comunhão contínua com Ele?"
    ],
    practicalApplication: "Faça um jejum ou uma abstinência simples (de redes sociais, entretenimento ou alguma comida) por um dia desta semana. Use o tempo ganho para buscar a Deus em adoração e leitura.",
    readings: [
      { day: 22, title: "A Instrução para Erguer o Tabernáculo", passage: "Êxodo 25", bookId: "EXO", chapter: 25 },
      { day: 23, title: "A Glória do Senhor Enche o Tabernáculo", passage: "Êxodo 40", bookId: "EXO", chapter: 40 },
      { day: 24, title: "O Chamado à Santidade do Povo de Deus", passage: "Levítico 19", bookId: "LEV", chapter: 19 },
      { day: 25, title: "O Grande Dia da Expiação (Yom Kippur)", passage: "Levítico 16", bookId: "LEV", chapter: 16 },
      { day: 26, title: "A Bênção Sacerdotal e a Nuvem Divina", passage: "Números 6", bookId: "NUM", chapter: 6 },
      { day: 27, title: "Jesus, Aquele que Tem Autoridade para Curar e Salvar", passage: "João 5", bookId: "JHN", chapter: 5 },
      { day: 28, title: "A Multiplicação e o Sermão do Pão da Vida", passage: "João 6", bookId: "JHN", chapter: 6 }
    ]
  }
];
