export default function ({$auth, store, app}) {
  console.log('타냐?');
  console.log($auth);
  console.log(app);
  app.router.beforeResolve( async (to, from, next) => {
    console.log("탔냐???");
    
    next();
  })
}