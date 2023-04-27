const { Router } =require('express')
const { userModel } = require('../models/users.model')

const sessionRouter = Router()

sessionRouter.get('/', (req,res)=>{
    res.render('login', {})
})

sessionRouter.post('/login', async (req, res)=> {
    const {username, password} = req.body
    const user = await userModel.findOne({username})
    if (!user) {
        return res.send({status: 'error', message: 'Password o username incorrecto'})
    }
    req.session.user = {
        username: user.username,
        email: user.email,
        admin: true
    }
    res.redirect(`/api/products?mensaje=¡Bienvenid@ ${username}!`);
})

sessionRouter.get('/register', (req, res)=>{
    res.render('register')
})

sessionRouter.post('/register', async (req,res)=> {
    try {
        const {username, first_name, last_name, email, password} = req.body
        const exists = await userModel.findOne({email})
        if(exists) return res.send({status: 'error', message: 'Usuario existente'})
        const newUser = {
            username,
            first_name,
            last_name,
            email,
            password
        }
        await userModel.create(newUser)
        res.status(200).render('login')
    } catch (error) {
        console.log(error)
    }
})

// sessionRouter.get('/', (req, res)=>{
//     if (req.session.counter) {
//         req.session.counter++
//         res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)        
//     } else {
//         req.session.counter = 1
//         res.send('¡Bienvenid@!')
//     }
// })

sessionRouter.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Error al cerrar sesión', message: err})
        res.render('login')
    })
})

module.exports = sessionRouter