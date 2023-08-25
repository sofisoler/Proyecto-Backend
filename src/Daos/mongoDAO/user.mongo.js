const { userModel } = require("../mongo/models/users.model");

class UserManagerMongo {

    // Obtener todos los usuarios
    get = async ({ page, limit, query = '' }) => {
        return await userModel.paginate({}, { limit, page, lean: true });
    };

    // Obtener un usuario por su ID
    getById = async (uid) => {
        return await userModel.findById({ _id: uid });
    };

    // Crear un nuevo usuario
    create = async (newUser) => {
        return await userModel.create(newUser);
    };

    // Actualizar un usuario por su ID
    update = async (uid, userToReplace) => {
        return await userModel.updateOne({ _id: uid }, userToReplace);
    };

    // Eliminar un usuario por su ID
    delete = async (uid) => {
        return await userModel.deleteOne({ _id: uid });
    };
}

module.exports = UserManagerMongo;