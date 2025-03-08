// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        2: '2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
