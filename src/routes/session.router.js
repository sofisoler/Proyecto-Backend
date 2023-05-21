const { Router } =require('express')
const passport = require('passport')
const { userModel } = require('../models/users.model')
const { createHash } = require('../utils/bcryptPass')
const { generateToken, authToken } = require('../utils/jsonwebtoken')

const sessionRouter = Router()

const users = []

sessionRouter.get('/', (req,res)=>{
    res.render('login', {})
})

sessionRouter.post('/login', async (req, res)=> {
    const { email, password } = req.body
    const user = users.find((user) => user.email === email && user.password === password)
    if (!user) return res.status(400).send({ status: 'error', message: 'Revisar usuario y contraseña' })
    const accessToken = generateToken(user)
    res.send({
        status: 'success',
        payload: accessToken
    })
})

sessionRouter.get('/current', authToken, (req, res) => {
    res.send({
        status: 'success',
        payload: req.user
    })
})

sessionRouter.get('/register', (req, res)=>{
    res.render('register')
})

sessionRouter.post('/register', async (req,res)=> {
    const { name, email, password } = req.body
    const userExist = users.find((user) => user.email === email)
    if (userExist) return res.status(400).send({ status: 'error', message: 'Usuario existente' })
    const newUser = {
        name,
        email,
        password
    }
    users.push()
    const accessToken = generateToken(newUser)
    res.send({
        status: 'success',
        message: 'Usuario creado',
        accessToken
    })
})

sessionRouter.get('/github', passport.authenticate('github'));

sessionRouter.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/session/failregister' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api/products')
    }
)

sessionRouter.get('/failregister', (req, res) => {
    res.send({ status: 'error', message: 'Error al crear el usuario'})
})

sessionRouter.put('/recoverypass'), async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send({ status: 'error', message: 'Usuario inexistente'});
    user.password = createHash(password);
    await user.save();
    res.send({status: 'success', message: 'Contraseña actualizada'});
}

sessionRouter.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Error al cerrar sesión', message: err})
        res.render('login')
    })
})

module.exports = sessionRouter