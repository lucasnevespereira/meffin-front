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
        themes: ["light", "dark", "cupcake", "wireframe", "synthwave", "lofi",
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
            },
            {
                modernDark: {
                    "primary": "#1A1A2E",
                    "secondary": "#16213E",
                    "accent": "#0F3460",
                    "neutral": "#1B262C",
                    "base-100": "#121212",
                    "info": "#3282B8",
                    "success": "#4CAF50",
                    "warning": "#FF9800",
                    "error": "#F44336",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

