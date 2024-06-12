/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        "min-375px": { min: "425px" },
        "4xl": "2560px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        business: {
          ...require("daisyui/src/theming/themes")["business"],
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          primary: "#0075C2",
        },
      },
      {
        fantasy: {
          ...require("daisyui/src/theming/themes")["fantasy"],
          primary: "#0075C2",
          "base-100": "rgb(243 244 246)",
        },
      },
    ],
  },
};
