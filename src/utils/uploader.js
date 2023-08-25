const multer = require('multer');
const { dirname } = require('path');
const { logger } = require('./logger');

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        const { type } = req.body;
        let destinationFolder = 'documents';
        if (type === 'thumbnail') {
            destinationFolder = 'thumbnails';
        }
        cb(null, `${dirname(__dirname)}/public/uploads/${destinationFolder}`);
    },
    filename: function(req, file, cb) {
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