import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Welcome to api express server');
});

router.get('/login', (req, res) => {
  res.render('login');
});

export default router;
