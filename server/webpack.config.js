const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { IgnorePlugin } = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp:
        /^(kerberos|@mongodb-js\/zstd|@aws-sdk\/credential-providers|gcp-metadata|snappy|socks|aws4|mongodb-client-encryption)$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new NodePolyfillPlugin(),
  ],
  ignoreWarnings: [
    /Critical dependency: the request of a dependency is an expression/,
  ],
}
