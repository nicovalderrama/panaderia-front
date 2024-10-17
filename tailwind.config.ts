import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "marron-claro": "#ab9680",
        "marron-oscuro": "#8b563b",
        "marron-principal": "#735945",
        trigo: "#ebc68e",
      },
      fontFamily: {
        kindred: ["Kindred", "sans-serif"],
        lora: ["Lora", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
