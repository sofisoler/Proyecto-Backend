const { Router } =require('express')

const sessionRouter = Router()

sessionRouter.get('/', (req,res)=>{
    res.render('login', {})
})

sessionRouter.post('/login',(req, res)=> {
    const {username, password} = req.body
    if(username !== 'sofia' || password !== 'sofiaclave'){
        return res.status(401).send('Password o username incorrecto')
    }
    req.session.user  = username
    req.session.admin = true
    res.redirect(`/api/products?mensaje=¡Bienvenid@ ${username}!`);
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
        res.redirect('/session');
    })
})

module.exports = sessionRouter