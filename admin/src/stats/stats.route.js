import express from 'express';
import { getAdminStats } from './stats.controller.js';
import verifyToken from '../Middleware/VerifyToken.js';

const routesDashboard = express.Router();


// Function to calculate admin stats
routesDashboard.get("/", verifyToken, getAdminStats)

export default routesDashboard;