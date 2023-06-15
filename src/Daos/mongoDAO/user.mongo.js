const { userModel } = require("../mongo/models/users.model");

class UserManagerMongo {

    get = async ({ page, limit, query='' }) =>  {
        const resp = await userModel.paginate({}, {limit, page, lean:true})
        return resp
    };
    
    create = async (newUser) => {
        return await userModel.create(newUser) 
    };

    update = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    };

    delete = async (uid) => {
        return await userModel.deleteOne({_id: uid})
    };
};

module.exports = UserManagerMongo