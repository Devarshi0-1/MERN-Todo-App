import express from 'express'
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js'
import { checkRole } from '../middlewares/auth.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', isAuthenticated, newTask)

router.get('/my', isAuthenticated, getMyTask)

router
    .route('/:id')
    .put(isAuthenticated, checkRole('visitor', 'admin', 'testAdmin'), updateTask)
    .delete(isAuthenticated, checkRole('visitor', 'admin', 'testAdmin'), deleteTask)

export default router
