import express from 'express';
const router = express.Router();

router.get('/form', (req, res, next)=> {
  res.render('send', {csrfToken: req.csrfToken()});
} )

router.post('/process', function (req, res) {
  console.log(req.session);
  console.log(req.body);
  res.send('data is being processed');
})

export default router;