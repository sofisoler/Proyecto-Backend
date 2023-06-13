const RepositoryGeneric = require("./RepositoryGeneric")

class OrderRepository extends RepositoryGeneric {

    constructor(dao) {
        super(dao)
    };
};

module.exports = OrderRepository