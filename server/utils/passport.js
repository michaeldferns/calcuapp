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
        const user = await db.models.Users.findOne({
          where: {
            email,
            password,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
