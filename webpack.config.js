const isProduction = process.argv.indexOf('production') > 0
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
// const Config = require('./src/config.ts')
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'js/[name]_bundle.js',
    chunkFilename: 'js/[name]_bundle.js',
    path: path.resolve(__dirname, `./build/dist/`),
    publicPath: './dist/'
  },
  optimization: {
    minimizer: [new OptimizeCss({})],
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 1, // 模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, // 入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
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
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1&localIdentName=[local]_[hash:base64:6]',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              ident: 'postcss'
              // plugins: () => [require('autoprefixer')({
              //   'browsers': ['> 1%', 'last 2 versions']
              // })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|gif|ico|cur)$/,
        // use: 'url-loader?limit=1500&name=images/[hash:6].[ext]',
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1500,
            // outputPath: '',
            name: 'images/[hash:6].[ext]',
            publicPath: '/dist'
          }
        }]
      },
      {
        test: /\.woff(2)$/,
        // use: 'url-loader?limit=10000&name=fonts/[hash].[ext]&mimetype=application/font-woff',
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[hash].[ext]',
              // outputPath: 'fonts/',
              publicPath: '/dist',
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:6].[ext]',
            outputPath: 'fonts/',
            publicPath: '/dist'
          }
        }]
      }
    ]
  },
  target: 'web',
  plugins: [
    new OptimizeCss({
      assetNameRegExp: /\.style\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
      new CleanWebpackPlugin('./build'),
      new HtmlWebpackPlugin({
        title: 'Summit Web',
        hash: true,
        filename: '../index.html',
        template: './public/template.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        chunksSortMode: 'none',
        cache: true
      })
    ])
}
