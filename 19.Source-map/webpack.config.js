
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        use:['style-loader','css-loader','less-loader']
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
    })
  ],
  devServer:{
    contentBase:'build',
    compress:true,
    port:3000,
    open:true,
    // 开启HMR功能
    hot:true
  },
  // 添加source-map 
  devtool:'source-map'
}


