export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  // console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')

  })
  this.nuxt.hook('error', async error => {
    // Your custom code here
    console.log('Nuxt is error')
  })
  this.nuxt.hook('close', async nuxt => {
    // Your custom code here
    console.log('Nuxt is close')
  })
  this.nuxt.hook('listen', async (server, { host, port }) => {
    // Your custom code here
    console.log('Nuxt is listen : ');
  })
  this.nuxt.hook('modules:done', moduleContainer => {
    // This will be called when all modules finished loading
    console.log('modules:done')
  })

  this.nuxt.hook('render:before', renderer => {
    // Called after the renderer was created
    console.log('render:before')
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Called before the compiler (default: webpack) starts
    console.log('build:compile')
  })

  this.nuxt.hook('generate:before', async generator => {
    // This will be called before Nuxt generates your pages
    console.log('generate:before')
  })
}

// // REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json')