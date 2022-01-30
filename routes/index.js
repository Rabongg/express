import express from 'express';
import passport from 'passport';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user?.nickname) {
    res.render('index', { user: req.user.nickname });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  const { fail } = req.query;
  if (fail) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    res.write("<script charset='utf-8'>alert('아이디와 비밀번호를 확인하세요')</script>");
    res.write("<script charset='utf-8'>window.location='/login'</script>");
    res.end();
  } else {
    res.render('login', { csrfToken: req.csrfToken() });
  }
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login?fail=true',
  successRedirect: '/',
}));

export default router;
