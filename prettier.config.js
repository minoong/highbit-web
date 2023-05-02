// prettier.config.js
module.exports = {
 useTabs: false,
 tabWidth: 1,
 printWidth: 120,
 semi: false,
 trailingComma: 'all',
 singleQuote: true,
 tailwindConfig: './tailwind.config.js',
 plugins: [require('prettier-plugin-tailwindcss')],
}
