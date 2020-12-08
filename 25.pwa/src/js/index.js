import { plus } from './test';

import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(plus(2, 3));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

/*
  1. 注册serviceWorker
  2. 处理兼容性问题
  3. eslint 不认识 window navigation全局变量，需要在 package.json中添加如下配置
  "eslintConfig": {
    "extends": "airbnb-base",
    "env":{
      "browser":true  // 支持浏览器全局变量
    }
  },
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~~');
      })
      .catch(() => {
        console.log('sw注册失败了~~');
      });
  });
}
