const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await db.models.User.findOne({
          where: {
            email,
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'A user with that email does not exist.',
          });
        }

        const valid = await user.validPassword(password);

        if (!valid) {
          return done(null, false, {
            message: 'Login failed.',
          });
        }

        user.password = undefined;

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
