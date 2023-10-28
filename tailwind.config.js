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
                jenny: {
                    "primary": "#193346",
                    "secondary": "#ECF6FA",
                    "accent": "#3D97D9",
                    "neutral": "#ECF6FA",
                    "base-100": "#fcfcfd",
                    "info": "#85cde0",
                    "success": "#1edcbf",
                    "warning": "#f4dd66",
                    "error": "#ec7484",
                },
            }],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

