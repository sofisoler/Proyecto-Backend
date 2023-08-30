const { Router } = require("express");
const UserController = require("../controllers/users.controller");
const { authorization } = require("../passport/authorizationPassport");
const { uploader } = require("../utils/uploader");

const userRouter = Router();

const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserDocuments, getUserDocuments, showUploadDocumentsView, makeUserPremium } = new UserController();

userRouter.get('/', authorization, getUsers);

userRouter.get('/:uid', getUser);

userRouter.post('/', createUser);

userRouter.put('/:uid', updateUser);

userRouter.delete('/:uid', deleteUser);

userRouter.post('/:uid/documents', authorization, uploader.array('documents'), uploadUserDocuments);

userRouter.get('/:uid/documents', authorization, getUserDocuments);

userRouter.get('/:uid/documents/upload', authorization, showUploadDocumentsView);

userRouter.post('/:uid/premium', authorization, makeUserPremium);

module.exports = userRouter;