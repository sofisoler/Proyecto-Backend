const { EErrors } = require("../../utils/errors/enums");
const { logger } = require("../../utils/logger");

module.exports = (error, req, res, next) => {
    logger.error(error.cause)
    switch (error.cause) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: error.name})
            break;
    
        default:
            res.send({status: "error", error: "Unhandled error"})
            break;
    };
};