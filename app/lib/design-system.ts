// lib/design-system.ts
// Design System Vibraventura - Aventura e Natureza

// Tipo para configuração de categoria
export type CategoryConfigType = {
  name: string;
  icon: string;
  gradient: string;
  bg: string;
  text: string;
  border: string;
  hover: string;
  iconBg: string;
};

// Configuração das categorias com cores, ícones e estilos
export const categoryConfig: Record<string, CategoryConfigType> = {
  // Categoria nova mapeada da antiga "eventos"
  eventos: {
    name: 'Eventos',
    icon: '🎪',
    gradient: 'from-adventureOrange via-accent to-tertiary',
    bg: 'bg-gradient-to-br from-adventureOrange/10 to-accent/10',
    text: 'text-adventureOrange',
    border: 'border-adventureOrange/20',
    hover: 'hover:shadow-2xl hover:shadow-adventureOrange/20',
    iconBg: 'bg-adventureOrange',
  },
  aventuras: {
    name: 'Aventuras',
    icon: '🏔️',
    gradient: 'from-secondary via-tertiary to-accent',
    bg: 'bg-gradient-to-br from-secondary/10 to-tertiary/10',
    text: 'text-secondary',
    border: 'border-secondary/20',
    hover: 'hover:shadow-2xl hover:shadow-secondary/20',
    iconBg: 'bg-secondary',
  },
  destinos: {
    name: 'Destinos',
    icon: '🌍',
    gradient: 'from-sky via-accent to-tertiary',
    bg: 'bg-gradient-to-br from-sky/10 to-accent/10',
    text: 'text-sky',
    border: 'border-sky/20',
    hover: 'hover:shadow-2xl hover:shadow-sky/20',
    iconBg: 'bg-sky',
  },
  experiencias: {
    name: 'Experiências',
    icon: '✨',
    gradient: 'from-adventureOrange via-accent to-tertiary',
    bg: 'bg-gradient-to-br from-adventureOrange/10 to-accent/10',
    text: 'text-adventureOrange',
    border: 'border-adventureOrange/20',
    hover: 'hover:shadow-2xl hover:shadow-adventureOrange/20',
    iconBg: 'bg-adventureOrange',
  },
  'dicas-viagem': {
    name: 'Dicas de Viagem',
    icon: '🎒',
    gradient: 'from-accent via-tertiary to-secondary',
    bg: 'bg-gradient-to-br from-accent/10 to-tertiary/10',
    text: 'text-accent',
    border: 'border-accent/20',
    hover: 'hover:shadow-2xl hover:shadow-accent/20',
    iconBg: 'bg-accent',
  },
  ecoturismo: {
    name: 'Ecoturismo',
    icon: '🌿',
    gradient: 'from-tertiary via-accent to-secondary',
    bg: 'bg-gradient-to-br from-tertiary/10 to-accent/10',
    text: 'text-tertiary',
    border: 'border-tertiary/20',
    hover: 'hover:shadow-2xl hover:shadow-tertiary/20',
    iconBg: 'bg-tertiary',
  },
  'esportes-radicais': {
    name: 'Esportes Radicais',
    icon: '🪂',
    gradient: 'from-adventureOrange via-earth to-secondary',
    bg: 'bg-gradient-to-br from-adventureOrange/10 to-earth/10',
    text: 'text-adventureOrange',
    border: 'border-adventureOrange/20',
    hover: 'hover:shadow-2xl hover:shadow-adventureOrange/20',
    iconBg: 'bg-adventureOrange',
  },
  'cultura-local': {
    name: 'Cultura Local',
    icon: '🎭',
    gradient: 'from-earth via-secondary to-tertiary',
    bg: 'bg-gradient-to-br from-earth/10 to-secondary/10',
    text: 'text-earth',
    border: 'border-earth/20',
    hover: 'hover:shadow-2xl hover:shadow-earth/20',
    iconBg: 'bg-earth',
  },
  gastronomia: {
    name: 'Gastronomia',
    icon: '🍽️',
    gradient: 'from-earth via-adventureOrange to-accent',
    bg: 'bg-gradient-to-br from-earth/10 to-adventureOrange/10',
    text: 'text-earth',
    border: 'border-earth/20',
    hover: 'hover:shadow-2xl hover:shadow-earth/20',
    iconBg: 'bg-earth',
  },
  // Mapeamento das categorias antigas (compatibilidade)
  desenvolvimento: {
    name: 'Desenvolvimento',
    icon: '📈',
    gradient: 'from-accent via-tertiary to-secondary',
    bg: 'bg-gradient-to-br from-accent/10 to-tertiary/10',
    text: 'text-accent',
    border: 'border-accent/20',
    hover: 'hover:shadow-2xl hover:shadow-accent/20',
    iconBg: 'bg-accent',
  },
  colaboradores: {
    name: 'Colaboradores',
    icon: '👥',
    gradient: 'from-secondary via-tertiary to-accent',
    bg: 'bg-gradient-to-br from-secondary/10 to-tertiary/10',
    text: 'text-secondary',
    border: 'border-secondary/20',
    hover: 'hover:shadow-2xl hover:shadow-secondary/20',
    iconBg: 'bg-secondary',
  },
  tecnologia: {
    name: 'Tecnologia',
    icon: '💻',
    gradient: 'from-sky via-accent to-tertiary',
    bg: 'bg-gradient-to-br from-sky/10 to-accent/10',
    text: 'text-sky',
    border: 'border-sky/20',
    hover: 'hover:shadow-2xl hover:shadow-sky/20',
    iconBg: 'bg-sky',
  },
  default: {
    name: 'Viagem',
    icon: '🧭',
    gradient: 'from-accent via-tertiary to-secondary',
    bg: 'bg-gradient-to-br from-grey/10 to-secondary/10',
    text: 'text-grey',
    border: 'border-grey/20',
    hover: 'hover:shadow-2xl hover:shadow-grey/20',
    iconBg: 'bg-grey',
  }
};

