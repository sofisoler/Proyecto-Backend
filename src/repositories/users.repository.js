const RepositoryGeneric = require("./RepositoryGeneric")

class UserRepository extends RepositoryGeneric {

    constructor(dao) {
        super(dao)
    };
};

module.exports = UserRepository