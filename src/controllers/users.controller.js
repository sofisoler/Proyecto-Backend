const { userService } = require("../service");
const { CustomError } = require("../utils/errors/CustomError");
const { EErrors } = require("../utils/errors/enums");
const { generateUserErrorInfo } = require("../utils/errors/info");
const { logger } = require("../utils/logger");

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
            } = await userService.getItems({page, limit})
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
            logger.error(error);
        }
    };

    getUser = (req, res) => {
        try {
            const {id} = req.params
            res.status(200).send(id)
        } catch (error) {
            logger.error(error);
        }
    };

    createUser = async (req, res, next) => {
        try {
            let { first_name, last_name, email } = req.body
            if (!first_name || !last_name || !email) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({ first_name, last_name, email }),
                    message: "Error trying to create user",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            }
            let addedUser = await users.push({first_name, last_name, email});
            res.status(201).send({
                users,
                addedUser,
                message: 'Usuario creado'
            });
        } catch (error) {
            next(error);
        }
    };

    updateUser =  async (req, res) => {
        try {
            const { uid } = req.params
            let userToReplace = req.body
            if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
                return res.status(400).send({ message: 'Completar todos los campos'})
            }
            let result = await userService.updateItem(uid, userToReplace)
            res.status(201).send({ 
                users: result,
                message: 'Usuario modificado' 
            })
        } catch (error) {
            logger.error(error);
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            let result = await userService.deleteItem(uid)
            res.status(200).send({ message:"Usuario borrado", result })
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = UserController