
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
/* 
  PWA:渐进式网络应用程序（离线可访问）
    workbox --> 引用插件：workbox-webpack-plugin
    sw代码必须运行在服务器上：需要下载一个服务器
    npm i serve -g  serve 能快速帮我创建一个服务器
    运行代码：serve -s build  会将build目录下的资源部署成静态资源给外界使用。
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
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /* 
      下面两个配置的作用：
      1. 帮助 servicework快速启动
      2. 删除旧的 servicework
      
      生成一个servicework 配置文件~
      */
      clientsClaim:true,
      skipWaiting:true
    })
  ],
  mode: 'production',
  devtool:'source-map'
}