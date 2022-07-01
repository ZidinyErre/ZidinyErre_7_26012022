const { defineConfig } = require('@vue/cli-service')
const url = require('url');
const path = require('path-browserify');
const util = require('util');
const stream = require('stream-browserify');
const http = require('stream-http');
const crypto = require('crypto-browserify');
const zlib = require('browserify-zlib');



// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  resolve:{
    fallback: {
      url: require.resolve('url'),
      util: require.resolve('util'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib')


    },
  },
}

// module.exports ={
//   configureWebpack: {
//     plugins: [

//     ]
//   }
// }
