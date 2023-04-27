const authSession = (req, res, next)=> {
    if (req.session?.user?.username !== 'sofisoler' && !req.session?.user?.admin) {
        return res.status(401).send('Error de autenticación')        
    }
    next()
}

module.exports = {
    authSession
}