const fs = require('fs');
const aRoot = require('app-root-path');
const { workerData, parentPort } = require('worker_threads');

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms * 1000);
  })
};

async function run() {
  const data = JSON.stringify(workerData);
  console.log('worker/makeFile.js start', workerData);
  const fileName = 'test.json';
  fs.writeFileSync(aRoot + '/api/files/' + fileName, data, 'utf-8');
  parentPort.postMessage(fileName);
  await sleep(5);
  console.log('worker/makeFile.js end');
}
run();