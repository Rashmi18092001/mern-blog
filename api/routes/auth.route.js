import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();

// post - user is giving information
router.post('/signup', signup);
router.post('/signin', signin)

export default router;