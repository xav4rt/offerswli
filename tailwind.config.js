
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.js',
  ],
  theme: {
    extend: {
      colors: {
        'main': '#F8F9FA',      // Off-white background
        'second': '#1A202C',    // Dark text and elements
        'third': '#4A5568',     // Lighter gray text
        'accent': '#007B5F',    // A rich green
        'accent2': '#00644d',   // Darker accent
        'accent1': '#E6F2EF',   // Light accent background
        'warning': '#FFA500',   // Orange for warnings
        'gold': '#FFD700',      // Gold for ratings
        'success': '#28A745',   // Green for success indicators
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
