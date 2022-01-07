import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const makeToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1s' });
  return token;
};

export default makeToken;
