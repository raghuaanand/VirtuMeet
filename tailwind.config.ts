import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        'cyber': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Cyber color palette
        cyber: {
          blue: '#00d9ff',
          purple: '#9d4edd',
          pink: '#ff006e',
          green: '#7209b7',
          orange: '#f72585',
        },
        // Enhanced shadcn color system
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
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00d9ff 0%, #9d4edd 50%, #ff006e 100%)',
        'gradient-cyber-secondary': 'linear-gradient(135deg, #7209b7 0%, #f72585 50%, #ff006e 100%)',
        'gradient-cyber-accent': 'linear-gradient(135deg, #00d9ff 0%, #7209b7 100%)',
        'gradient-surface': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(157, 78, 221, 0.05) 100%)',
        'hero': "url('/images/hero-background.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'cyber': '1.5rem',
        '2cyber': '2rem',
      },
      spacing: {
        'cyber-xs': 'var(--spacing-xs)',
        'cyber-sm': 'var(--spacing-sm)', 
        'cyber-md': 'var(--spacing-md)',
        'cyber-lg': 'var(--spacing-lg)',
        'cyber-xl': 'var(--spacing-xl)',
        'cyber-2xl': 'var(--spacing-2xl)',
        'cyber-3xl': 'var(--spacing-3xl)',
      },
      boxShadow: {
        'cyber-blue': 'var(--shadow-cyber-blue)',
        'cyber-purple': 'var(--shadow-cyber-purple)',
        'cyber-pink': 'var(--shadow-cyber-pink)',
        'elevation': 'var(--shadow-elevation)',
      },
      animation: {
        'cyber-glow': 'cyberGlow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'float-slow': 'float 10s ease-in-out infinite 4s',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'particle-float': 'particleFloat 20s linear infinite',
      },
      keyframes: {
        cyberGlow: {
          '0%': { 
            boxShadow: 'var(--shadow-cyber-blue)',
            filter: 'brightness(1)'
          },
          '100%': { 
            boxShadow: 'var(--shadow-cyber-purple), var(--shadow-cyber-pink)',
            filter: 'brightness(1.2)'
          }
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)'
          },
          '33%': { 
            transform: 'translateY(-20px) rotate(1deg)'
          },
          '66%': { 
            transform: 'translateY(-10px) rotate(-1deg)'
          }
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: 'var(--shadow-cyber-blue)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: 'var(--shadow-cyber-purple), var(--shadow-cyber-pink)',
            transform: 'scale(1.02)'
          }
        },
        particleFloat: {
          '0%': {
            transform: 'translateY(100vh) translateX(0)',
            opacity: '0'
          },
          '10%': {
            opacity: '0.7'
          },
          '90%': {
            opacity: '0.7'
          },
          '100%': {
            transform: 'translateY(-10vh) translateX(100px)',
            opacity: '0'
          }
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
       