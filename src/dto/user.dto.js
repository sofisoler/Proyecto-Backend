class UserDto {

    constructor(user) {
        this.full_name = user.full_name;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.username = user.username;
        this.documents = user.documents;
        this.last_connection = user.last_connection;
    };
};

module.exports = { UserDto };