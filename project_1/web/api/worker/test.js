const { workerData, parentPort } = require('worker_threads');

function sleep(time) {
  return new Promise ( (resolve) => {
    setTimeout(resolve, time * 1000);
  })
}

async function run() {
  const num = workerData.number;
  try {
    console.log(num + ' worker start!!!');
    await sleep(5);
  } catch (err) {
    console.error(err);
  }
  console.log(num + ' worker finish!!!')
  parentPort.postMessage(num)
  parentPort.close();
}
run();