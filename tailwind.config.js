import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        forms,
        // Custom plugin for inward curved-left pseudo-element
        function ({ addComponents, theme }) {
            addComponents({
                '.curved-left::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20%',
                    left: '-40px',                // how far the curve bites in
                    width: '80px',                // curve width
                    height: '140%',               // taller for smoother curve
                    backgroundColor: 'rgba(148, 163, 184, 0.35)', // semi-transparent gray to blend with background
                    borderTopRightRadius: '80px', // round only the right side
                    borderBottomRightRadius: '80px',
                    pointerEvents: 'none',
                },
            });
        },
    ],
};