import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Cyanotype — photographic process ink, not sky SaaS blue */
        primary: {
          50: '#f2f6f7',
          100: '#e0ebed',
          200: '#c2d6db',
          300: '#96b8c1',
          400: '#6a97a4',
          500: '#3d7382',
          600: '#2f5c69',
          700: '#264a55',
          800: '#213e47',
          900: '#1c343c',
        },
        accent: {
          50: '#f4f6f5',
          100: '#e4e9e7',
          200: '#c9d3cf',
          300: '#a3b3ad',
          400: '#7a9189',
          500: '#5c756d',
          600: '#485e57',
          700: '#3c4d48',
          800: '#33403c',
          900: '#2c3633',
        },
      },
      fontFamily: {
        sans: [
          'Source Serif 4',
          'Noto Serif SC',
          'Georgia',
          'ui-serif',
          'serif',
        ],
        serif: [
          'Source Serif 4',
          'Noto Serif SC',
          'Georgia',
          'ui-serif',
          'serif',
        ],
        display: ['Syne', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        gradient: 'gradient 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [typography],
};
