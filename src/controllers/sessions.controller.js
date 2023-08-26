const { userModel } = require("../Daos/mongo/models/users.model");
const { createHash, checkValidPassword } = require("../utils/bcryptPass");
const { generateToken } = require("../utils/jsonwebtoken");
const { logger } = require("../utils/logger");

class SessionController {

    renderLoginPage = (req, res) => {
        try {
            const mensaje = req.query.mensaje;
            res.render('login', { mensaje });
        } catch (error) {
            logger.error(error);
        }
    };

    loginSession = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) {
                const mensajeError = 'Revisar usuario y contraseña';
                return res.render('login', { mensajeError });
            }
            const isPasswordValid = checkValidPassword({ password, hashedPassword: user.password });
            if (!isPasswordValid) {
                const mensajeError = 'Revisar usuario y contraseña';
                return res.render('login', { mensajeError });
            }
            const accessToken = generateToken(user);
            req.session.user = user;
            res.redirect('/');
        } catch (error) {
            logger.error(error);
        }
    };
    
    getSession = (req, res) => {
        try {
            res.send({
                status: 'success',
                payload: req.user
            });
        } catch (error) {
            logger.error(error);
        }
    };

    renderRegisterPage = (req, res) => {
        try {
            res.render('register', { title: 'Registrarse' });
        } catch (error) {
            logger.error(error);
        }
    };

    registerSession = async (req, res) => {
        try {
            const { first_name, last_name, email, username, password } = req.body;
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                const mensajeError = 'Usuario existente';
                return res.render('register', { mensajeError });
            }
            const hashedPassword = createHash(password);
            const newUser = new userModel({
                first_name,
                last_name,
                email,
                username,
                password: hashedPassword
            });
            await newUser.save();
            const accessToken = generateToken(newUser);
            const mensaje = `¡Usuario creado exitosamente!`;
            const queryString = `?mensaje=${encodeURIComponent(mensaje)}`;
            res.redirect(`/session${queryString}`);
        } catch (error) {
            logger.error(error);
        }
    };

    authenticateGithubCallback = (req, res) => {
        try {
            req.session.user = req.user;
            res.redirect('/');
        } catch (error) {
            logger.error(error);
        }
    };

    failRegister = (req, res) => {
        try {
            res.send({ status: 'error', message: 'Error al crear el usuario'});
        } catch (error) {
            logger.error(error);
        }
    };

    updatePassword = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) return res.status(401).send({ status: 'error', message: 'Usuario inexistente'});
            user.password = createHash(password);
            await user.save();
            res.send({status: 'success', message: 'Contraseña actualizada'});
        } catch (error) {
            logger.error(error);
        }
    };

    logoutSession = (req, res) => {
        try {
            req.session.destroy(error => {
                if(error) return res.send({status: 'Error al cerrar sesión', message: error})
                res.render('login', { title: 'Iniciar sesión' });
            });
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = SessionController;