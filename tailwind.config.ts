/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        error: "var(--error-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
        border: "var(--border-color)",
        inputBorder: "var(--input-border-color)",
      },
    },
  },
  plugins: [],
};
