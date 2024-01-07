import express from 'express';
import { getMyProfile, login, logout, register } from '../controllers/user';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.post('/new', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', isAuthenticated, getMyProfile);

export default router;
