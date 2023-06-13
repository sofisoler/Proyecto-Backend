const { UserDto } = require("../dto/user.dto");
const { userService } = require("../service");

class UserController {

    getUsers = async (req, res) => {
        try {
            const login = req.session.user;
            const { page=1, limit=3 } = req.query
            const { docs, 
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            } = await userService.getUsers({page, limit})
            if (!docs) {
                return res.status(400).send('No hay usuarios')            
            }
            res.status(200).render('user',{
                user: login,
                users: docs,
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage
            })
        } catch (error) {
            console.log(error);
        }
    };

    getUser = (req, res) => {
        try {
            const {id} = req.params
            res.status(200).send(id)
        } catch (error) {
            console.log(error);
        }
    };

    createUser = async (req, res) => {
        try {
            let { first_name, last_name } = req.body
            if (!first_name || !last_name) {
                return res.status(400).send({ message: 'Completar todos los campos'})
            }
            const newUser = new UserDto ({
                first_name,
                last_name
            })
            let addedUser = await userService.addUser(newUser)
            res.status(201).send({ 
                addedUser,
                message: 'Usuario creado' 
            })
        } catch (error) {
            console.log(error);
        }
    };

    updateUser =  async (req, res) => {
        try {
            const { uid } = req.params
            let userToReplace = req.body
            if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
                return res.status(400).send({ message: 'Completar todos los campos'})
            }
            let result = await userService.updateUser(uid, userToReplace)
            res.status(201).send({ 
                users: result,
                message: 'Usuario modificado' 
            })
        } catch (error) {
            console.log(error);
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            let result = await userService.deleteUser(uid)
            res.status(200).send({ message:"Usuario borrado", result })
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = UserController