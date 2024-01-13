import express from 'express'
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js'
import { checkRole, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', isAuthenticated, newTask)

router.get('/my', isAuthenticated, getMyTask)

router
    .route('/:id')
    .put(isAuthenticated, checkRole('user', 'admin'), updateTask)
    .delete(isAuthenticated, checkRole('user', 'admin'), deleteTask)

export default router
