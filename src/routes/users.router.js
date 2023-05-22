const { Router } = require('express');
const UserController = require('../controllers/users.controller');
const { authSession } = require("../middleware/auth.middleware");

const userRouter = Router();

const { getUsers, getUser, createUser, updateUser, deleteUser } = new UserController();

userRouter.get('/', authSession, getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:uid', updateUser);

userRouter.delete('/:uid', deleteUser);

module.exports = userRouter