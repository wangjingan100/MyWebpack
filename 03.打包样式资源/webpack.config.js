
/* 
webpack.config.js  webpack的配置文件
作用：指示webpack 干哪些活
所有的构建工具都是基于node.js平台运行的，模块化采用commonjs

*/
const {resolve} = require('path');

module.exports={
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      // 详细loader配置，不同文件必须配置不同loader处理
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      { // 这里的less的loader和上面的css的loader不能公用，所以必须写全
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader', // 
          'less-loader' // 将less文件编译成css文件 需要下载less-loader和less两个包
        ]
      }
    ]
  },
  plugins:[

  ],
  mode:'development'

}
