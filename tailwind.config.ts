import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'custom-dark': '#121212',
          'another-color': '#FF5733', // Example of another custom color
        },
      },
    },
    plugins: [],
  };

  export default config;