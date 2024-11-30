import express from 'express';
import { createOrder, getOrderByEmail, getAllOrders, deleteOrder, getOrderById, updateOrder } from './order.controller.js';
const routesOrder = express.Router();

//handle create order
routesOrder.post("/create", createOrder);

//handle get order by email
routesOrder.get("/:email", getOrderByEmail);

//handle get all orders
routesOrder.get("/getall/showOrders", getAllOrders);

//handle delete order
routesOrder.delete("/delete/:id", deleteOrder);

//handle get order by id
routesOrder.get("/get/:id", getOrderById);

//handle update order
routesOrder.put("/update/:id", updateOrder);    

export default routesOrder;
