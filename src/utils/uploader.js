const multer = require('multer');
const { dirname } = require('path');
const { logger } = require('./logger');

const getDestination = (req, file, cb) => {
    const { type } = req.body;
    let destinationFolder = 'documents';
    if (type === 'profile') {
        destinationFolder = 'profiles';
    } else if (type === 'product') {
        destinationFolder = 'products';
    }
    cb(null, `${dirname(__dirname)}/public/uploads/${destinationFolder}`);
};

const storage = multer.diskStorage ({
    destination: getDestination,
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploader = multer ({
    storage,
    onError: (err, next) => {
        logger.info(err)
        next()
    }
});

module.exports = { uploader };