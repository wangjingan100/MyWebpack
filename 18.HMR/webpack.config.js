
/* 
HMR:hot module replacement 热模块替换 / 模块热更新
  作用：一个模块发生变化， 只会重新打包这一个模块（而不是打包所有模块）
    极大的提升构建速度
    样式文件：可以使用HMR功能：因为style-loader内部实现了
    js文件：默认是没有HMR功能的，解决办法是在index.js中添加代码
    HTML文件：默认不能使用HMR功能，同时会导致问题，html文件不能热更新了
    解决：entry:['./src/js/index.js','./src/index.html'],但是HTML还是不能热更新 因为我们开发时候只有一个HTML文件 一旦它发生变化了就必须重新加载
*/

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
  mode:'development',
  entry:['./src/js/index.js','./src/index.html'],
  output:{
    filename:'js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:[
         // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader','less-loader']
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          esModule:false,
          outputPath:'imgs'
        }
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(html|css|less|js|png|jpg|gif)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'css/built.css'  // 作用是把打包好的文件放在一个单独的css目录中
    })
  ],
  devServer:{
    contentBase:'build',
    compress:true,
    port:3000,
    open:true,
    // 开启HMR功能
    hot:true
  }
}
