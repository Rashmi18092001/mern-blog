import express from 'express';
import { test } from '../controllers/user.controller.js';

// routers are a way to organize routes in separate modules or files
const router = express.Router();

// creating test API

//  res.json() is used to send a JSON response back to the client
router.get('/test', test)

export default router;