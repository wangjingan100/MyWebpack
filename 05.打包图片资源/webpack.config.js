
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports={
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      },
      {
        // 处理图片资源
        test:/\.(jpg|png|gif)$/,
        // 使用一个loader，下载 url-loader file-loader
        loader:'url-loader',
        options:{
          // 图片的大小小于8kb，就会被base64处理
          // 优点：减少请求次数，减轻服务器压力
          limit:18*1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader使用commonjs解析引入的图片，解析时候会出现问题[object Module],解决办法：关闭url-loader的es6 模块化，使用commonjs解析。
          esModule:false,
          // 给图片进行重命名，[hash:10] 取图片的hash的前10位，[ext] 取文件原来的扩展名。
          name:'[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        // 处理HTML中的图片，负责引入img，从而能被url-loader进行处理
        loader:'html-loader',
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    })
  ]
}