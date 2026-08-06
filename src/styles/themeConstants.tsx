import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ============================================================================
 * CONSTANTES DE ESTILO E DESIGN SYSTEM (JORNADA DA BÍBLIA)
 * ============================================================================
 * 
 * Desenvolvido sob uma rigorosa ótica de Design de Interface (UI/UX) e Teologia,
 * este arquivo centraliza a tipografia sacra, espaçamentos harmônicos e a paleta
 * de cores espiritual e legível do aplicativo.
 * 
 * Evita o "AI Slop" (clichês genéricos de design) favorecendo contrastes elegantes,
 * tipografia com proporções matemáticas estritas e espaçamentos rítmicos.
 */

// Tipos de Temas suportados pelo sistema
export type ThemeType = 'light' | 'dark' | 'sepia' | 'parchment' | 'manuscript' | 'tora';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  className: string;
  variables: {
    bgApp: string;
    bgCard: string;
    bgCardHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    borderColor: string;
    accentPrimary: string;
    accentHover: string;
    accentBg: string;
  };
}

export const THEME_MODES: Record<ThemeType, ThemeConfig> = {
  light: {
    id: 'light',
    name: 'Claro Confortável',
    className: '',
    variables: {
      bgApp: '#F7F1E5', // Warm neutral cream
      bgCard: '#FFFDF8', // Elegant warm eggshell white
      bgCardHover: '#EFE6D6', // Soft secondary beige
      textPrimary: '#1F1B16', // Deep charcoal/brown
      textSecondary: '#3A352F', // Slate-warm brown
      textMuted: '#5F5A52', // Muted brown
      borderColor: '#E7DECF', // Subdued warm border
      accentPrimary: '#3E5641', // Sacred dark green
      accentHover: '#2F4231', // Deep forest green
      accentBg: 'rgba(62, 86, 65, 0.08)',
    }
  },
  dark: {
    id: 'dark',
    name: 'Pedra Quente Escura',
    className: 'dark',
    variables: {
      bgApp: '#1A1816', // Darker warm charcoal
      bgCard: '#262320', // Warm dark card
      bgCardHover: '#332E2A',
      textPrimary: '#F7F1E5', // Soft warm cream
      textSecondary: '#E0D9CD', // Sand grey
      textMuted: '#A39B8F', // Warm grey
      borderColor: 'rgba(231, 222, 207, 0.1)',
      accentPrimary: '#D4A24C', // Warm gold
      accentHover: '#E7BE73', // Brighter gold
      accentBg: 'rgba(212, 162, 76, 0.15)',
    }
  },
  sepia: {
    id: 'sepia',
    name: 'Sépia Clássica',
    className: '',
    variables: {
      bgApp: '#F4ECD8',
      bgCard: '#FFFDF8',
      bgCardHover: '#EAE0C8',
      textPrimary: '#3D2C1E',
      textSecondary: '#5C4838',
      textMuted: '#8C7765',
      borderColor: '#D8C8B0',
      accentPrimary: '#8B5A2B',
      accentHover: '#6B421E',
      accentBg: 'rgba(139, 90, 43, 0.1)',
    }
  },
  parchment: {
    id: 'parchment',
    name: 'Manuscrito Pergaminho',
    className: 'parchment-theme',
    variables: {
      bgApp: '#F7F1E5', // Authentic parchment cream
      bgCard: '#FFFDF8', // Pristine scriptorium white
      bgCardHover: '#EDE4D5',
      textPrimary: '#1F1B16', // Deep iron ink
      textSecondary: '#3A352F', // Walnut ink
      textMuted: '#5F5A52', // Muted ash ink
      borderColor: '#E7DECF',
      accentPrimary: '#3E5641', // Sacred dark green (as main theme primary)
      accentHover: '#2F4231',
      accentBg: 'rgba(62, 86, 65, 0.08)',
    }
  },
  manuscript: {
    id: 'manuscript',
    name: 'Manuscrito Antigo',
    className: '',
    variables: {
      bgApp: '#F2E8D5',
      bgCard: '#FFFDF8',
      bgCardHover: '#E5D6BD',
      textPrimary: '#2B1E12',
      textSecondary: '#4A3728',
      textMuted: '#7A624E',
      borderColor: '#8B5A2B',
      accentPrimary: '#8B1A10',
      accentHover: '#6B120B',
      accentBg: 'rgba(139, 26, 16, 0.1)',
    }
  },
  tora: {
    id: 'tora',
    name: 'Rolos da Torá',
    className: '',
    variables: {
      bgApp: '#FAF3E0',
      bgCard: '#FFFDF8',
      bgCardHover: '#F0E4C8',
      textPrimary: '#1E1711',
      textSecondary: '#3B2D22',
      textMuted: '#6E5847',
      borderColor: '#7B3F00',
      accentPrimary: '#3D1E03',
      accentHover: '#231001',
      accentBg: 'rgba(123, 63, 0, 0.1)',
    }
  }
};

/**
 * Escala Tipográfica Estrita (Proporções de Leitura)
 * Proporção Major Second (1.125) para densidade de UI flexível
 * Proporção Perfect Fourth (1.333) para displays majestosos de textos bíblicos
 */
