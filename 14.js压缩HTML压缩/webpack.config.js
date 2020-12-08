const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 改为production 就会自动压缩js代码了
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩HTML配置
      minify:{
        // 移出空格
        collapseWhitespace:true,
        // 移出注释
        removeComments:true
      }
    })
  ]
}