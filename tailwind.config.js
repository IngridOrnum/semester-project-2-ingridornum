/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './auth/**/*.html',
        './auth/**/*.js',
        './profile/**/*.html',
        './profile/**/*.js',
        './single-listing/**/*.html',
        './single-listing/**/*.js',
        './account/**/*.html',
        './account/**/*.js',
        './listings/**/*.js',
        './listings/**/*.html',
        './src/**/*.js',
        "./**/*.{js, html}",
        "!node_modules"
    ],
    theme: {
        extend: {
            screens: {
                tablet: '760px',
                laptop: '1024px',
                desktop: '1400px'
            },
            fontFamily: {
                logo: ['Fahkwang', 'sans-serif'],
                heading: ['DM Serif Display', 'sans-serif'],
                subtitle: ['DM Serif Text', 'sans-serif'],
                textTitle: ['Baskervville', 'sans-serif'],
                text: ['Poppins', 'sans-serif'],
            },
            colors: {
                'primary-green': '#7A917F',
                'ui-black': '#2E2E2E',
                'ui-gray': '#929292',
                'ui-white': '#F7F7F7',
                'notif-green': '#008659',
                'notif-yellow': '#BD7A03',
                'notif-red': '#D13821',

            },
            backgroundColor: {
                'public': '#F2F1EF',
                'profile': '#D5DAD6',
                'element': '#F7F7F7',
                'primary-green': '#7A917F',
                'ui-black': '#2E2E2E',
                'notif-bg-green': '#F1FFED',
                'notif-bg-yellow': '#FFF0DF',
                'notif-bg-red': '#FFF0F0'
            },
            gap: {
                'sm': '42px',
                'md': '62px',
                'lg': '82px'
            }
        },
    },
    plugins: [],
}



