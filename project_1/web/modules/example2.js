export default function ExampleModule2(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  // console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt2 is ready')
  })
  this.nuxt.hook('error', async error => {
    // Your custom code here
    console.log('Nuxt2 is error')
  })
  this.nuxt.hook('close', async nuxt => {
    // Your custom code here
    console.log('Nuxt2 is close')
  })
  this.nuxt.hook('listen', async (server, { host, port }) => {
    // Your custom code here
    console.log('Nuxt2 is listen')
  })
}

// // REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json')