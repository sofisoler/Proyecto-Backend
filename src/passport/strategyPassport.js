const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2');
const { userModel } = require('../Daos/mongo/models/users.model');
const { createHash, checkValidPassword } = require('../utils/bcryptPass');

const initializePassport = () => {

    // Estrategia de registro local
    passport.use(
        'register',
        new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, email, password, done) => {
            try {
                const { first_name, last_name, username } = req.body;
                const user = await userModel.findOne({ email });
                if (user) {
                    done(null, false, { message: 'Usuario existente' });
                }
                const hashedPassword = createHash(password);
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    username,
                    password: hashedPassword
                };
                const result = await userModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        })
    );

    // Estrategia de inicio de sesión local
    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    return done(null, false);
                }
                const isValidPassword = checkValidPassword({
                    hashedPassword: user.password,
                    password
                });
                if (!isValidPassword) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    // Estrategia de autenticación de GitHub
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
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );

    // Serialización de usuario para sesiones
    passport.serializeUser((user, done) => {
        try {
            return done(null, user._id);
        } catch (error) {
            return done(error);
        }
    });

    // Deserialización de usuario para sesiones
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};

module.exports = {
    initializePassport
};