import type { Config } from 'tailwindcss';

const Config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#C42B1C',

      light: {
        100: '#FFFFFF',
      },

      dark: {
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
export default Config;
