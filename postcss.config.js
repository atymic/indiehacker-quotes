module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.js'),
    require('autoprefixer')({
      add: true,
      grid: true
    }),
  ],
};
