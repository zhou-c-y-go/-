// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 新增抖音红，命名为 dy-red
        'dy-red': '#FE2C55',
      },
    },
  },
  plugins: [],
}
