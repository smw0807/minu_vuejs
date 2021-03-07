console.log("vue.config.js");
let title = "Vue Web"
module.exports = {
  devServer: {
    proxy: {
      '/v1/': {
        target: 'http://192.168.1.29:3000'
      }
    }
  }
}