// Glassmorphism utility classes and styles
export const glassmorphismStyles = {
  // Core glass effects
  base: 'backdrop-blur-md border border-white/20 shadow-lg',
  
  // Card variations
  card: 'bg-white/15 backdrop-blur-md border border-white/20 shadow-lg rounded-lg',
  cardElevated: 'bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-lg',
  cardHover: 'hover:bg-white/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
  cardInteractive: 'bg-white/15 backdrop-blur-md border border-white/20 shadow-lg rounded-lg hover:bg-white/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
  
  // Navigation styles
  nav: 'bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm',
  navItem: 'hover:bg-white/20 transition-colors duration-200 rounded-md',
  sidebar: 'bg-white/10 backdrop-blur-lg border-r border-white/20',
  sidebarItem: 'hover:bg-white/15 transition-all duration-200 rounded-lg',
  
  // Dashboard specific
  dashboard: 'bg-white/8 backdrop-blur-md rounded-xl border border-white/15',
  dashboardHeader: 'bg-white/20 backdrop-blur-lg border-b border-white/20',
  dashboardContent: 'bg-white/5 backdrop-blur-sm rounded-lg border border-white/10',
  
  // Modal/Dialog styles
  modal: 'bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl rounded-xl',
  modalOverlay: 'bg-black/20 backdrop-blur-sm',
  dropdown: 'bg-white/90 backdrop-blur-lg border border-white/30 shadow-xl rounded-lg',
  
  // Button variants with brand colors
  primaryButton: 'bg-brand-teal/80 hover:bg-brand-teal/90 backdrop-blur-sm border border-white/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300',
  secondaryButton: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:shadow-md transition-all duration-300',
  accentButton: 'bg-brand-accent/80 hover:bg-brand-accent/90 backdrop-blur-sm border border-white/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300',
  
  // Input and form styles
  input: 'bg-white/20 backdrop-blur-sm border border-white/30 focus:border-brand-teal/50 focus:bg-white/25 transition-all duration-200',
  select: 'bg-white/20 backdrop-blur-sm border border-white/30 focus:border-brand-teal/50',
  textarea: 'bg-white/20 backdrop-blur-sm border border-white/30 focus:border-brand-teal/50 focus:bg-white/25',
  
  // Status indicators with glass effect
  success: 'bg-green-500/15 backdrop-blur-sm border border-green-500/30 text-green-700 rounded-lg',
  warning: 'bg-yellow-500/15 backdrop-blur-sm border border-yellow-500/30 text-yellow-700 rounded-lg',
  error: 'bg-red-500/15 backdrop-blur-sm border border-red-500/30 text-red-700 rounded-lg',
  info: 'bg-blue-500/15 backdrop-blur-sm border border-blue-500/30 text-blue-700 rounded-lg',
  
  // Layout components
  container: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl',
  section: 'bg-white/10 backdrop-blur-md border border-white/15 rounded-lg',
  panel: 'bg-white/20 backdrop-blur-lg border border-white/25 rounded-lg shadow-lg',
};

// Helper functions for creating glassmorphism effects
export const createGlassEffect = (opacity = 0.15, blur = 'md', borderOpacity = 0.2) => {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md', 
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };
  
  return `bg-white/${Math.round(opacity * 100)} ${blurValues[blur]} border border-white/${Math.round(borderOpacity * 100)}`;
};

export const createBrandGlassEffect = (color: 'teal' | 'accent' | 'primary' | 'brown', opacity = 0.8, hover = true) => {
  const colorMap = {
    teal: 'brand-teal',
    accent: 'brand-accent', 
    primary: 'brand-primary',
    brown: 'brand-brown'
  };
  
  const baseClass = `bg-${colorMap[color]}/${Math.round(opacity * 100)} backdrop-blur-sm border border-white/20`;
  const hoverClass = hover ? `hover:bg-${colorMap[color]}/${Math.round((opacity + 0.1) * 100)} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300` : '';
  
  return `${baseClass} ${hoverClass}`.trim();
};

// CSS custom properties for glassmorphism
export const glassmorphismCSSVariables = `
  :root {
    /* Base glass properties */
    --glass-bg-light: rgba(255, 255, 255, 0.15);
    --glass-bg-medium: rgba(255, 255, 255, 0.2);
    --glass-bg-heavy: rgba(255, 255, 255, 0.8);
    --glass-border-light: rgba(255, 255, 255, 0.15);
    --glass-border-medium: rgba(255, 255, 255, 0.25);
    --glass-border-heavy: rgba(255, 255, 255, 0.3);
    --glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.05);
    --glass-shadow-md: 0 8px 32px rgba(0, 0, 0, 0.1);
    --glass-shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15);
    
    /* Brand color glass variants */
    --teal-glass: rgba(30, 168, 150, 0.8);
    --accent-glass: rgba(255, 113, 91, 0.8);
    --primary-glass: rgba(76, 84, 84, 0.8);
    --brown-glass: rgba(82, 63, 56, 0.8);
  }
`;

// Comprehensive glassmorphism utility functions
export const glassClassNames = {
  // Standard glass effects
  card: () => glassmorphismStyles.card,
  cardElevated: () => glassmorphismStyles.cardElevated,
  cardHover: () => glassmorphismStyles.cardHover,
  cardInteractive: () => glassmorphismStyles.cardInteractive,
  
  // Navigation
  nav: () => glassmorphismStyles.nav,
  sidebar: () => glassmorphismStyles.sidebar,
  
  // Buttons
  primaryButton: () => glassmorphismStyles.primaryButton,
  secondaryButton: () => glassmorphismStyles.secondaryButton,
  accentButton: () => glassmorphismStyles.accentButton,
  
  // Forms
  input: () => glassmorphismStyles.input,
  
  // Layout
  dashboard: () => glassmorphismStyles.dashboard,
  modal: () => glassmorphismStyles.modal,
  panel: () => glassmorphismStyles.panel,
  
  // Status
  success: () => glassmorphismStyles.success,
  warning: () => glassmorphismStyles.warning,
  error: () => glassmorphismStyles.error,
  info: () => glassmorphismStyles.info,
};

// Tailwind plugin for glassmorphism
export const glassmorphismPlugin = {
  '.glass-card': {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
  },
  '.glass-card-elevated': {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
    borderRadius: '0.5rem',
  },
  '.glass-nav': {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
  },
  '.glass-sidebar': {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  },
  '.glass-button': {
    background: 'rgba(30, 168, 150, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
  },
  '.glass-button:hover': {
    background: 'rgba(30, 168, 150, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  '.glass-modal': {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    borderRadius: '1rem',
  },
  '.glass-input': {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.2s ease',
  },
  '.glass-input:focus': {
    background: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(30, 168, 150, 0.5)',
    boxShadow: '0 0 0 2px rgba(30, 168, 150, 0.1)',
  },
};