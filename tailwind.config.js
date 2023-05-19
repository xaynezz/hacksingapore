/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            clipPath: {
                customPolygon: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              },
            colors: {
                primary: {
                    100: "#cce0d2",
                    200: "#99c1a5",
                    300: "#66a379",
                    400: "#33844c",
                    500: "#00651f",
                    600: "#005119",
                    700: "#003d13",
                    800: "#00280c",
                    900: "#001406",
                },
                secondarylight: {
                    100: "#fef7de",
                    200: "#feefbd",
                    300: "#fde89c",
                    400: "#fde07b",
                    500: "#fcd85a",
                    600: "#caad48",
                    700: "#978236",
                    800: "#655624",
                    900: "#322b12",
                },
                secondarydark: {
                    100: "#ffeecc",
                    200: "#ffdd99",
                    300: "#ffcc66",
                    400: "#ffbb33",
                    500: "#ffaa00",
                    600: "#cc8800",
                    700: "#996600",
                    800: "#664400",
                    900: "#332200",
                },
            },
        },
    },
    variants: {},
    plugins: [],
};
