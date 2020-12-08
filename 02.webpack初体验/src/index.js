/* 
index.js:Webpage入口起点文件

安装webpage指令：
1 先初始化一个package.json文件
  1.1 npm init
  1.2 输入名称
  1.3 一直回车即可

2 npm i webpack@4.41.6 webpack-cli@3.3.11 -g 这个是全局安装
  只安装了全局的就可以
3 npm i webpack@4.41.6 webpack-cli@3.3.11 -D 这个是开发包
4 node 执行代码 node .\build\built.js  相当于右键 run code

1.运行指令：
  开发环境：webpack ./src/index.js -o ./build/built.js  --mode=development 
  生成环境：webpack ./src/index.js -o ./build/built.js  --mode=production

2.结论：
  2.1 webpage能处理js/json，不能处理css/img等其他资源
  2.2 生成环境和开发环境的对比
  2.3 

*/

import data from './data.json';
console.log(data);
import './index.css'

function add(x,y){
  return x+y;
}
console.log(add(1,2));