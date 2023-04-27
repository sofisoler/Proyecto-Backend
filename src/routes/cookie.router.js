const { Router } = require('express')

const cookieRouter = Router()

cookieRouter.get('/set', (req, res)=> {
    res.cookie('ProjectCookie', 'Valor de la Cookie', {maxAge: 10000000}).send('Cookie seteada')
})

cookieRouter.get('/', (req,res)=>{
    res.render('login', {})
})

cookieRouter.get('/get', (req, res)=>{
    res.send(req.cookies)
})

cookieRouter.post('/setSigned', (req, res)=>{
    const { username, password } = req.body
    res.cookie('username', username, { maxAge: 10000000, signed: true}).send({message: 'Cookie seteada'})
})

cookieRouter.get('/getSigned', (req, res)=>{
    res.send(req.signedCookies)
})

cookieRouter.get('/delete', (req, res)=>{
    res.clearCookie('CoderCookie').send('Cookie removed')
})

module.exports = cookieRouter