import { Worker, isMainThread, parentPort, workerData, threadId } from 'worker_threads';
function fibonacci(num){
  if (num < 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

try{
  const result = fibonacci(workerData);
  parentPort.postMessage(result);
  process.exit(0);
} catch(e) {
  console.log(e);
}
