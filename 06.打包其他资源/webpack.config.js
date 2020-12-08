
const {resolve}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        exclude:/\.(html|js|css)$/,
        loader:'file-loader',
        options:{
          name:'[hash:5].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    })
  ]
}