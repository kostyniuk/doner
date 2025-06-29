/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
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