/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Root HTML file
    './auth/**/*.html', // All HTML files under the auth folder
    './auth/**/*.js', // All JS files under the auth folder
    './profile/**/*.html', // All HTML files under the profile folder
    './profile/**/*.js', // All JS files under the profile folder
    './single-listing/**/*.html', // All HTML files under single-listing folder
    './single-listing/**/*.js', // All JS files under single-listing folder
    './public/**/*.html', // Any additional files in public, if necessary
    './src/**/*.js', // Any JS files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

