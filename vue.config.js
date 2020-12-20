module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/e7tools/' : '/',
  outputDir: 'docs',
  // devServer: {
  //   https: true,
  //   proxy: {
  //     '^/api': {
  //       target: 'http://192.168.5.1:8080',
  //       changeOrigin: true
  //     }
  //   }
  // },
  transpileDependencies: ['vuetify']
};
