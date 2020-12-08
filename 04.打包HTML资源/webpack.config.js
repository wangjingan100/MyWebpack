
const {resolve}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  mode:'production',
  module:{
    rules:[

    ]
  },
  plugins:[
    // plugins的配置
    // html-webpack-plugin 功能：默认会创建一个空的HTML
    // 需求：需要创建一个有结果的HTML文件
    new HtmlWebpackPlugin({
      template:'./src/index.html',// 复制这个HTML文件到打包后的目录，并自动引入js/css资源
    })
  ]
}