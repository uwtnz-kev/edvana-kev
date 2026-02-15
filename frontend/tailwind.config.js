/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
       fontFamily: {
        sans: ['Inter', 'sans-serif'], // override default
      },
      colors: {
        // Custom brand colors for Edvana
        brand: {
          primary: '#4C5454',
          accent: '#FF715B',
          light: '#FFFFFF',
          teal: '#1EA896',
          brown: '#523F38',
        },
        // shadcn/ui color system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        // Enhanced glass cards
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
        '.glass-card-interactive': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          transition: 'all 0.3s ease',
        },
        '.glass-card-interactive:hover': {
          background: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
        
        // Navigation and layout
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
        '.glass-dashboard': {
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '1rem',
        },
        
        // Buttons
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
        '.glass-button-secondary': {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
        },
        '.glass-button-secondary:hover': {
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        },

        // Buttons
        '.glass-buttonNC': {
      
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
        },
        '.glass-buttonNC:hover': {
 
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        },

        
        // Forms
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
        
        // Modals and overlays
        '.glass-modal': {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          borderRadius: '1rem',
        },
        '.glass-modal-overlay': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(4px)',
        },
        '.glass-dropdown': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
          borderRadius: '0.5rem',
        },
      });
    }
  ],
};