let plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'current': 'currentColor',
        'textSecondary': '#6B7280',
        'hoverColor': '#F0F9FF',
        'secondary' : '#E2E3E5',
        'mainBackground': '#fff',
        'secondBackground': '#F3F4F6',
        'darkblue' : '#5D5FEF',
      },
    },
  },
  plugins: [
    plugin(function ({ matchVariant, theme }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: 'n',
            '2n': '2n',
            '2': '2',
            '3n': '3n',
            '5': '5',
            '8': '8'
          },
        }
      );
    }),
  ],
}