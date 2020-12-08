import '../css/index.less';
import '../css/iconfont.css';
import print from './print';

print();

function add(x,y){
  return x+y;
}

console.log(add(3,4));

if(module.hot){
  // 一旦module.hot 为 true 说明开启了HMR功能  -->让HMR功能代码生效，
  module.hot.accept('./print.js',function(){
    // 方法会监听 print.js文件的变化，一旦发生变化，其他模块不会重新打包构建，会执行后面的代码
    print();
  })
}