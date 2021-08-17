import express from 'express'

const router = express.Router();

const exec = require('child_process');

router.post('/exec', async (req, res) => {
  console.log('/api/v1/express/exec');
  const params = req.body;
  console.log(params);
  let rt = {};
  try {
    const os = process.platform;
    if (os === 'win32') {
      console.log('dd');
      //tracert -h 4 8.8.8.8
      const test = exec.execSync(`tracert -h 4 ${params.ip}`);

      // const cmd = `tracert -h 4 ${params.ip}`;
      // const test = exec.exec(cmd, function(err, stdout, stderr) {
      //   console.log('....');
      //   console.log('err : ', err);
      //   console.log('stdout : ', stdout);
      //   console.log('stderr : ', stderr);
      // })
      rt.error = false;
      rt.msg = test.toString();
    }

  } catch (err) {
    console.error(err);
    rt.error = true;
    rt.msg = err.message;
  }
  res.send(rt);
})

module.exports = router;