const { Router } = require("express");
const { OrderController } = require("../controllers/orders.controller");

const orderRouter = Router();

const { getUserOrders, getOrders, getOrder, createOrder, updateOrder, deleteOrder } = new OrderController();

orderRouter.get('/:uid', getUserOrders);

orderRouter.get('/orders', getOrders);

orderRouter.get('/:oid', getOrder);

orderRouter.post('/', createOrder);

orderRouter.put('/:oid', updateOrder);

orderRouter.delete('/:oid', deleteOrder);

module.exports = orderRouter;