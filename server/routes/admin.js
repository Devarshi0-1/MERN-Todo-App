import express from 'express'
import { deleteUser, getAllTasks, getAllUsers, getUserTasks } from '../controllers/admin.js'
import { checkRole } from '../middlewares/auth.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.delete('/delete/:id', isAuthenticated, checkRole('admin'), deleteUser)

router.get('/user/:id', isAuthenticated, checkRole('admin', 'testAdmin'), getUserTasks)

router.get('/getAllUsers', isAuthenticated, checkRole('admin', 'testAdmin'), getAllUsers)

router.get('/getAllTasks/:id', isAuthenticated, checkRole('admin', 'testAdmin'), getAllTasks)

export default router
