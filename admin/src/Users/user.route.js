import express from 'express';
import { checkPermission } from './user.controller.js';
import verifyToken from '../Middleware/VerifyToken.js';
const routesUser = express.Router();

routesUser.post("/verify",  checkPermission);

export default routesUser;