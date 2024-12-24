// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        quantumBlue: '#00aaff', // 薄い青色
      },
      animation: {
        'quantum-move': 'quantumMove 10s infinite',
      },
      keyframes: {
        quantumMove: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
    },
  },
  plugins: [],
};
