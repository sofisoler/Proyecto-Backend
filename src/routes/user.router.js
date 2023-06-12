const { Router } = require('express');
const UserController = require('../controllers/users.controller');
const { authorization } = require('../passport/authorizationPassport');

const userRouter = Router();

const { getUsers, getUser, createUser, updateUser, deleteUser } = new UserController();

userRouter.get('/', authorization, getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:uid', updateUser);

userRouter.delete('/:uid', deleteUser);

module.exports = userRouter