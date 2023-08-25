const { Router } = require("express");
const ChatController = require("../controllers/chats.controller");

const chatRouter = Router();

const { renderChatPage } = new ChatController();

chatRouter.get('/', renderChatPage);

module.exports = chatRouter;