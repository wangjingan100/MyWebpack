const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        /* 
        js 兼容性处理 babel-loader @babel/preset-env @babel/core 
          1. 基本js兼容性处理 --> 使用 @babel/preset-env
            问题：只能转换基本语法，如：promise这种ES6语法就不能转换
          2.全部的js兼容性处理， --> @babel/polyfill
            问题：我只要解决部分兼容性的问题，将所有兼容性代码全部引入，体积太大了。是一个插件 只需要在index.js中引入即可 import '@babel/polyfill';
          3.需要做兼容性处理的就是：按需加载  --> core-js 
            注意：使用第三种方案需要把第二种方案注释掉
        */
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设，指示Babel做怎样的兼容性处理
          presets: [
            // '@babel/preset-env',  // 第一种方案使用这个
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}