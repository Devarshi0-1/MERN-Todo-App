import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';
import {
	deleteUser,
	getUserTasks,
	getAllUsers,
	getAllTasks,
} from '../controllers/admin.js';

const router = express.Router();

router.delete('/delete/:id', isAuthenticated, isAdmin, deleteUser);

router.get('/user/:id', isAuthenticated, isAdmin, getUserTasks);

router.get('/getAllUsers', isAuthenticated, isAdmin, getAllUsers);

router.get('/getAllTasks/:id', isAuthenticated, isAdmin, getAllTasks);

export default router;
