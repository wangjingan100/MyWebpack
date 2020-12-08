
// import {plus} from './test';
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

// 通过js代码，让某个文件被单独打包成一个chunk
// import动态导入语法：能将某个文件单独打包
import(/* webpackChunkName:'test' */'./test')
  .then(({plus,minus}) => {
    // eslint-disable-next-line
    console.log(plus);
  })
  .catch(() => {
    // esline-disable-next-line
    console.log('加载失败');
  })

