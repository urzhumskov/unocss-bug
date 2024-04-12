const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')

/** @type () => import('webpack).Configuration */
module.exports = async () => {
  const { default: UnoCSS } = await import('@unocss/webpack')

  return {
    entry: ['./src/index.tsx'],
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: 'eval-source-map',
    devServer: { hot: true, port: 3000, open: false },

    module: {
      rules: [
        {
          test: /\.[tj]s(x?)$/,
          exclude: /node_modules/,
          use: { loader: 'swc-loader' },
        },

        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },

    optimization: { realContentHash: true },

    plugins: [new HtmlWebpackPlugin({ template: './index.ejs' }), UnoCSS()],
  }
}
