const passport = require("passport");

// passport serializing user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// importing strategies
const Auth0Strategy = require("./Auth0Strategy");

// using strategies
passport.use(Auth0Strategy);

module.exports = passport;
