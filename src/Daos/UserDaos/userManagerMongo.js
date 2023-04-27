const { userModel } = require("../../models/users.model")

class UserManagerMongo {
    getUsers = async ({ page, limit, query='' }) =>  {
        const resp = await userModel.paginate({}, {limit, page, lean:true})
        return resp
    }
    
    addUser = async (newItem) => {
        return await userModel.create(newItem) 
    }

    updateUser = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    deletUser = async (uid) => {
        return await userModel.deleteOne({_id: uid})
    }
}

module.exports = { UserManagerMongo }