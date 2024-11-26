import mongoose from 'mongoose';
import express from 'express';
import { getAdminStats } from './stats.controller.js';

const router = express.Router();


// Function to calculate admin stats
router.get("/", getAdminStats)

export default router;