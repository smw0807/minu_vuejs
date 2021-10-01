console.log('====== vue.config.js =======');
console.log('config test1 : ', process.env.VUE_APP_API_URL1);
console.log('config test2 : ', process.env.VUE_APP_API_URL2);
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api1' : {
        target: process.env.VUE_APP_API_URL1
      },
      '/api2': {
        target: process.env.VUE_APP_API_URL2
      }
    }
  }
}
