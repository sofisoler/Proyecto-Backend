class ChatController {

    renderChatPage = (req, res) => {
        try {
            res.render('chat', {});
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = ChatController