import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userData from '../models/user.json';

const passportConfig = { usernameField: 'username', passwordField: 'password', session: true };

const passportVerify = async (username, password, done) => {
  try {
    const user = userData.find(
      (users) => users.username === username && users.password === password,
    );
    if (!user) {
      return done(null, false, { message: '아이디와 비밀번호를 확인하세요' });
    }
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
};

export default () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
