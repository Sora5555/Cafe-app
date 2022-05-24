const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    user = await getUserByUsername(username);
    if (user === null) {
      return done(null, false, { message: "no user with that name" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password is wrong" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id));
  });
}
module.exports = initialize;
