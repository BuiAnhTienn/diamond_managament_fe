/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgBlur: "rgba(0,0,0,0.05)",
        secondaryColor: "#003468",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

//
