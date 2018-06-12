const isProduction = process.argv.indexOf('production') > 0
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx'
    // vendor: ['react', 'react-dom', 'antd']
  },
  // entry: './src/index.tsx',
  output: {
    filename: 'js/[name]_bundle.js',
    chunkFilename: 'js/[name]_bundle.js',
    path: path.resolve(__dirname, './build/dist/'),
    publicPath: '/dist/'
  },
  // optimization: {
  //   // 包清单
  //   runtimeChunk: {
  //     name: 'manifest'
  //   },
  //   // 拆分公共包
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       styles: {
  //         name: 'app',
  //         test: /\.(sa|sc|c)ss$/,
  //         minChunks: 1,
  //         reuseExistingChunk: true,
  //         enforce: true
  //       },
  //       // 项目公共组件
  //       common: {
  //         chunks: 'initial',
  //         name: 'common',
  //         minChunks: 2,
  //         maxInitialRequests: 5,
  //         minSize: 0,
  //         enforce: true
  //       },
  //       // 第三方组件
  //       vendor: {
  //         test: /node_modules/,
  //         chunks: 'initial',
  //         name: 'vendor',
  //         priority: 10,
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true // set to true if you want JS source maps
      // }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 包清单
    runtimeChunk: {
      name: 'manifest'
    },
    // 拆分公共包
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.(sa|sc|c)ss$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        // 项目公共组件
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          enforce: true
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         url: false,
      //         sourceMap: !isProduction
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: !isProduction
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
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
        use: 'url-loader?limit=8192&name=images/[hash:6].[ext]'
      },
      {
        test: /\.woff(2)$/,
        use: 'url-loader?limit=10000&name=dist/fa/[hash].[ext]&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'url-loader?name=dist/fa/[hash].[ext]'
      }
    ]
  },
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Summit Web',
      hash: true,
      // chunks: ['manifest', 'common', 'vendor', 'app'],
      filename: '../index.html',
      template: './public/template.html',
      minify: {
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
      },
      cache: true
    })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : [
    new CleanWebpackPlugin('./build')
  ])
}
