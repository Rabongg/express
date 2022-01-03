import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.send('Welcome to api express server');
});

export default router;
