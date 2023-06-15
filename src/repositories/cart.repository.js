const RepositoryGeneric = require("./RepositoryGeneric")

class CartRepository extends RepositoryGeneric {

    constructor(dao) {
        super(dao)
    };
};

module.exports = CartRepository