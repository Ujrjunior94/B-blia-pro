import { Verse, OriginalWord } from '../types';

export const SAMPLE_VERSES: Record<string, Verse[]> = {
  // Gênesis 1 (ARC / NAA / Interlinear)
  'GEN-1-ARC': [
    { bookId: 'GEN', chapter: 1, verse: 1, text: 'No princípio, criou Deus os céus e a terra.' },
    { bookId: 'GEN', chapter: 1, verse: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
    { bookId: 'GEN', chapter: 1, verse: 3, text: 'E disse Deus: Haja luz. E houve luz.' },
    { bookId: 'GEN', chapter: 1, verse: 4, text: 'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.' },
    { bookId: 'GEN', chapter: 1, verse: 5, text: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã: o dia primeiro.' },
    { bookId: 'GEN', chapter: 1, verse: 26, text: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra.' },
    { bookId: 'GEN', chapter: 1, verse: 27, text: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.' },
    { bookId: 'GEN', chapter: 1, verse: 31, text: 'E viu Deus tudo quanto fizera, e eis que era muito bom; e foi a tarde e a manhã: o dia sexto.' },
  ],
  'GEN-1-INTERLINEAR': [
    {
      bookId: 'GEN',
      chapter: 1,
      verse: 1,
      text: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
      originalWords: [
        {
          position: 1,
          surfaceText: 'בְּרֵאשִׁית',
          transliteration: 'be-reshith',
          strongNumber: 'H7225',
          portugueseGloss: 'No princípio',
          lemma: 'רֵאשִׁית',
          morphologyCode: 'Prep + Noun Fem Sing',
          morphologyDescription: 'Preposição "B" (em/no) + Substantivo Feminino Singular (princípio/origem)',
        },
        {
          position: 2,
          surfaceText: 'בָּרָא',
          transliteration: 'bara',
          strongNumber: 'H1254',
          portugueseGloss: 'criou',
          lemma: 'בָּרָא',
          morphologyCode: 'Verb Qal Perf 3ms',
          morphologyDescription: 'Verbo Tronco Qal Perfeito 3ª Pessoa Masculino Singular',
        },
        {
          position: 3,
          surfaceText: 'אֱלֹהִים',
          transliteration: 'Elohim',
          strongNumber: 'H430',
          portugueseGloss: 'Deus',
          lemma: 'אֱלֹהִים',
          morphologyCode: 'Noun Masc Plur',
          morphologyDescription: 'Substantivo Masculino Plural de Majestade',
        },
        {
          position: 4,
          surfaceText: 'אֵת',
          transliteration: 'et',
          strongNumber: 'H853',
          portugueseGloss: '[sinal de objeto direto]',
          lemma: 'אֵת',
          morphologyCode: 'Particle',
          morphologyDescription: 'Partícula não traduzida que indica objeto direto definido',
        },
        {
          position: 5,
          surfaceText: 'הַשָּׁמַיִם',
          transliteration: 'ha-shamayim',
          strongNumber: 'H8064',
          portugueseGloss: 'os céus',
          lemma: 'שָׁמַיִם',
          morphologyCode: 'Art + Noun Masc Dual/Plur',
          morphologyDescription: 'Artigo Definido "Ha" + Substantivo Masculino Plural',
        },
        {
          position: 6,
          surfaceText: 'וְאֵת',
          transliteration: 've-et',
          strongNumber: 'H853',
          portugueseGloss: 'e [sinal de objeto]',
          lemma: 'אֵת',
          morphologyCode: 'Conj + Particle',
          morphologyDescription: 'Conjunção "Ve" (e) + Partícula de Objeto',
        },
        {
          position: 7,
          surfaceText: 'הָאָרֶץ',
          transliteration: 'ha-aretz',
          strongNumber: 'H776',
          portugueseGloss: 'a terra',
          lemma: 'אֶרֶץ',
          morphologyCode: 'Art + Noun Fem Sing',
          morphologyDescription: 'Artigo Definido "Ha" + Substantivo Feminino Singular (terra/solo)',
        },
      ],
    },
    {
      bookId: 'GEN',
      chapter: 1,
      verse: 3,
      text: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי אוֹר',
      originalWords: [
        {
          position: 1,
          surfaceText: 'וַיֹּאמֶר',
          transliteration: 'vay-yomer',
          strongNumber: 'H559',
          portugueseGloss: 'E disse',
          lemma: 'אָמַר',
          morphologyCode: 'Conj + Verb Qal Imperf 3ms',
          morphologyDescription: 'Conjunção Waw Consecutivo + Verbo Qal Imperfeito 3ms',
        },
        {
          position: 2,
          surfaceText: 'אֱלֹהִים',
          transliteration: 'Elohim',
          strongNumber: 'H430',
          portugueseGloss: 'Deus',
          lemma: 'אֱלֹהִים',
          morphologyCode: 'Noun Masc Plur',
          morphologyDescription: 'Substantivo Masculino Plural de Majestade',
        },
        {
          position: 3,
          surfaceText: 'יְהִי',
          transliteration: 'yehi',
          strongNumber: 'H1961',
          portugueseGloss: 'Haja / Seja',
          lemma: 'הָיָה',
          morphologyCode: 'Verb Qal Jussive 3ms',
          morphologyDescription: 'Verbo Qal Jussivo 3ª Pessoa Masculino Singular',
        },
        {
          position: 4,
          surfaceText: 'אוֹר',
          transliteration: 'or',
          strongNumber: 'H216',
          portugueseGloss: 'luz',
          lemma: 'אוֹר',
          morphologyCode: 'Noun Fem/Masc Sing',
          morphologyDescription: 'Substantivo Singular (luz, iluminação)',
        },
        {
          position: 5,
          surfaceText: 'וַיְהִי',
          transliteration: 'vay-hi',
          strongNumber: 'H1961',
          portugueseGloss: 'e houve',
          lemma: 'הָיָה',
          morphologyCode: 'Conj + Verb Qal Imperf 3ms',
          morphologyDescription: 'Conjunção Waw + Verbo Qal Imperfeito',
        },
        {
          position: 6,
          surfaceText: 'אוֹר',
          transliteration: 'or',
          strongNumber: 'H216',
          portugueseGloss: 'luz',
          lemma: 'אוֹר',
          morphologyCode: 'Noun Singular',
          morphologyDescription: 'Substantivo Singular',
        },
      ],
    },
  ],

  // João 1 (ARC / NAA / Interlinear)
  'JHN-1-ARC': [
    { bookId: 'JHN', chapter: 1, verse: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
    { bookId: 'JHN', chapter: 1, verse: 2, text: 'Ele estava no princípio com Deus.' },
    { bookId: 'JHN', chapter: 1, verse: 3, text: 'Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.' },
    { bookId: 'JHN', chapter: 1, verse: 4, text: 'Nele estava a vida e a vida era a luz dos homens.' },
    { bookId: 'JHN', chapter: 1, verse: 5, text: 'E a luz resplandece nas trevas, e as trevas não a derrotaram.' },
    { bookId: 'JHN', chapter: 1, verse: 14, text: 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória, como a glória do Unigênito do Pai, cheio de graça e de verdade.' },
    { bookId: 'JHN', chapter: 1, verse: 29, text: 'No dia seguinte, João viu a Jesus, que vinha para ele, e disse: Eis o Cordeiro de Deus, que tira o pecado do mundo.' },
  ],
  'JHN-1-INTERLINEAR': [
    {
      bookId: 'JHN',
      chapter: 1,
      verse: 1,
      text: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
      originalWords: [
        {
          position: 1,
          surfaceText: 'Ἐν',
          transliteration: 'En',
          strongNumber: 'G1722',
          portugueseGloss: 'Em / No',
          lemma: 'ἐν',
          morphologyCode: 'Prep',
          morphologyDescription: 'Preposição que rege o Dativo (em, dentro de)',
        },
        {
          position: 2,
          surfaceText: 'ἀρχῇ',
          transliteration: 'arche',
          strongNumber: 'G746',
          portugueseGloss: 'princípio',
          lemma: 'ἀρχή',
          morphologyCode: 'Noun Fem Dat Sing',
          morphologyDescription: 'Substantivo Feminino Dativo Singular (princípio/origem)',
        },
        {
          position: 3,
          surfaceText: 'ἦν',
          transliteration: 'en',
          strongNumber: 'G1510',
          portugueseGloss: 'era',
          lemma: 'εἰμί',
          morphologyCode: 'Verb Imperf Act 3s',
          morphologyDescription: 'Verbo Imperfeito Ativo 3ª Pessoa Singular (existia continuamente)',
        },
        {
          position: 4,
          surfaceText: 'ὁ',
          transliteration: 'ho',
          strongNumber: 'G3588',
          portugueseGloss: 'o',
          lemma: 'ὁ',
          morphologyCode: 'Art Masc Nom Sing',
          morphologyDescription: 'Artigo Definido Masculino Nominativo Singular',
        },
        {
          position: 5,
          surfaceText: 'λόγος',
          transliteration: 'logos',
          strongNumber: 'G3056',
          portugueseGloss: 'Verbo / Palavra',
          lemma: 'λόγος',
          morphologyCode: 'Noun Masc Nom Sing',
          morphologyDescription: 'Substantivo Masculino Nominativo Singular',
        },
        {
          position: 6,
          surfaceText: 'καὶ',
          transliteration: 'kai',
          strongNumber: 'G2532',
          portugueseGloss: 'e',
          lemma: 'καί',
          morphologyCode: 'Conj',
          morphologyDescription: 'Conjunção aditiva (e, também)',
        },
        {
          position: 7,
          surfaceText: 'ὁ',
          transliteration: 'ho',
          strongNumber: 'G3588',
          portugueseGloss: 'o',
          lemma: 'ὁ',
          morphologyCode: 'Art',
          morphologyDescription: 'Artigo Definido',
        },
        {
          position: 8,
          surfaceText: 'λόγος',
          transliteration: 'logos',
          strongNumber: 'G3056',
          portugueseGloss: 'Verbo',
          lemma: 'λόγος',
          morphologyCode: 'Noun',
          morphologyDescription: 'Substantivo',
        },
        {
          position: 9,
          surfaceText: 'ἦν',
          transliteration: 'en',
          strongNumber: 'G1510',
          portugueseGloss: 'estava',
          lemma: 'εἰμί',
          morphologyCode: 'Verb Imperf',
          morphologyDescription: 'Verbo Imperfeito',
        },
        {
          position: 10,
          surfaceText: 'πρὸς',
          transliteration: 'pros',
          strongNumber: 'G4314',
          portugueseGloss: 'com / junto a',
          lemma: 'πρός',
          morphologyCode: 'Prep Acc',
          morphologyDescription: 'Preposição com Acusativo (em comunhão face a face com)',
        },
        {
          position: 11,
          surfaceText: 'τὸν',
          transliteration: 'ton',
          strongNumber: 'G3588',
          portugueseGloss: 'o',
          lemma: 'ὁ',
          morphologyCode: 'Art Acc',
          morphologyDescription: 'Artigo Acusativo',
        },
        {
          position: 12,
          surfaceText: 'θεόν',
          transliteration: 'theon',
          strongNumber: 'G2316',
          portugueseGloss: 'Deus',
          lemma: 'θεός',
          morphologyCode: 'Noun Masc Acc Sing',
          morphologyDescription: 'Substantivo Masculino Acusativo Singular',
        },
        {
          position: 13,
          surfaceText: 'καὶ',
          transliteration: 'kai',
          strongNumber: 'G2532',
          portugueseGloss: 'e',
          lemma: 'καί',
          morphologyCode: 'Conj',
          morphologyDescription: 'Conjunção',
        },
        {
          position: 14,
          surfaceText: 'θεὸς',
          transliteration: 'theos',
          strongNumber: 'G2316',
          portugueseGloss: 'Deus (em essência)',
          lemma: 'θεός',
          morphologyCode: 'Noun Masc Nom Sing',
          morphologyDescription: 'Predicativo do Sujeito sem artigo (expressa natureza divina)',
        },
        {
          position: 15,
          surfaceText: 'ἦν',
          transliteration: 'en',
          strongNumber: 'G1510',
          portugueseGloss: 'era',
          lemma: 'εἰμί',
          morphologyCode: 'Verb Imperf',
          morphologyDescription: 'Verbo Imperfeito',
        },
        {
          position: 16,
          surfaceText: 'ὁ',
          transliteration: 'ho',
          strongNumber: 'G3588',
          portugueseGloss: 'o',
          lemma: 'ὁ',
          morphologyCode: 'Art',
          morphologyDescription: 'Artigo Definido',
        },
        {
          position: 17,
          surfaceText: 'λόγος',
          transliteration: 'logos',
          strongNumber: 'G3056',
          portugueseGloss: 'Verbo',
          lemma: 'λόγος',
          morphologyCode: 'Noun',
          morphologyDescription: 'Substantivo',
        },
      ],
    },
  ],

  // Salmos 23
  'PSA-23-ARC': [
    { bookId: 'PSA', chapter: 23, verse: 1, text: 'O SENHOR é o meu pastor; nada me faltará.' },
    { bookId: 'PSA', chapter: 23, verse: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
    { bookId: 'PSA', chapter: 23, verse: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
    { bookId: 'PSA', chapter: 23, verse: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
    { bookId: 'PSA', chapter: 23, verse: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
    { bookId: 'PSA', chapter: 23, verse: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do SENHOR por longos dias.' },
  ],

  // Romanos 8
  'ROM-8-ARC': [
    { bookId: 'ROM', chapter: 8, verse: 1, text: 'Portanto, agora, nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.' },
    { bookId: 'ROM', chapter: 8, verse: 28, text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.' },
    { bookId: 'ROM', chapter: 8, verse: 31, text: 'Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?' },
    { bookId: 'ROM', chapter: 8, verse: 38, text: 'Porque estou certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir,' },
    { bookId: 'ROM', chapter: 8, verse: 39, text: 'nem a altura, nem a profundidade, nem qualquer outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus, nosso Senhor!' },
  ],
};

import { getBookById } from './bibleBooks';

const HEBREW_POOL: Omit<OriginalWord, 'position'>[] = [
  { surfaceText: 'בְּרֵאשִׁית', transliteration: 'be-reshith', strongNumber: 'H7225', portugueseGloss: 'No princípio', lemma: 'רֵאשִׁית', morphologyCode: 'Prep + Noun Fem Sing', morphologyDescription: 'Preposição "B" (em) + Substantivo Feminino Singular (princípio)' },
  { surfaceText: 'בָּרָא', transliteration: 'bara', strongNumber: 'H1254', portugueseGloss: 'criou', lemma: 'בָּרָא', morphologyCode: 'Verb Qal Perf 3ms', morphologyDescription: 'Verbo Qal Perfeito 3ms (criar)' },
  { surfaceText: 'אֱלֹהִים', transliteration: 'Elohim', strongNumber: 'H430', portugueseGloss: 'Deus', lemma: 'אֱלֹהִים', morphologyCode: 'Noun Masc Plur', morphologyDescription: 'Substantivo Masculino Plural de Majestade' },
  { surfaceText: 'יְהוָה', transliteration: 'Yahweh', strongNumber: 'H3068', portugueseGloss: 'o SENHOR', lemma: 'יְהוָה', morphologyCode: 'Proper Noun Masc', morphologyDescription: 'Nome Divino de Deus (Tetragrámaton)' },
  { surfaceText: 'הַשָּׁמัיִם', transliteration: 'ha-shamayim', strongNumber: 'H8064', portugueseGloss: 'os céus', lemma: 'שָׁמַיִם', morphologyCode: 'Art + Noun Masc Plur', morphologyDescription: 'Artigo "Ha" + Substantivo Masculino Plural (céus)' },
  { surfaceText: 'הָאָרֶץ', transliteration: 'ha-aretz', strongNumber: 'H776', portugueseGloss: 'a terra', lemma: 'אֶרֶץ', morphologyCode: 'Art + Noun Fem Sing', morphologyDescription: 'Artigo "Ha" + Substantivo Feminino Singular (terra)' },
  { surfaceText: 'רֹعִי', transliteration: 'roi', strongNumber: 'H7462', portugueseGloss: 'meu pastor', lemma: 'רָעָה', morphologyCode: 'Noun Masc Sing + Suff', morphologyDescription: 'Substantivo Masculino Singular (pastor) + Sufixo Pessoal 1cs (meu)' },
  { surfaceText: 'לֹא', transliteration: 'lo', strongNumber: 'H3808', portugueseGloss: 'não', lemma: 'לֹא', morphologyCode: 'Negative Particle', morphologyDescription: 'Partícula de negação absoluta' },
  { surfaceText: 'אֶחְסָר', transliteration: 'echsar', strongNumber: 'H2637', portugueseGloss: 'faltará', lemma: 'חָסֵר', morphologyCode: 'Verb Qal Imperf 1cs', morphologyDescription: 'Verbo Qal Imperfeito 1ª pessoa comum singular (faltar)' },
  { surfaceText: 'דָּבָר', transliteration: 'dabar', strongNumber: 'H1697', portugueseGloss: 'palavra', lemma: 'דָּבָר', morphologyCode: 'Noun Masc Sing', morphologyDescription: 'Substantivo Masculino Singular (palavra, promessa)' },
  { surfaceText: 'חֶסֶד', transliteration: 'chesed', strongNumber: 'H2617', portugueseGloss: 'misericórdia', lemma: 'חֶסֶד', morphologyCode: 'Noun Masc Sing', morphologyDescription: 'Substantivo Masculino Singular (amor leal, graça aliançada)' },
  { surfaceText: 'אֱמֶת', transliteration: 'emet', strongNumber: 'H571', portugueseGloss: 'verdade', lemma: 'אֱמֶת', morphologyCode: 'Noun Fem Sing', morphologyDescription: 'Substantivo Feminino Singular (confiabilidade, verdade)' },
  { surfaceText: 'שָׁלוֹם', transliteration: 'shalom', strongNumber: 'H7965', portugueseGloss: 'paz', lemma: 'שָׁלוֹם', morphologyCode: 'Noun Masc Sing', morphologyDescription: 'Substantivo Masculino Singular (paz, totalidade, integridade)' }
];

const GREEK_POOL: Omit<OriginalWord, 'position'>[] = [
  { surfaceText: 'Ἐν', transliteration: 'En', strongNumber: 'G1722', portugueseGloss: 'No', lemma: 'ἐν', morphologyCode: 'Prep', morphologyDescription: 'Preposição que governa o caso dativo (em, dentro de)' },
  { surfaceText: 'ἀρχῇ', transliteration: 'arche', strongNumber: 'G746', portugueseGloss: 'princípio', lemma: 'ἀρχή', morphologyCode: 'Noun Fem Dat Sing', morphologyDescription: 'Substantivo Feminino Dativo Singular (início, origem, primazia)' },
  { surfaceText: 'ἦν', transliteration: 'en', strongNumber: 'G1510', portugueseGloss: 'era', lemma: 'εἰμί', morphologyCode: 'Verb Imperf Active 3s', morphologyDescription: 'Verbo Imperfeito Ativo 3ª Pessoa Singular (ser, estar, existir)' },
  { surfaceText: 'λόγος', transliteration: 'logos', strongNumber: 'G3056', portugueseGloss: 'Verbo', lemma: 'λόγος', morphologyCode: 'Noun Masc Nom Sing', morphologyDescription: 'Substantivo Masculino Nominativo Singular (palavra, revelação, decreto divino)' },
  { surfaceText: 'θεός', transliteration: 'theos', strongNumber: 'G2316', portugueseGloss: 'Deus', lemma: 'θεός', morphologyCode: 'Noun Masc Nom Sing', morphologyDescription: 'Substantivo Masculino Nominativo Singular (Criador, divindade)' },
  { surfaceText: 'Ἰησοῦς', transliteration: 'Iesous', strongNumber: 'G2424', portugueseGloss: 'Jesus', lemma: 'Ἰησοῦς', morphologyCode: 'Proper Noun Masc', morphologyDescription: 'Nome Próprio Masculino (Salvador, Yeshua)' },
  { surfaceText: 'Χριστός', transliteration: 'Christos', strongNumber: 'G5547', portugueseGloss: 'Cristo', lemma: 'Χριστός', morphologyCode: 'Proper Noun Masc', morphologyDescription: 'Nome Próprio Masculino (O Ungido, Messias)' },
  { surfaceText: 'ἀγάπη', transliteration: 'agape', strongNumber: 'G26', portugueseGloss: 'amor', lemma: 'ἀγάπη', morphologyCode: 'Noun Fem Nom Sing', morphologyDescription: 'Substantivo Feminino Nominativo Singular (amor incondicional e sacrificial)' },
  { surfaceText: 'χάρις', transliteration: 'charis', strongNumber: 'G5485', portugueseGloss: 'graça', lemma: 'χάρις', morphologyCode: 'Noun Fem Nom Sing', morphologyDescription: 'Substantivo Feminino Nominativo Singular (favor imerecido, benignidade)' },
  { surfaceText: 'πίστις', transliteration: 'pistis', strongNumber: 'G4102', portugueseGloss: 'fé', lemma: 'πίστις', morphologyCode: 'Noun Fem Nom Sing', morphologyDescription: 'Substantivo Feminino Nominativo Singular (confiança, fidelidade)' },
  { surfaceText: 'κόσμος', transliteration: 'kosmos', strongNumber: 'G2889', portugueseGloss: 'mundo', lemma: 'κόσμος', morphologyCode: 'Noun Masc Nom Sing', morphologyDescription: 'Substantivo Masculino Nominativo Singular (universo criado, humanidade)' },
  { surfaceText: 'ζωή', transliteration: 'zoe', strongNumber: 'G2222', portugueseGloss: 'vida', lemma: 'ζωή', morphologyCode: 'Noun Fem Nom Sing', morphologyDescription: 'Substantivo Feminino Nominativo Singular (vida eterna, princípio vital)' },
  { surfaceText: 'φῶς', transliteration: 'phos', strongNumber: 'G5457', portugueseGloss: 'luz', lemma: 'φῶς', morphologyCode: 'Noun Neut Nom Sing', morphologyDescription: 'Substantivo Neutro Nominativo Singular (iluminação espiritual, verdade)' }
];

function getDeterministicWords(bookId: string, chapter: number, verse: number, isHebrew: boolean): OriginalWord[] {
  const pool = isHebrew ? HEBREW_POOL : GREEK_POOL;
  let hash = 0;
  const key = `${bookId.toUpperCase()}-${chapter}-${verse}`;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);

  const wordCount = 5 + (hash % 3); // 5 to 7 words
  const result: OriginalWord[] = [];

  for (let pos = 1; pos <= wordCount; pos++) {
    const poolIndex = (hash + pos * 17) % pool.length;
    const item = pool[poolIndex];
    result.push({
      position: pos,
      surfaceText: item.surfaceText,
      transliteration: item.transliteration,
      strongNumber: item.strongNumber,
      portugueseGloss: item.portugueseGloss,
      lemma: item.lemma,
      morphologyCode: item.morphologyCode,
      morphologyDescription: item.morphologyDescription,
    });
  }

  return result;
}

// Fallback scriptural generator if an arbitrary chapter is accessed offline before API fetch completes
export function generateFallbackChapterVerses(bookId: string, chapter: number, versionCode: string): Verse[] {
  const normBook = bookId.toUpperCase();
  const normVer = versionCode.toUpperCase();
  const key = `${normBook}-${chapter}-${normVer}`;
  if (SAMPLE_VERSES[key]) {
    return SAMPLE_VERSES[key];
  }

  const book = getBookById(normBook);
  const isHebrew = book ? book.testament === 'AT' : true;

  // Generates contextual placeholder verses if chapter is not pre-cached
  const verses: Verse[] = [];
  const total = chapter === 119 ? 24 : 12;

  for (let i = 1; i <= total; i++) {
    if (normVer === 'INTERLINEAR') {
      const originalWords = getDeterministicWords(normBook, chapter, i, isHebrew);
      const glossJoined = originalWords.map(w => w.portugueseGloss).join(' ');
      verses.push({
        bookId: normBook,
        chapter,
        verse: i,
        text: `Interlinear: ${glossJoined}.`,
        originalWords,
      });
    } else {
      verses.push({
        bookId: normBook,
        chapter,
        verse: i,
        text: `Palavra inspirada do livro de ${book ? book.name : normBook}, capítulo ${chapter}, versículo ${i}. Medite no ensino de Deus para a sua vida hoje com fé e perseverança.`,
      });
    }
  }
  return verses;
}
