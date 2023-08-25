const { orderService } = require("../service");
const { logger } = require("../utils/logger");

class OrderController {

    getUserOrders = async (req, res) => {
        try {
            const { uid } = req.params;
            const userOrders = await orderService.getUserOrders(uid);
            res.render('userOrders', {
                title: 'Pedidos',
                mensaje: req.query.mensaje,
                mensajeError: req.query.mensajeError,
                user: req.session.user,
                userOrders: userOrders
            });
        } catch (error) {
            logger.error(error);
        }
    };

    getOrders = async (req, res) => {
        try {
            let orders = await orderService.getItems({});
            res.status(200).send({
                status: 'success', 
                payload: orders
            });
        } catch (error) {
            logger.error(error);
        }
    };

    getOrder = async (req, res) => {
        try {
            const { oid } = req.params;
            const order = await orderService.getItemById(oid);
            res.status(200).send({
                status: 'success', 
                payload: order
            });
        } catch (error) {
            logger.error(error);
        }
    };

    createOrder = async (req, res) => {
        try {
            const { user, products, total, created } = req.body;
            const newOrder = await orderService.createItem({ user, products, total, created });
            res.status(200).send({
                status: 'success', 
                message: 'Orden creada',
                newOrder
            });
        } catch (error) {
            logger.error(error);
        }
    };
    
    updateOrder = async (req, res) => {
        try {
            const { oid } = req.params;
            const { body } = req;
            await orderService.updateItem(oid, body);
            res.status(200).send({
                status: 'success', 
                message: 'Orden actualizada'
            });
        } catch (error) {
            logger.error(error);
        }
    };

    deleteOrder = async (req, res) => {
        try {
            const { oid } = req.params;
            await orderService.deleteOrder(oid);
            res.status(200).send({
                status: 'success', 
                message: 'Orden eliminada'
            });
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = {
    OrderController
};