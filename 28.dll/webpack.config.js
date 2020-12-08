
const {resolve}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webapck = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    }),
    // 告诉webpack 那些库不参与打包，同时 使用时的名称也得变
    new webapck.DllReferencePlugin({
      manifest:resolve(__dirname,'dll/manifest.json')
    }),
    // 将某个文件打包输出出去，并在HTML中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath:resolve(__dirname,'dll/jquery.js')
    })
  ]
}