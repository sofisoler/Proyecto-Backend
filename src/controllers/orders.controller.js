const { orderService } = require("../service");

class OrderController {

    async getOrders(req, res) {
        try {
            let orders = await orderService.getItems({});
            res.status(200).send({
                status: 'success', 
                payload: orders
            });
        } catch (error) {
            console.log(error);
        }
    };

    async getOrder(req, res) {
        try {
            const { oid } = req.params;
            const order = await orderService.getItemById(oid);
            res.status(200).send({
                status: 'success', 
                payload: order
            });
        } catch (error) {
            console.log(error);
        }
    };

    async createOrder(req, res) {
        try {
            const { body } = req;
            const result = await orderService.createItem(body);
            res.status(200).send({
                status: 'success', 
                message: 'Order created'
            });
        } catch (error) {
            console.log(error);
        }
    };

    async updateOrder(req, res) {
        try {
            const { oid } = req.params;
            const { body } = req;
            const result = await orderService.updateItem(oid, body);
            res.status(200).send({
                status: 'success', 
                message: 'Order updated'
            });
        } catch (error) {
            console.log(error);
        }
    };

    async deleteOrder(req, res) {
        try {
            const { oid } = req.params;
            const result = await orderService.deleteItem(oid);
            res.status(200).send({
                status: 'success', 
                message: 'Order deleted'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = {
    OrderController
};