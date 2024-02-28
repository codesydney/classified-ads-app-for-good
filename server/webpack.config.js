const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  externals: [/node_modules/],
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^(node-gyp|npm|bson-ext|snappy\/package.json)$/,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'null-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
      'mock-aws-s3': false,
      'aws-sdk': false,
      nock: false,
    },
  },
  ignoreWarnings: [warning => /Can't resolve/.test(warning.message)],
}
