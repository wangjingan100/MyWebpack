
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/js/index.js',
  entry:{
    index:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
  /* 可以将node_modules中的代码单独打包成一个chunk文件输出 
   自动分析多入口chunk中有没有公共的文件，如果有会打包成单独的一个 */
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  }
}