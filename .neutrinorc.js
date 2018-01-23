module.exports = {
  use: [
    '@neutrinojs/eslint',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'next'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
