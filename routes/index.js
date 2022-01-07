import express from 'express';
import userData from '../models/user.json';
import makeToken from '../service/auth';
import verifyToken from '../service/authmiddleware';

const router = express.Router();

/* GET home page. */
router.get('/', verifyToken, (req, res) => {
  res.send('Welcome to api express server');
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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const value = userData.find((user) => user.username === username && user.password === password);
  if (value === undefined) {
    res.redirect('/login?fail=true');
  } else {
    const token = makeToken({ nickname: value.nickname });
    res.render('index', { user: value.nickname, token });
  }
});

export default router;
