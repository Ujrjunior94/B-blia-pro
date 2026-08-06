import React, { useState } from 'react';
import { Search, Compass, BookOpen, Scroll, HelpCircle, Star, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface BiblicalScene {
  id: string;
  title: string;
  bookId: string;
  chapter: number;
  reference: string;
  testament: 'AT' | 'NT';
  period: string;
  imageUrl: string;
  summary: string;
  theologicalSignificance: string;
  historicalContext: string;
  originalLanguageNotes: string;
}

interface IllustrationsViewProps {
  onOpenPassage?: (bookId: string, chapter: number) => void;
}

export const IllustrationsView: React.FC<IllustrationsViewProps> = ({ onOpenPassage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTestament, setFilterTestament] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [selectedScene, setSelectedScene] = useState<BiblicalScene | null>(null);

  const scenes: BiblicalScene[] = [
    {
      id: 'creation',
      title: 'A Criação do Universo',
      bookId: 'GEN',
      chapter: 1,
      reference: 'Gênesis 1:1-3',
      testament: 'AT',
      period: 'Origens',
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'O início de todas as coisas criado de forma ex-nihilo (do nada) pela voz soberana de Deus, trazendo ordem, luz e vida ao caos primordial.',
      theologicalSignificance: 'Demonstra a soberania e transcendência de Deus. A criação pela palavra prefigura Cristo como o "Logos" (Verbo), o agente ativo da criação descrito em João 1:1. Aponta para o plano eterno de comunhão entre o Criador e a criatura.',
      historicalContext: 'Escrito originalmente no contexto do Antigo Oriente Próximo, Gênesis contrasta fortemente com os mitos pagãos circundantes (como o Enuma Elish babilônico). Enquanto os mitos descreviam a criação através de batalhas de deuses e caprichos, o relato bíblico proclama um Deus único, ordeiro e infinitamente bondoso.',
      originalLanguageNotes: 'A palavra hebraica para criar é בָּרָא (Bara), usada exclusivamente com Deus como sujeito no texto bíblico. Significa uma atividade divina geradora de algo inteiramente novo, sem materiais pré-existentes.'
    },
    {
      id: 'red_sea',
      title: 'A Travessia do Mar Vermelho',
      bookId: 'EXO',
      chapter: 14,
      reference: 'Êxodo 14:21-22',
      testament: 'AT',
      period: 'Êxodo',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'Deus divide as águas profundas do Mar Vermelho por meio de um vento oriental impetuoso, proporcionando uma rota de fuga segura ao Seu povo e destruindo o exército opressor de Faraó.',
      theologicalSignificance: 'A redenção por excelência no Antigo Testamento. Prefigura o sacrifício de Cristo que nos liberta da escravidão do pecado (Faraó). No Novo Testamento, a travessia é associada espiritualmente ao Batismo cristão (1 Coríntios 10:1-2), simbolizando a passagem da morte para a vida.',
      historicalContext: 'Muitos arqueólogos e historiadores sugerem que o local da travessia refere-se a uma extensão pantanosa de água conhecida originalmente como "Yam Suph" (Mar de Juncos), ao norte do atual Golfo de Suez, onde ventos climáticos fortes e extremos de maré historicamente produzem efeitos de solo seco temporário.',
      originalLanguageNotes: 'O termo hebraico para redenção usado neste contexto é גָּאַל (Gaal) ou פָּדָה (Padah). Gaal envolve a ação de um parente resgatador que intervém para pagar o preço ou resgatar da escravidão.'
    },
    {
      id: 'david_goliath',
      title: 'Davi e o Gigante Golias',
      bookId: '1SA',
      chapter: 17,
      reference: '1 Samuel 17:45-47',
      testament: 'AT',
      period: 'Monarquia',
      imageUrl: 'https://images.unsplash.com/photo-1459305272254-33a7d593a851?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'O jovem pastor Davi, munido apenas de sua funda, cinco pedras lisas do ribeiro e uma fé inabalável, derrota o gigante campeão filisteu Golias na planície de Elá.',
      theologicalSignificance: 'Mostra que a vitória do povo de Deus não depende de forças armadas ou armaduras carnais, mas da confiança absoluta na promessa do Senhor. Davi é o protótipo do rei messiânico; sua vitória antecipa Cristo esmagando o poder do gigante adversário (Satanás e a morte) na Cruz.',
      historicalContext: 'O Vale de Elá, onde a batalha ocorreu, é um local geográfico real a sudoeste de Jerusalém. As fundas antigas não eram brinquedos, mas armas militares de longo alcance altamente eficazes, capazes de arremessar pedras de tamanho considerável a mais de 150 km/h com precisão letal.',
      originalLanguageNotes: 'Davi declara que vem em nome do "Senhor dos Exércitos", traduzido do hebraico יְהוָה צְבָאוֹת (Yahweh Tsebaoth), um termo militar que retrata Deus como comandante dos exércitos celestes e terrestres.'
    },
    {
      id: 'nativity',
      title: 'O Nascimento do Salvador',
      bookId: 'LUK',
      chapter: 2,
      reference: 'Lucas 2:7-14',
      testament: 'NT',
      period: 'Encarnação',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'Jesus nasce de forma humilde em uma estrebaria em Belém, deitado em uma manjedoura, enquanto anjos celestiais entoam cantos de glória e paz aos pastores nos campos.',
      theologicalSignificance: 'O mistério da Encarnação (Deus feito homem, Emanuel). Deus se esvazia de Sua glória celestial (Kenosis) para assumir a fragilidade humana e reconciliar o homem consigo mesmo. A manjedoura de palha contrasta com os palácios terrestres, mostrando que o Seu reino não é deste mundo.',
      historicalContext: 'O censo decretado por César Augusto obrigou José e Maria a viajarem cerca de 130 km de Nazaré até Belém. A palavra traduzida como "hospedaria" (kataluma) no grego denota um quarto de hóspedes em uma residência familiar, sugerindo que o estábulo era provavelmente a parte inferior térrea da própria casa de parentes, onde os animais eram recolhidos.',
      originalLanguageNotes: 'O título de Jesus, o Salvador, liga-se ao grego σωτήρ (Soter), termo que no Império Romano era usado para se referir a César como mantenedor da paz social. Lucas proclama audaciosamente que o verdadeiro Soter é o bebê na manjedoura.'
    },
    {
      id: 'sermon_mount',
      title: 'O Sermão do Monte',
      bookId: 'MAT',
      chapter: 5,
      reference: 'Mateus 5:1-12',
      testament: 'NT',
      period: 'Ministério',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'Jesus sobe a uma colina próxima ao Mar da Galileia e proclama as Bem-aventuranças, estabelecendo a ética contracorrente, o caráter e as marcas espirituais dos cidadãos do Reino de Deus.',
      theologicalSignificance: 'É a Nova Lei do Reino. Assim como Moisés subiu ao Monte Sinai para receber a antiga Lei escrita em pedras, Jesus sobe ao monte para internalizar a Lei no coração do crente através da graça. Ele redefine a justiça moral, focando no íntimo do coração, no amor aos inimigos e na pureza.',
      historicalContext: 'O Monte das Bem-aventuranças é historicamente identificado com uma encosta suave na margem norte do Mar da Galileia, perto de Cafarnaum. A acústica natural desse terreno colinar em anfiteatro permitia que milhares de pessoas ouvissem a voz de uma única pessoa com clareza.',
      originalLanguageNotes: 'Cada bem-aventurança começa com "Bem-aventurados", traduzido do grego μακάριοι (Makarioi). Refere-se a um estado profundo e indestrutível de satisfação e alegria espiritual concedido por Deus, totalmente independente de circunstâncias externas favoráveis.'
    },
    {
      id: 'resurrection',
      title: 'A Gloriosa Ressurreição',
      bookId: 'LUK',
      chapter: 24,
      reference: 'Lucas 24:5-6',
      testament: 'NT',
      period: 'Ressurreição',
      imageUrl: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=600&h=400',
      summary: 'As mulheres vão ao túmulo no primeiro dia da semana de madrugada e encontram a grande pedra removida e o sepulcro vazio. Dois anjos anunciam: "Por que buscais o vivente entre os mortos? Ele não está aqui, mas ressuscitou!".',
      theologicalSignificance: 'O ápice da fé cristã. A ressurreição corporal de Jesus valida Sua identidade divina, Seu sacrifício expiatório e garante a ressurreição futura de todos os crentes. A morte foi definitivamente derrotada, inaugurando a nova criação espiritual.',
      historicalContext: 'Os túmulos de figuras ricas no primeiro século em Jerusalém eram esculpidos diretamente na rocha calcária, fechados por uma pedra circular em forma de disco de moenda que corria por uma canaleta inclinada. O fato de a pedra ter sido "rolada para trás" de forma ascendente indica uma força externa milagrosa inexplicável.',
      originalLanguageNotes: 'O anúncio celestial usa a palavra grega ἠγέρθη (Egerthe) que significa literalmente "foi despertado" ou "levantou-se", na voz passiva divina, enfatizando que o Pai ressuscitou o Filho pelo poder soberano do Espírito Santo.'
    }
  ];

  const filteredScenes = scenes.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.reference.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = filterTestament === 'ALL' || s.testament === filterTestament;
    return matchesSearch && matchesTestament;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 1. Header Intro block */}
      <div className="p-4 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-3xs space-y-1.5 text-center">
        <h2 className="font-serif font-extrabold text-sm text-[#3E5641] dark:text-[#D4A24C] uppercase tracking-wider">
          Galeria de Cenas Bíblicas
        </h2>
        <p className="text-xs text-[#5F5A52] dark:text-stone-400 font-serif italic">
          Explore o significado teológico, linguístico e arqueológico das passagens mais marcantes da história sagrada.
        </p>
      </div>

      {/* 2. Controls & Search */}
      <div className="space-y-3 bg-[#FFFDF8] dark:bg-[#1C1A18] p-4 rounded-3xl border border-[#E7DECF] dark:border-stone-800 shadow-3xs">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'ALL', label: 'Todas as Cenas' },
            { id: 'AT', label: 'Antigo Testamento' },
            { id: 'NT', label: 'Novo Testamento' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTestament(tab.id as any)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-wider transition-all border text-center cursor-pointer ${
                filterTestament === tab.id
                  ? 'bg-[#3E5641] text-[#F7F1E5] border-transparent shadow-3xs'
                  : 'bg-transparent text-[#5F5A52] border-[#E7DECF] dark:border-stone-800 hover:bg-[#F7F1E5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5A52]" />
          <input
            type="text"
            placeholder="Pesquisar cena bíblica..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-xl text-[#1F1B16] dark:text-stone-100 focus:outline-none placeholder:text-stone-400 font-serif"
          />
        </div>
      </div>

      {/* 3. Cards Grid Layout */}
      <div className="grid gap-4">
        {filteredScenes.map((scene) => (
          <div
            key={scene.id}
            onClick={() => setSelectedScene(scene)}
            className="rounded-3xl border border-[#E7DECF] dark:border-stone-800 bg-[#FFFDF8] dark:bg-[#1C1A18] overflow-hidden shadow-2xs hover:border-[#D4A24C] transition-all cursor-pointer group cls-card-lg"
          >
            {/* Visual Header Image Container with referer policy */}
            <div className="relative h-44 overflow-hidden bg-stone-100 dark:bg-stone-900">
              <ImageWithSkeleton
                src={scene.imageUrl}
                alt={scene.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Absolutes and labels */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              <span className="absolute top-4 left-4 text-[8px] font-sans font-extrabold tracking-widest uppercase bg-[#324534] text-amber-200 px-2 py-1 rounded-md border border-[#D4A24C]/25 shadow-2xs">
                Era: {scene.period}
              </span>

              <span className="absolute top-4 right-4 text-[8px] font-sans font-extrabold tracking-widest uppercase bg-[#D4A24C] text-[#1F1B16] px-2 py-1 rounded-md shadow-2xs">
                {scene.testament === 'AT' ? 'Antigo T.' : 'Novo T.'}
              </span>

              {/* Title & scripture at bottom of image overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-sans font-bold text-amber-200 uppercase tracking-widest block">
                  {scene.reference}
                </span>
                <h3 className="font-serif font-extrabold text-base leading-tight mt-0.5 group-hover:text-amber-100 transition-colors">
                  {scene.title}
                </h3>
              </div>
            </div>

            {/* Quick summary card body */}
            <div className="p-4 space-y-3">
              <p className="text-xs font-serif text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {scene.summary}
              </p>

              {/* Explore action button */}
              <div className="flex items-center justify-between text-[10px] font-sans font-extrabold text-[#3E5641] dark:text-[#D4A24C] pt-1 border-t border-stone-100 dark:border-stone-850">
                <span className="flex items-center gap-1 uppercase tracking-widest">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Explorar Contexto</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}

        {filteredScenes.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-serif italic text-xs space-y-2">
            <p>Nenhuma cena encontrada para sua pesquisa.</p>
            <p className="text-[10px] font-sans font-bold uppercase text-[#D4A24C]">Tente usar outros termos</p>
          </div>
        )}
      </div>

      {/* 4. Scene Deep Detail Context Modal Popup */}
      {selectedScene && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-[#FFFDF8] dark:bg-[#151311] border border-[#E7DECF] dark:border-stone-850 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1F1B16] dark:text-stone-200">
            
            {/* Header with back arrow */}
            <div className="px-5 py-4 border-b border-[#E7DECF] dark:border-stone-800 flex items-center justify-between bg-[#F7F1E5] dark:bg-stone-900 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedScene(null)}
                  className="p-1 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-400 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h3 className="font-serif font-extrabold text-xs text-[#1F1B16] dark:text-amber-100 uppercase tracking-wider">
                  Detalhes Teológicos
                </h3>
              </div>
              <span className="text-[9px] font-sans font-extrabold bg-[#3E5641] text-[#FFFDF8] px-2 py-0.5 rounded-md uppercase">
                {selectedScene.period}
              </span>
            </div>

            {/* Scrollable Context sections */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="relative h-44 bg-stone-900">
                <ImageWithSkeleton
                  src={selectedScene.imageUrl}
                  alt={selectedScene.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent z-10" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-sans font-extrabold text-amber-200 uppercase tracking-widest">
                    {selectedScene.reference}
                  </span>
                  <h2 className="font-serif font-extrabold text-lg mt-0.5">
                    {selectedScene.title}
                  </h2>
                </div>
              </div>

              {/* Editorial Scripture Context info list */}
              <div className="p-5 space-y-4">
                
                {/* Event Summary */}
                <div className="space-y-1">
                  <span className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-wider block">O Evento</span>
                  <p className="text-xs font-serif leading-relaxed text-stone-800 dark:text-stone-100 text-justify">
                    {selectedScene.summary}
                  </p>
                </div>

                {/* Theological Significance (Premium gold Left Border) */}
                <div className="p-4 rounded-2xl bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-850 shadow-3xs border-l-[5px] border-l-[#D4A24C] space-y-1.5">
                  <span className="text-[9px] font-sans font-bold text-[#D4A24C] uppercase tracking-wider block">Significado Teológico e Crístico</span>
                  <p className="text-xs font-serif leading-relaxed text-stone-600 dark:text-stone-300">
                    {selectedScene.theologicalSignificance}
                  </p>
                </div>

                {/* Historical and Geographical Archeology */}
                <div className="p-4 rounded-2xl bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-850 shadow-3xs border-l-[5px] border-l-[#3E5641] space-y-1.5">
                  <span className="text-[9px] font-sans font-bold text-[#3E5641] dark:text-[#D4A24C] uppercase tracking-wider block">Fatos Históricos e Arqueologia</span>
                  <p className="text-xs font-serif leading-relaxed text-stone-600 dark:text-stone-300">
                    {selectedScene.historicalContext}
                  </p>
                </div>

                {/* Original Languages (Hebrew/Greek linguistic details) */}
                <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 dark:bg-stone-950/20 border border-[#E7DECF] dark:border-stone-850 shadow-3xs space-y-1.5">
                  <span className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-wider block flex items-center gap-1">
                    <Scroll className="w-3 h-3 text-[#D4A24C]" />
                    Chaves no Idioma Original ({selectedScene.testament === 'AT' ? 'Hebraico' : 'Grego Koiné'})
                  </span>
                  <p className="text-xs font-serif leading-relaxed italic text-stone-600 dark:text-stone-300">
                    {selectedScene.originalLanguageNotes}
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="p-5 border-t border-[#E7DECF] dark:border-stone-800 bg-[#F7F1E5] dark:bg-stone-900 shrink-0 flex flex-col gap-2">
              {onOpenPassage && (
                <button
                  onClick={() => {
                    onOpenPassage(selectedScene.bookId, selectedScene.chapter);
                    setSelectedScene(null);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#3E5641] text-[#FFFDF8] hover:bg-[#324534] active:scale-95 transition-all font-serif font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-2xs border border-[#3E5641]/25"
                >
                  <BookOpen className="w-4 h-4 text-[#D4A24C]" />
                  <span>Ler na Bíblia</span>
                </button>
              )}

              <button
                onClick={() => setSelectedScene(null)}
                className="w-full py-3 rounded-2xl bg-transparent border border-[#E7DECF] text-stone-500 hover:text-stone-700 text-xs font-sans font-bold uppercase tracking-wider cursor-pointer text-center"
              >
                Voltar à Galeria
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
