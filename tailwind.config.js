/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["", ""],
    // themes: [
    //   {
    //     lemonade: {
    //       primary: "#793ef9",
    //       warning: "#37cdbe",
    //     },
    //   },
    //   { night: { primary: "green", warning: "red" } },
    // ],
  },
};
