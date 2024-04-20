import type { Config } from 'tailwindcss';

const Config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#c42b1c',

      light: {
        100: '#ffffff',
      },

      dark: {
        600: '#363636',
        700: '#202020',
      },
    },

    extend: {
      borderRadius: {
        md: '10px',
      },

      dropShadow: {
        '5xl': '0 45px 35px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
export default Config;
