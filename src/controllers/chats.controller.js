const { logger } = require("../utils/logger");

class ChatController {

    renderChatPage = (req, res) => {
        try {
            res.render('chat', {});
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = ChatController