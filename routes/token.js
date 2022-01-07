import express from 'express';

const router = express.Router();

router.get('/form', (req, res) => {
  res.render('send', { csrfToken: req.csrfToken() });
});

router.post('/process', (req, res) => {
  res.send('data is being processed');
});

export default router;
