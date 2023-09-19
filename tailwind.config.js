/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'balsamiq': ['Balsamiq Sans', 'sans'],
            },
        },
    },
    daisyui: {
        themes: ["light", "dark", "cupcake", "wireframe",
            {
                custom: {
                    "primary": "#8c76e0",
                    "secondary": "#beb5ff",
                    "accent": "#d2fcae",
                    "neutral": "#35233e",
                    "base-100": "#fcfcfd",
                    "info": "#85cde0",
                    "success": "#1edcbf",
                    "warning": "#9c5e07",
                    "error": "#ec7484",
                },
            }],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

