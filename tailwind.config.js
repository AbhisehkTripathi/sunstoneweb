/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          dark: "hsl(var(--muted-dark))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        wellness: {
          calm: "hsl(var(--wellness-calm))",
          healing: "hsl(var(--wellness-healing))",
          peace: "hsl(var(--wellness-peace))",
          warmth: "hsl(var(--wellness-warmth))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        // Sunstone Mind custom animations
        "breathe-in": {
          "0%, 100%": { 
            transform: "scale(0.8)", 
            opacity: "0.6" 
          },
          "50%": { 
            transform: "scale(1.2)", 
            opacity: "1" 
          }
        },
        "wave-flow": {
          "0%, 100%": { 
            "background-position": "0% 50%" 
          },
          "50%": { 
            "background-position": "100% 50%" 
          }
        },
        "sun-radiate": {
          "0%": { 
            transform: "rotate(0deg)", 
            opacity: "1" 
          },
          "50%": { 
            opacity: "0.5" 
          },
          "100%": { 
            transform: "rotate(360deg)", 
            opacity: "1" 
          }
        },
        "float-gentle": {
          "0%, 100%": { 
            transform: "translateY(0px)" 
          },
          "50%": { 
            transform: "translateY(-8px)" 
          }
        },
        "pulse-glow": {
          "0%, 100%": { 
            "box-shadow": "0 0 20px rgba(76, 201, 192, 0.2)" 
          },
          "50%": { 
            "box-shadow": "0 0 40px rgba(76, 201, 192, 0.4)" 
          }
        },
        "shimmer": {
          "0%": { 
            "background-position": "-200% center" 
          },
          "100%": { 
            "background-position": "200% center" 
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        // Sunstone Mind custom animations
        "breathe-in": "breathe-in 4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "wave-flow": "wave-flow 3s ease-in-out infinite",
        "sun-radiate": "sun-radiate 2s linear infinite",
        "float-gentle": "float-gentle 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Nunito', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'wellness-soft': '0 1px 3px rgba(167, 228, 224, 0.04), 0 1px 2px rgba(44, 62, 80, 0.02)',
        'wellness-medium': '0 2px 8px rgba(167, 228, 224, 0.06), 0 1px 4px rgba(44, 62, 80, 0.03)',
        'wellness-large': '0 4px 16px rgba(167, 228, 224, 0.08), 0 2px 8px rgba(44, 62, 80, 0.04)',
        'wellness-glow': '0 0 16px rgba(167, 228, 224, 0.12), 0 0 8px rgba(167, 228, 224, 0.08)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #A7E4E0 0%, #7DBEDC 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #7DBEDC 0%, #A7D8E8 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FFF3D4 0%, #FFEAB3 100%)',
        'gradient-wellness': 'linear-gradient(135deg, #A7E4E0 0%, #7DBEDC 50%, #7EDFC7 100%)',
        'gradient-calm': 'linear-gradient(135deg, #E8F4F8 0%, #D4EEF7 50%, #C8F2E8 100%)',
        'gradient-sunrise': 'linear-gradient(180deg, #FFF3D4 0%, #C9F0ED 100%)',
        'gradient-twilight': 'linear-gradient(180deg, #A7D8E8 0%, #D8E8ED 100%)',
        'gradient-mist': 'linear-gradient(135deg, #FAFCFD 0%, #F5F9FA 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};