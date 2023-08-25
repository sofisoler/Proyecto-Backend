const RepositoryGeneric = require("./RepositoryGeneric");

class ProductRepository extends RepositoryGeneric {

    constructor(dao) {
        super(dao)
    };
};

module.exports = ProductRepository;