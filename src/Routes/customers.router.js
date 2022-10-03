import express from "express";
import { getCustomerIdController, getCustomersController, insertCustomersController, updateCustomersController } from "../Controller/customers.controller.js";
import { insertCustomersMiddleware, updateCustomersMiddleware } from "../Middleware/customers.middleware.js";
const router = express.Router();

router.get('/customers', getCustomersController);
router.get('/customers/:id', getCustomerIdController);
router.post('/customers', insertCustomersMiddleware, insertCustomersController);
router.put('/customers/:id', updateCustomersMiddleware, updateCustomersController);

export default router; 