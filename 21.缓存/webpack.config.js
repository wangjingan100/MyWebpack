
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* 
  缓存：
  babel缓存：cacheDirectory:true 即可
    作用：-->让第二次打包构建速度更快
  文件资源缓存：
    hash：每次webpack 构建时会生成一个唯一的hash值
    问题：因为js和css同时使用一个hash值 ，重新打包，会导致缓存失效，（我只改动了一个文件，所有的缓存都失效了不好）
    chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值一样
    问题：因为js和css同时使用一个hash值，所以这种打包方式还是不行
    contenthash:根据文件内容生成hash值，不同文件hash值不一样
    作用：--> 让代码上线运行缓存更好使用
*/

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要再package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  },
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          {
            // Css 兼容性处理
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                    }
                  }
                ]
              ],
              // 开启babel缓存，第二次构建时，会读取之前的缓存
              // 因为js代码最多，假如有100个js模块 我只修改了其中一个，其实我只需要重新构建这一个就可以了。
              cacheDirectory:true
            }
          },
          {
            // 处理图片资源
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false  // 使用html-loader 需要这个 
            }
          },
          {
            // 处理HTML中的图片资源 img src 这种
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            // 处理其他文件
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
  devtool:'source-map'
}