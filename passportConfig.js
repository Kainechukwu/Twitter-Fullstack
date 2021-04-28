const User = require("./Models/users.js");

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;



module.exports = function (passport) {
    passport.use(new localStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user);
        });
    });
};