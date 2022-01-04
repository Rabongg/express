import { Worker, isMainThread, parentPort, workerData, threadId } from 'worker_threads';
import fibonacci from './fibonacci';

try{
  const result = fibonacci(workerData);
  parentPort.postMessage(result);
  process.exit(0);
} catch(e) {
  console.log(e);
}