export const TYPOGRAPHY = {
  fonts: {
    serif: 'font-serif tracking-normal leading-relaxed', // Usado para passagens bíblicas
    sans: 'font-sans tracking-tight leading-normal',      // Usado para controles de UI e dados estruturados
    mono: 'font-mono tracking-wider uppercase text-[10px]', // Referências, sigla de livro, códigos Strong
    hebrew: 'font-hebrew text-right tracking-wide leading-loose', // Fontes de línguas originais sem conflito visual
  },
  sizes: {
    xs: 'text-xs sm:text-xs',
    sm: 'text-sm sm:text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
    '2xl': 'text-xl sm:text-2xl',
    '3xl': 'text-2xl sm:text-3xl font-bold font-serif leading-tight',
    '4xl': 'text-3xl sm:text-4xl font-bold font-serif leading-none tracking-tight',
  },
  lineHeights: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  }
};

/**
 * Escala de Espaçamento e Ritmo Visual
 * Assegura que o preenchimento externo de contêineres seja sempre maior ou igual ao interno.
 * Aplica regras matemáticas estritas de cantos arredondados imbricados:
 * Inner Radius = Outer Radius - Padding
 */
export const SPACING = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  sectionPadding: 'py-6 sm:py-8 lg:py-12',
  cardPadding: 'p-4 sm:p-6 lg:p-8',
  buttonPadding: 'px-4 py-2 sm:px-5 sm:py-2.5',
  gap: {
    xs: 'gap-1.5 sm:gap-2',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-5 sm:gap-6',
    lg: 'gap-8 sm:gap-10',
  },
  rounded: {
    // Escala matemática de cantos arredondados (cap de 16px para contêineres normais)
    sm: 'rounded-md',     // 6px
    md: 'rounded-xl',     // 12px
    lg: 'rounded-2xl',    // 16px
    xl: 'rounded-3xl',    // 24px (Contêineres de topo, banners importantes)
    pill: 'rounded-full', // Tags, chips, pílulas
  }
};

/**
 * Utilitários de Classes CSS Dinâmicos
 * Facilita a vinculação dos estilos baseados nas variáveis CSS estabelecidas em index.css
 */
export const UTILS_THEME_CLASSES = {
  bgApp: 'bg-theme-app transition-colors duration-200',
  bgCard: 'bg-theme-card border border-theme transition-all duration-200',
  bgCardHover: 'bg-theme-card border border-theme hover:bg-theme-card-hover transition-all duration-200',
  textPrimary: 'text-theme-primary',
  textSecondary: 'text-theme-secondary',
  textMuted: 'text-theme-muted',
  border: 'border-theme',
  textAccent: 'text-theme-accent',
  bgAccent: 'bg-theme-accent text-amber-50',
  bgAccentBg: 'bg-theme-accent-bg',
  borderAccent: 'border-theme-accent',
};

/**
 * ============================================================================
 * CONTEXTO E PROVEDOR DE TEMA (THEME CONTEXT & PROVIDER)
 * ============================================================================
 */

export interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  isParchment: boolean;
  isLight: boolean;
  activeConfig: ThemeConfig;
  toggleTheme: () => void;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  classes: typeof UTILS_THEME_CLASSES;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialização segura baseada no localStorage ou preferência do sistema
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('jornada_biblia_theme');
    if (saved === 'dark' || saved === 'parchment' || saved === 'light') {
      return saved as ThemeType;
    }
    // Fallback padrão: pergaminho (tema clássico das escrituras sagradas do app)
    return 'parchment';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('jornada_biblia_theme', newTheme);
  };

  // Sincroniza classes no elemento raiz (HTML) para que o Tailwind e CSS variables reajam
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'parchment-theme');

    const config = THEME_MODES[theme] || THEME_MODES.light;
    if (config && config.className) {
      root.classList.add(config.className);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'parchment' : 'dark');
  };

  const isDark = theme === 'dark';
  const isParchment = theme === 'parchment';
  const isLight = theme === 'light';
  const activeConfig = THEME_MODES[theme] || THEME_MODES.light;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
        isParchment,
        isLight,
        activeConfig,
        toggleTheme,
        typography: TYPOGRAPHY,
        spacing: SPACING,
        classes: UTILS_THEME_CLASSES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * ============================================================================
 * HOOK PERSONALIZADO: useTheme
 * ============================================================================
 * 
 * Permite que qualquer componente acesse o estado do tema reativo e obtenha
 * utilitários de design de forma imediata e consistente.
 */
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Se o hook for usado fora do ThemeProvider (por exemplo, em testes ou setups parciais),
    // retorna um fallback seguro em vez de lançar um erro obstrutivo.
    return {
      theme: 'parchment',
      setTheme: () => {},
      isDark: false,
      isParchment: true,
      isLight: false,
      activeConfig: THEME_MODES.parchment,
      toggleTheme: () => {},
      typography: TYPOGRAPHY,
      spacing: SPACING,
      classes: UTILS_THEME_CLASSES,
    };
  }
  return context;
};
