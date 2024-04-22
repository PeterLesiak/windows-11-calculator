import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      accent: 'var(--clr-current-accent)',
      highlite: 'var(--clr-current-highlite)',

      red: 'hsl(5, 75%, 44%)',

      light: {
        100: '#FFFFFF',

        500: '#A4A4A4',
        700: '#828282',
      },

      dark: {
        200: '#464646',
        300: '#444444',
        400: '#3A3A3A',
        500: '#363636',
        600: '#2D2D2D',
        700: '#202020',
      },
    },

    extend: {
      dropShadow: {
        '5xl': '0 45px 35px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
