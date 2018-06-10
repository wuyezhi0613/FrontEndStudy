const isProduction = process.argv.indexOf('production') > 0
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isSourceMap = isProduction ? false : true
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
  optimization: {
    // 包清单
    runtimeChunk: {
      name: 'manifest'
    },
    // 拆分公共包
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.(c|sc)ss$/,
        //   chunks: 'initial',
        //   enforce: true
        // },
        // 项目公共组件
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        // 第三方组件
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    host: 'localhost',
    port: 8080,
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
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          isProduction ? MiniCssExtractPlugin.loader : {
            loader: 'style-loader',
            options: {
              sourceMap: isSourceMap
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isSourceMap
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isSourceMap,
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isSourceMap
            }
          }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|gif|ico|cur)$/,
        use: 'url-loader?limit=1500&name=images/[hash:6].[ext]'
      },
      {
        test: /\.woff(2)$/,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].style.css'
      // chunkFilename: '[id].css'
    })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ] : [
    new MiniCssExtractPlugin({
      filename: 'css/[name].style.css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin('./build'),
    new HtmlWebpackPlugin({
      title: 'Summit Web',
      chunks: ['app_bundle'],
      filename: '../index.html',
      template: './public/index.html'
    })
  ])
}
