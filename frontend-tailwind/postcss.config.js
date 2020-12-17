const cssnano = [
  'cssnano',
  {
    preset: 'default',
  },
]

const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['src/**/*.{js,jsx,ts,tsx}'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
]

const productionFeatures =
  process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...productionFeatures,
  ],
}
