module.exports = {
  apps: [
    {
      name: 'app_1',
      // package.json에 정의된 npm run start를 실행하게 해서 PM2로 관리하게 한다.
      // script: 'npm',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/root/nuxt/web/',
      args: 'dev',
      instances: 1,
      // autorestart: true,
      // watch: false,
      max_memory_restart: '1G',
      // 개발 환경에서 적용될 설정
      // pm2 start ecosystem.config.js
      // env: {
      //   HOST: '0.0.0.0',
      //   PORT: 3000,
      //   NODE_ENV: 'development'
      // },
      // 배포 환경에서 적용될 설정
      // pm2 start ecosystem.config.js --env production
      env_production: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production'
      },
      output: './logs/console.log',
      error: './logs/consoleError.log'
    }
  ],
  // deploy: {
  //   production: {
  //     // sample
  //     user: 'node',
  //     host: 'localhost',
  //     ref: 'origin/master',
  //     // repo: 'git@github.com:repo.git',
  //     path: '/root/nuxt/web',
  //     'post-deploy':
  //       'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
}
