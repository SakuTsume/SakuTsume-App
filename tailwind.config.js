/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3effb',
          100: '#e7dff8',
          200: '#d0bff0',
          300: '#b89fe8',
          400: '#a17fe0',
          500: '#895fd8',
          600: '#7240cf',
          700: '#6232b8',
          800: '#5E17EB', // Main primary
          900: '#4b128c',
        },
        secondary: {
          50: '#e6f7f8',
          100: '#cceff1',
          200: '#99dfe3',
          300: '#66cfd5',
          400: '#33bfc7',
          500: '#0CA5B0', // Main secondary
          600: '#0a8a94',
          700: '#076f77',
          800: '#05555b',
          900: '#022a2e',
        },
        accent: {
          50: '#ffe6ec',
          100: '#ffccd9',
          200: '#ff99b3',
          300: '#ff668d',
          400: '#FF3366', // Main accent
          500: '#ff0047',
          600: '#cc0039',
          700: '#99002b',
          800: '#66001d',
          900: '#33000e',
        },
        success: {
          50: '#e9f7ec',
          100: '#d3eed9',
          200: '#a7ddb3',
          300: '#7bcb8d',
          400: '#4fba67',
          500: '#23a941',
          600: '#1c8734',
          700: '#156528',
          800: '#0e441b',
          900: '#07220d',
        },
        warning: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc300',
          600: '#cc9c00',
          700: '#997500',
          800: '#664e00',
          900: '#332700',
        },
        error: {
          50: '#fdecec',
          100: '#fbd9d9',
          200: '#f7b3b3',
          300: '#f38d8d',
          400: '#ef6767',
          500: '#eb4141',
          600: '#bc3434',
          700: '#8d2727',
          800: '#5e1a1a',
          900: '#2f0d0d',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#3b3b3b',
          800: '#222222',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-in',
        'pulse-slow': 'pulse 4s infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};