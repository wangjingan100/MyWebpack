const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';


module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /* 
          css 兼容性处理：postcss --> postcss-loader postcss-preset-env
          帮助postcss找到package.json 中的browserlist里面的配置，通过配置加载指定的css指定的兼容性样式
          "browserslist":{
            // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
            "development":[
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
            // 生产环境：默认情况下是生产环境。要想改变 需要设置上面的环境变量
            "production":[
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
          }
          */
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ]
}