import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // res.status(419).json({
      //   code: 419,
      //   message: 'token is expired',
      // });
      res.redirect('/login');
    } else if (err.name === 'JsonWebTokenError') {
      // res.status(401).json({
      //   code: 401,
      //   message: '유효하지 않은 토큰입니다.',
      // });
      res.redirect('/login');
    }
  }
};

export default verifyToken;
