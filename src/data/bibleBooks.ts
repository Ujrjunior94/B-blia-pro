import { BibleBook } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento - Pentateuco
  { id: 'GEN', canonicalOrder: 1, name: 'Gênesis', portugueseName: 'Gênesis', testament: 'AT', category: 'Pentateuco', totalChapters: 50, abbreviation: 'Gn' },
  { id: 'EXO', canonicalOrder: 2, name: 'Êxodo', portugueseName: 'Êxodo', testament: 'AT', category: 'Pentateuco', totalChapters: 40, abbreviation: 'Êx' },
  { id: 'LEV', canonicalOrder: 3, name: 'Levítico', portugueseName: 'Levítico', testament: 'AT', category: 'Pentateuco', totalChapters: 27, abbreviation: 'Lv' },
  { id: 'NUM', canonicalOrder: 4, name: 'Números', portugueseName: 'Números', testament: 'AT', category: 'Pentateuco', totalChapters: 36, abbreviation: 'Nm' },
  { id: 'DEU', canonicalOrder: 5, name: 'Deuteronômio', portugueseName: 'Deuteronômio', testament: 'AT', category: 'Pentateuco', totalChapters: 34, abbreviation: 'Dt' },

  // Antigo Testamento - Históricos
  { id: 'JOS', canonicalOrder: 6, name: 'Josué', portugueseName: 'Josué', testament: 'AT', category: 'Históricos', totalChapters: 24, abbreviation: 'Js' },
  { id: 'JDG', canonicalOrder: 7, name: 'Juízes', portugueseName: 'Juízes', testament: 'AT', category: 'Históricos', totalChapters: 21, abbreviation: 'Jz' },
  { id: 'RUT', canonicalOrder: 8, name: 'Rute', portugueseName: 'Rute', testament: 'AT', category: 'Históricos', totalChapters: 4, abbreviation: 'Rt' },
  { id: '1SA', canonicalOrder: 9, name: '1 Samuel', portugueseName: '1 Samuel', testament: 'AT', category: 'Históricos', totalChapters: 31, abbreviation: '1Sm' },
  { id: '2SA', canonicalOrder: 10, name: '2 Samuel', portugueseName: '2 Samuel', testament: 'AT', category: 'Históricos', totalChapters: 24, abbreviation: '2Sm' },
  { id: '1KI', canonicalOrder: 11, name: '1 Reis', portugueseName: '1 Reis', testament: 'AT', category: 'Históricos', totalChapters: 22, abbreviation: '1Rs' },
  { id: '2KI', canonicalOrder: 12, name: '2 Reis', portugueseName: '2 Reis', testament: 'AT', category: 'Históricos', totalChapters: 25, abbreviation: '2Rs' },
  { id: '1CH', canonicalOrder: 13, name: '1 Crônicas', portugueseName: '1 Crônicas', testament: 'AT', category: 'Históricos', totalChapters: 29, abbreviation: '1Cr' },
  { id: '2CH', canonicalOrder: 14, name: '2 Crônicas', portugueseName: '2 Crônicas', testament: 'AT', category: 'Históricos', totalChapters: 36, abbreviation: '2Cr' },
  { id: 'EZR', canonicalOrder: 15, name: 'Esdras', portugueseName: 'Esdras', testament: 'AT', category: 'Históricos', totalChapters: 10, abbreviation: 'Ez' },
  { id: 'NEH', canonicalOrder: 16, name: 'Neemias', portugueseName: 'Neemias', testament: 'AT', category: 'Históricos', totalChapters: 13, abbreviation: 'Ne' },
  { id: 'EST', canonicalOrder: 17, name: 'Ester', portugueseName: 'Ester', testament: 'AT', category: 'Históricos', totalChapters: 10, abbreviation: 'Et' },

  // Antigo Testamento - Poéticos e Sabedoria
  { id: 'JOB', canonicalOrder: 18, name: 'Jó', portugueseName: 'Jó', testament: 'AT', category: 'Poéticos e Sabedoria', totalChapters: 42, abbreviation: 'Jó' },
  { id: 'PSA', canonicalOrder: 19, name: 'Salmos', portugueseName: 'Salmos', testament: 'AT', category: 'Poéticos e Sabedoria', totalChapters: 150, abbreviation: 'Sl' },
  { id: 'PRO', canonicalOrder: 20, name: 'Provérbios', portugueseName: 'Provérbios', testament: 'AT', category: 'Poéticos e Sabedoria', totalChapters: 31, abbreviation: 'Pv' },
  { id: 'ECC', canonicalOrder: 21, name: 'Eclesiastes', portugueseName: 'Eclesiastes', testament: 'AT', category: 'Poéticos e Sabedoria', totalChapters: 12, abbreviation: 'Ec' },
  { id: 'SNG', canonicalOrder: 22, name: 'Cântico dos Cânticos', portugueseName: 'Cântico dos Cânticos', testament: 'AT', category: 'Poéticos e Sabedoria', totalChapters: 8, abbreviation: 'Ct' },

  // Antigo Testamento - Profetas Maiores
  { id: 'ISA', canonicalOrder: 23, name: 'Isaías', portugueseName: 'Isaías', testament: 'AT', category: 'Profetas Maiores', totalChapters: 66, abbreviation: 'Is' },
  { id: 'JER', canonicalOrder: 24, name: 'Jeremias', portugueseName: 'Jeremias', testament: 'AT', category: 'Profetas Maiores', totalChapters: 52, abbreviation: 'Jr' },
  { id: 'LAM', canonicalOrder: 25, name: 'Lamentações', portugueseName: 'Lamentações', testament: 'AT', category: 'Profetas Maiores', totalChapters: 5, abbreviation: 'Lm' },
  { id: 'EZK', canonicalOrder: 26, name: 'Ezequiel', portugueseName: 'Ezequiel', testament: 'AT', category: 'Profetas Maiores', totalChapters: 48, abbreviation: 'Ez' },
  { id: 'DAN', canonicalOrder: 27, name: 'Daniel', portugueseName: 'Daniel', testament: 'AT', category: 'Profetas Maiores', totalChapters: 12, abbreviation: 'Dn' },

  // Antigo Testamento - Profetas Menores
  { id: 'HOS', canonicalOrder: 28, name: 'Oséias', portugueseName: 'Oséias', testament: 'AT', category: 'Profetas Menores', totalChapters: 14, abbreviation: 'Os' },
  { id: 'JOL', canonicalOrder: 29, name: 'Joel', portugueseName: 'Joel', testament: 'AT', category: 'Profetas Menores', totalChapters: 3, abbreviation: 'Jl' },
  { id: 'AMO', canonicalOrder: 30, name: 'Amós', portugueseName: 'Amós', testament: 'AT', category: 'Profetas Menores', totalChapters: 9, abbreviation: 'Am' },
  { id: 'OBA', canonicalOrder: 31, name: 'Obadias', portugueseName: 'Obadias', testament: 'AT', category: 'Profetas Menores', totalChapters: 1, abbreviation: 'Ob' },
  { id: 'JON', canonicalOrder: 32, name: 'Jonas', portugueseName: 'Jonas', testament: 'AT', category: 'Profetas Menores', totalChapters: 4, abbreviation: 'Jn' },
  { id: 'MIC', canonicalOrder: 33, name: 'Miquéias', portugueseName: 'Miquéias', testament: 'AT', category: 'Profetas Menores', totalChapters: 7, abbreviation: 'Mq' },
  { id: 'NAM', canonicalOrder: 34, name: 'Naum', portugueseName: 'Naum', testament: 'AT', category: 'Profetas Menores', totalChapters: 3, abbreviation: 'Na' },
  { id: 'HAB', canonicalOrder: 35, name: 'Habacuc', portugueseName: 'Habacuc', testament: 'AT', category: 'Profetas Menores', totalChapters: 3, abbreviation: 'Hc' },
  { id: 'ZEP', canonicalOrder: 36, name: 'Sofonias', portugueseName: 'Sofonias', testament: 'AT', category: 'Profetas Menores', totalChapters: 3, abbreviation: 'Sf' },
  { id: 'HAG', canonicalOrder: 37, name: 'Ageu', portugueseName: 'Ageu', testament: 'AT', category: 'Profetas Menores', totalChapters: 2, abbreviation: 'Ag' },
  { id: 'ZEC', canonicalOrder: 38, name: 'Zacarias', portugueseName: 'Zacarias', testament: 'AT', category: 'Profetas Menores', totalChapters: 14, abbreviation: 'Zc' },
  { id: 'MAL', canonicalOrder: 39, name: 'Malaquias', portugueseName: 'Malaquias', testament: 'AT', category: 'Profetas Menores', totalChapters: 4, abbreviation: 'Ml' },

  // Novo Testamento - Evangelhos
  { id: 'MAT', canonicalOrder: 40, name: 'Mateus', portugueseName: 'Mateus', testament: 'NT', category: 'Evangelhos', totalChapters: 28, abbreviation: 'Mt' },
  { id: 'MRK', canonicalOrder: 41, name: 'Marcos', portugueseName: 'Marcos', testament: 'NT', category: 'Evangelhos', totalChapters: 16, abbreviation: 'Mc' },
  { id: 'LUK', canonicalOrder: 42, name: 'Lucas', portugueseName: 'Lucas', testament: 'NT', category: 'Evangelhos', totalChapters: 24, abbreviation: 'Lc' },
  { id: 'JHN', canonicalOrder: 43, name: 'João', portugueseName: 'João', testament: 'NT', category: 'Evangelhos', totalChapters: 21, abbreviation: 'Jn' },

  // Novo Testamento - Histórico
  { id: 'ACT', canonicalOrder: 44, name: 'Atos dos Apóstolos', portugueseName: 'Atos', testament: 'NT', category: 'Histórico NT', totalChapters: 28, abbreviation: 'At' },

  // Novo Testamento - Cartas Paulinas
  { id: 'ROM', canonicalOrder: 45, name: 'Romanos', portugueseName: 'Romanos', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 16, abbreviation: 'Rm' },
  { id: '1CO', canonicalOrder: 46, name: '1 Coríntios', portugueseName: '1 Coríntios', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 16, abbreviation: '1Co' },
  { id: '2CO', canonicalOrder: 47, name: '2 Coríntios', portugueseName: '2 Coríntios', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 13, abbreviation: '2Co' },
  { id: 'GAL', canonicalOrder: 48, name: 'Gálatas', portugueseName: 'Gálatas', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 6, abbreviation: 'Gl' },
  { id: 'EPH', canonicalOrder: 49, name: 'Efésios', portugueseName: 'Efésios', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 6, abbreviation: 'Ef' },
  { id: 'PHP', canonicalOrder: 50, name: 'Filipenses', portugueseName: 'Filipenses', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 4, abbreviation: 'Fp' },
  { id: 'COL', canonicalOrder: 51, name: 'Colossenses', portugueseName: 'Colossenses', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 4, abbreviation: 'Cl' },
  { id: '1TH', canonicalOrder: 52, name: '1 Tessalonicenses', portugueseName: '1 Tessalonicenses', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 5, abbreviation: '1Ts' },
  { id: '2TH', canonicalOrder: 53, name: '2 Tessalonicenses', portugueseName: '2 Tessalonicenses', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 3, abbreviation: '2Ts' },
  { id: '1TI', canonicalOrder: 54, name: '1 Timóteo', portugueseName: '1 Timóteo', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 6, abbreviation: '1Tm' },
  { id: '2TI', canonicalOrder: 55, name: '2 Timóteo', portugueseName: '2 Timóteo', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 4, abbreviation: '2Tm' },
  { id: 'TIT', canonicalOrder: 56, name: 'Tito', portugueseName: 'Tito', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 3, abbreviation: 'Tt' },
  { id: 'PHM', canonicalOrder: 57, name: 'Filemom', portugueseName: 'Filemom', testament: 'NT', category: 'Cartas Paulinas', totalChapters: 1, abbreviation: 'Fm' },

  // Novo Testamento - Cartas Gerais
  { id: 'HEB', canonicalOrder: 58, name: 'Hebreus', portugueseName: 'Hebreus', testament: 'NT', category: 'Cartas Gerais', totalChapters: 13, abbreviation: 'Hb' },
  { id: 'JAS', canonicalOrder: 59, name: 'Tiago', portugueseName: 'Tiago', testament: 'NT', category: 'Cartas Gerais', totalChapters: 5, abbreviation: 'Tg' },
  { id: '1PE', canonicalOrder: 60, name: '1 Pedro', portugueseName: '1 Pedro', testament: 'NT', category: 'Cartas Gerais', totalChapters: 5, abbreviation: '1Pe' },
  { id: '2PE', canonicalOrder: 61, name: '2 Pedro', portugueseName: '2 Pedro', testament: 'NT', category: 'Cartas Gerais', totalChapters: 3, abbreviation: '2Pe' },
  { id: '1JN', canonicalOrder: 62, name: '1 João', portugueseName: '1 João', testament: 'NT', category: 'Cartas Gerais', totalChapters: 5, abbreviation: '1Jn' },
  { id: '2JN', canonicalOrder: 63, name: '2 João', portugueseName: '2 João', testament: 'NT', category: 'Cartas Gerais', totalChapters: 1, abbreviation: '2Jn' },
  { id: '3JN', canonicalOrder: 64, name: '3 João', portugueseName: '3 João', testament: 'NT', category: 'Cartas Gerais', totalChapters: 1, abbreviation: '3Jn' },
  { id: 'JUD', canonicalOrder: 65, name: 'Judas', portugueseName: 'Judas', testament: 'NT', category: 'Cartas Gerais', totalChapters: 1, abbreviation: 'Jd' },

  // Novo Testamento - Revelação
  { id: 'REV', canonicalOrder: 66, name: 'Apocalipse', portugueseName: 'Apocalipse', testament: 'NT', category: 'Revelação', totalChapters: 22, abbreviation: 'Ap' },
];

export function getBookById(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id.toUpperCase() === id.toUpperCase());
}
