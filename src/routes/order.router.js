const { Router } = require('express');
const { OrderController } = require('../controllers/orders.controller');

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/', orderController.getOrders);

orderRouter.get('/:oid', orderController.getOrder);

orderRouter.post('/', orderController.createOrder);

orderRouter.put('/:oid', orderController.updateOrder);

orderRouter.delete('/:oid', orderController.deleteOrder);

module.exports = orderRouter