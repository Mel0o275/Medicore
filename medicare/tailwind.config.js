/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#00a297",
        "main-hover": "#008f80",
      },
    },
  },
  plugins: [],
};
