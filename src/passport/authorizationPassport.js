const authorization = (req, res, next) => {
    if (req.session?.user?.username !== 'sofisoler' && !req.session?.user?.admin) {
        return res.status(401).send('Error de autenticación');
    }
    next();
};

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/session');
    }
};

const checkPremiumUser = (req, res, next) => {
    if (req.session?.user?.isPremium) {
        next();
    } else {
        return res.status(403).send('Acceso no autorizado para usuarios no premium');
    }
};

module.exports = {
    authorization,
    ensureAuthenticated,
    checkPremiumUser
};