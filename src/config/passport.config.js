const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userModel } = require("../models/users.model");
const { createHash, checkValidPassword } = require('../utils/bcryptPass');
const GitHubStrategy = require('passport-github2')

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (email, password, done) => {
            const { first_name, last_name, username } = req.body;
            const user = await userModel.findOne({ email });
            if (user) {
                done(null, false, { message: 'Usuario existente'})
            }
            const hashedPassword = createHash(password);
            const newUser = {
                first_name,
                last_name,
                email,
                username,
                password: hashedPassword
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        })
    )
    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email })
                if (!user) {
                    return done(null, false)
                }
                const isValidPassword = checkValidPassword({
                    hashedPassword: user.password,
                    password
                })
                if (!isValidPassword) {
                    done(null, false)
                }
            } catch (err) {
                return done(err)
            }
        })
    )
    passport.use(
        'github',
        new GitHubStrategy ({
            clientID: 'Iv1.12af29f7f44fb08f',
            clientSecret: 'ac490970aaa600f036eaa6e5a7a6588b4253773d',
            callbackURL: 'http://localhost:8080/session/githubcallback',
            scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile.emails[0].value });
                if (!user) {
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: profile._json.name,
                        username: profile.username,
                        email: profile.emails[0].value,
                    }
                    const result = await userModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
}

module.exports = {
    initializePassport
}