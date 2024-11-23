import express from 'express';
import { createOrder, getOrderByEmail } from './order.controller.js';
const routesOrder = express.Router();

//handle create order
routesOrder.post("/create", createOrder);

//handle get order by email
routesOrder.get("/:email", getOrderByEmail);

export default routesOrder;
