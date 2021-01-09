// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: colors.teal[500],
                support: colors.blue[500],
                neutral: colors.blueGray[500],
                danger: colors.red[500],
                warning: colors.yellow[500],
                success: colors.green[500],
                teal: colors.teal,
                blue: colors.blue,
                blueGray: colors.blueGray,
                red: colors.red,
                yellow: colors.yellow,
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    purge: {
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
        ],
        options: {
            defaultExtractor: (content) =>
                content.match(/[\w-/.:]+(?<!:)/g) || [],
            whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
