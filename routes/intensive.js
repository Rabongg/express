import express from 'express';
import { Worker, isMainThread } from 'worker_threads';
import fibonacci from '../service/fibonacci';

const router = express.Router();

router.get('/', (req, res) => {
  const { num } = req.query;
  const start = Date.now();
  if (num) {
    const end = Date.now();
    const result = fibonacci(num);
    res.send(`fibonacci(${num}) = ${result}, took ${end - start} ms`);
  } else {
    res.send('Please specify a number');
  }
});

// router.get('/child', (req, res) => {
//   const { num } = req.query;
//   const start = Date.now();
//   if (num) {
//     const __dirname = path.resolve();
//     const child = fork(path.join(__dirname, 'service/intensive'));
//     child.send(num);
//     child.on('message', (message) => {
//       console.log(message);
//       res.send({
//         result: message,
//       });
//     })
//   } else {
//     res.send('Please specify a number');
//   }
// });

router.get('/worker', async (req, res) => {
  const { num } = req.query;
  if (num) {
    if (isMainThread) {
      const worker = new Worker('./service/worker.js', {
        workerData: num,
      });
      worker.on('message', (msg) => {
        res.send(`result value is ${msg}`);
      });
      worker.on('error', (err) => {
        console.error(err);
      });
      worker.on('exit', (code) => {
        if (code !== 0) {
          console.log(`Worker stopped with exit code ${code}`);
        }
      });
    }
  } else {
    res.send('Please specify a number');
  }
});

export default router;
