const generateUserErrorInfo = (user) => {

    return `One or more properties were incomplete or not valid. 
    List of required properties:
    * last_name: needs to be a String, received ${user.last_name}
    * email: needs to be a String, received ${user.email}
    * username: needs to be a String, received ${user.username}`;
};

module.exports = { generateUserErrorInfo };