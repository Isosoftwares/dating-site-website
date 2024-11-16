/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#00b8a9",
        secondary: "#FA812F",
        dark: "#2a2a2a",
        dark2: "#181D31",
        light: "#fff",
      },
      backgroundImage: {
        hero: "url('/src/assets/bg1.jpg')",
        login: "url('/src/assets/people2.jpg')",
        gradientBg: "url('/src/assets/gradi.png')",
        green: "url('/src/assets/green.jpg')",
        greend: "url('/src/assets/greend.jpg')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      screens: {
        sm: "640px", // phones
        md: "768px", // tablets
        lg: "1280px", // laptops up to 15 inches
        xl: "1440px", // larger screens (24-inch monitors)
      },
    },
  },
  plugins: [],
};
