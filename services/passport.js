const LocalStrategy = require('passport-local').Strategy;
const authRepositories = require('../repositories/authRepositories');
const User = require ('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, 
            async (email, password, done) => {
                authRepositories.findCustomerAccount(email, password, done)
            })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
        console.log('serial')
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err,user) => {
            done(err, user);
            console.log('deseria')
        })
    });  
}