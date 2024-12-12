/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="forest"]'], // Enables dark mode based on the class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glowLight: "0 1px 30px rgba(0, 0, 0, 0.2)",  // Light mode glow (gray)
        glowDark: "0 1px 30px rgba(255, 255, 255, 0.25)",   // Dark mode glow (white)
      },
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', 'monospace'], // Default JetBrains Mono font
      },
      fontSize: {
        responsive: 'clamp(0.35rem, 10vw, 2rem)', // Scales between 1rem and 2.5rem based on viewport width
        'responsive-content': 'clamp(0.45rem, 2vw, 1.5rem)'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["forest", "nord"], // Themes for DaisyUI
    darkTheme: "forest", // Specifies the dark theme
  },
};