// Função helper para obter configuração da categoria
export function getCategoryConfig(category: any): CategoryConfigType {
  let categoryType = 'default';
  
  if (!category) {
    return categoryConfig.default;
  }
  
  // Se é uma string
  if (typeof category === 'string') {
    categoryType = category.toLowerCase().trim();
  }
  // Se é um objeto com metadata.tipo
  else if (category?.metadata?.tipo) {
    categoryType = category.metadata.tipo.toLowerCase().trim();
  }
  // Se é um objeto com title (Cosmic CMS)
  else if (category?.title) {
    categoryType = category.title.toLowerCase().trim();
  }
  // Se é um objeto com slug
  else if (category?.slug) {
    categoryType = category.slug.toLowerCase().trim();
  }
  // Se tem uma propriedade chamada 'tipo'
  else if (category?.tipo) {
    categoryType = category.tipo.toLowerCase().trim();
  }
  
  // Normalizar hífens e espaços
  categoryType = categoryType.replace(/\s+/g, '-');
  
  return categoryConfig[categoryType] || categoryConfig.default;
}

// Animações compartilhadas para Framer Motion
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  
  // Hover para cards
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -12,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },
  
  // Hover para imagens (efeito zoom)
  imageZoom: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },
  
  // Animação de badge
  badgePulse: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { 
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  },
  
  // Stagger para listas
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

// Variantes de parallax para diferentes velocidades
export const parallaxConfig = {
  slow: {
    y: [0, -20],
    transition: { duration: 2, ease: "linear" as const }
  },
  medium: {
    y: [0, -50],
    transition: { duration: 1.5, ease: "linear" as const }
  },
  fast: {
    y: [0, -80],
    transition: { duration: 1, ease: "linear" as const }
  }
};

// Estilos de texto reutilizáveis
export const textStyles = {
  hero: 'font-primary text-5xl md:text-7xl font-bold tracking-tight',
  title: 'font-primary text-3xl md:text-5xl font-bold tracking-tight',
  subtitle: 'font-secondary text-xl md:text-2xl font-semibold uppercase tracking-wider',
  body: 'font-primary text-base md:text-lg leading-relaxed',
  caption: 'font-secondary text-sm uppercase tracking-wide font-medium',
  label: 'font-primary text-sm font-medium',
};

// Estilos de botão
export const buttonStyles = {
  primary: 'bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
  secondary: 'bg-gradient-to-r from-secondary to-secondary-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
  outline: 'border-2 border-accent text-accent font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-accent hover:text-white transition-all duration-300',
};

// Grid responsivo otimizado
export const gridLayouts = {
  posts: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  featured: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  related: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
};