module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5', // Purple Tint
        'bg-light': '#f4f7fa',
        'bg-dark': '#2d2d2d',
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--bg-light), #e0e7ff)',
        'grid': 'linear-gradient(45deg, rgba(79, 70, 229, 0.1) 25%, transparent 25%) -50px 0, linear-gradient(45deg, rgba(79, 70, 229, 0.1) 25%, transparent 25%) -50px 0',
      },
    },
  },
  plugins: [],
};
