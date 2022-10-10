import { Router } from 'express'
import TodoController from '../controllers/TodoController'

const router = Router()
const controller = new TodoController()

router.get('/', controller.getAll.bind(controller))

export default router