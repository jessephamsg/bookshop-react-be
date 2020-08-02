const LocalStrategy = require('passport-local').Strategy;
//const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')
//const User = require('../models/User')
const authRepositories = require('../repositories/authRepositories');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, 
            // async (email, password, done)=>{
            // const user = await User.findOne({ email: email})
            // .then(user => {
            //     if (!user) {
            //         return done(null, false)
            //     }
            // bcrypt.compare(password, user.password, (err, isMatch) => {
            //     if(err) throw err;
            //     if(isMatch) {
            //         return done(null, user)
            //     } else {
            //         return done(null, false)
            //     }
            // });
            // })
            // .catch(err => console.log(err))
        //}
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