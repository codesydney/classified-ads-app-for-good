const path = require('path')
const { IgnorePlugin } = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'node',
  plugins: [
    new IgnorePlugin({
      resourceRegExp:
        /^(kerberos|@mongodb-js\/zstd|@aws-sdk\/credential-providers|gcp-metadata|snappy|socks|aws4|mongodb-client-encryption)$/,
    }),
  ],
  ignoreWarnings: [
    /Critical dependency: the request of a dependency is an expression/,
  ],
}
