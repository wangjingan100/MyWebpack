console.log('index.js加载了~');


// import { plus} from './test';
// console.log(plus(3,4));

document.getElementById('btn').onclick = function () {
  // lazy loading  可以正常使用 预加载有兼容性问题，慎用
  // webpackPrefetch:true,会在使用之前，提前加载js文件
  // 正常情况下加载是可以并行的，（同一时刻加载多个文件）
  // 预加载：prefetch 是等其他资源加载完毕，浏览器空闲了，在偷偷加载资源。
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./test').then(({ plus }) => {
    console.log(plus(2, 3));
  })
}

