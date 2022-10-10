import { Router } from 'express'
import TodoController from '../controllers/TodoController'
import response from '../middlewares/response'

const router = Router()
const controller = new TodoController()

router.use('/api', response)
router.get('/api/todo/page', controller.paginate.bind(controller))
router.get('/api/todo', controller.getAll.bind(controller))
router.get('/api/todo/:id', controller.getItem.bind(controller))
router.post('/api/todo', controller.addTodo.bind(controller))
router.put('/api/todo/:id', controller.updateTodo.bind(controller))
router.delete('/api/todo/:id', controller.removeTodo.bind(controller))

export default router