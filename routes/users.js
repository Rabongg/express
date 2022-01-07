import express from 'express';
import verifyToken from '../service/authmiddleware';

const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, (req, res) => {
  res.send('respond with a resource');
});

export default router;
