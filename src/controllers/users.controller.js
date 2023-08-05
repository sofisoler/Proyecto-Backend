const { userService } = require("../service");
const { CustomError } = require("../utils/errors/CustomError");
const { EErrors } = require("../utils/errors/enums");
const { generateUserErrorInfo } = require("../utils/errors/info");
const { logger } = require("../utils/logger");
const { uploader } = require("../utils/uploader");

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
            let addedUser = await userService.createItem({first_name, last_name, email})
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

    uploadUserDocuments = async (req, res, next) => {
        try {
            const { uid } = req.params;
            uploader.array('documents')(req, res, async (error) => {
                if (error) {
                    logger.error(error);
                    return res.status(500).send({ message: 'Error al subir los archivos' });
                }
                const files = req.files;
                const documents = [];
                files.forEach((file) => {
                    const { originalname, path } = file;
                    const document = {
                        name: originalname,
                        reference: path
                    };
                    documents.push(document);
                });
                const user = await userService.getItemById(uid);
                if (!user) {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
                user.documents = documents;
                user.last_connection = new Date();
                await user.save();
                res.status(200).send({ message: 'Documentos subidos exitosamente', user });
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    getUserDocuments = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await userService.getItemById(uid);
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.status(200).send({ documents: user.documents });
        } catch (error) {
            logger.error(error);
            res.status(500).send({ message: 'Error al obtener los documentos del usuario' });
        }
    };

    showUploadDocumentsView = (req, res) => {
        const { uid } = req.params;
        res.render('upload', { userId: uid });
    };
};

module.exports = UserController