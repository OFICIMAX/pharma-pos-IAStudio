import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


const config: Config = {
  theme: {
    extend: {
      boxShadow: {
        'win11-inset': 'inset 0 1px 3px rgba(0,0,0,0.2), inset 0 0 0.5px rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}

export default config;
