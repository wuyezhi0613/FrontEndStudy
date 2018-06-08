const isProduction = process.argv.indexOf('production') > 0
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'js/[name]_bundle.js',
    path: path.resolve(__dirname, './build/dist/'),
    publicPath: '/dist/'
  },
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    host: 'localhost',
    port: 9000,
    publicPath: '/dist/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  resolve: {
    extensions: ['config.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|gif|ico|cur)$/,
        use: 'url-loader?limit=1500&name=images/[hash:6].[ext]'
      },
      {
          test: /\.woff$/,
          use: 'url-loader?limit=10000&name=dist/fa/[hash].[ext]&mimetype=application/font-woff'
      },
      {
          test: /\.(ttf|eot)$/,
          use: 'file-loader?name=dist/fa/[hash].[ext]'
      }
    ]
  },
  target: 'web',
  plugins: [
    // extractLess
    // new CleanWebpackPlugin('./public/dist'),
    new HtmlWebpackPlugin({
        // title: 'Summit Web',
        chunks: ['app_bundle'],
        filename: '../index.html',
        template: './public/index.html'
    }),
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ] : [])
}
