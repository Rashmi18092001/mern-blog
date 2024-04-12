import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// post - user is giving information
router.post('/signup', signup);

export default router;