import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, require('@tailwindcss/line-clamp')],

  daisyui: {
    themes: ["sunset",],
  },
};
