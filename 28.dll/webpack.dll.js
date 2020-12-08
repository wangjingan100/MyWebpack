
/* 
使用dll技术，对某些库（第三方库：jQuery,react,vue ....）进行单独打包
当运行 webpack时，默认查找的是 webpack.config.js
需求：需要运行 webpack.dll.js 文件
-->命令： webpack --config webpack.dll.js 
*/
const {resolve} = require('path');
const webpack = require('webpack');

module.exports={
  entry:{
    // 最终打包生成的[name]  --> jquery
    // ['jquery'] --> 要打包的库是 jQuery
    jquery:['jquery']
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'dll'),
    library:'[name]_[hash]', // 打包的库里面向外暴露出去的名字叫什么名字
  },
  plugins:[
    new webpack.DllPlugin({
      name:'[name]_[hash]',  // 映射库的暴露的内容名称
      path:resolve(__dirname,'dll/manifest.json')  // 输出文件路径
    })
  ],
  mode:'production'
}