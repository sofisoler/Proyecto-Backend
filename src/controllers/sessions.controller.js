const { userModel } = require("../models/users.model");
const { createHash } = require("../utils/bcryptPass");
const { generateToken } = require("../utils/jsonwebtoken");

class SessionController {

    renderLoginPage = (req,res) => {
        try {
            res.render('login', {});
        } catch (error) {
            console.log(error);
        }
    };

    loginSession = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username, password });
            if (!user) return res.status(400).send({ status: 'error', message: 'Revisar usuario y contraseña' });
            const accessToken = generateToken(user);
            res.send({
                status: 'success',
                payload: accessToken
            });
        } catch (error) {
            console.log(error);
        }
    };

    getSession = (req, res) => {
        try {
            res.send({
                status: 'success',
                payload: req.user
            });
        } catch (error) {
            console.log(error);
        }
    };

    renderRegisterPage = (req, res) => {
        try {
            res.render('register');
        } catch (error) {
            console.log(error);
        }
    };

    registerSession = async (req, res) => {
        try {
            const { first_name, last_name, email, username, password } = req.body;
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                return res.status(400).send({ status: 'error', message: 'Usuario existente' });
            }
            const newUser = new userModel({
                first_name,
                last_name,
                email,
                username,
                password
            });
            await newUser.save();
            const accessToken = generateToken(newUser);
            res.send({
                status: 'success',
                message: 'Usuario creado',
                accessToken
            });
        } catch (error) {
            console.log(error);
        }
    };

    authenticateGithubCallback = (req, res) => {
        try {
            req.session.user = req.user;
            res.redirect('/api/products');
        } catch (error) {
            console.log(error);
        }
    };

    failRegister = (req, res) => {
        try {
            res.send({ status: 'error', message: 'Error al crear el usuario'});
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };

    logoutSession = (req,res) => {
        try {
            req.session.destroy(error => {
                if(error) return res.send({status: 'Error al cerrar sesión', message: error})
                res.render('login');
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = SessionController