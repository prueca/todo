import path from 'path'
import { Router } from 'express'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import TodoController from '../controllers/TodoController'
import response from '../middlewares/response'
import auth from '../middlewares/auth'

const router = Router()
const controller = new TodoController()

router.use('/api', response)
router.get('/api/todo/page', auth, controller.paginate.bind(controller))
router.get('/api/todo', auth, controller.getAll.bind(controller))
router.get('/api/todo/:id', auth, controller.getItem.bind(controller))
router.post('/api/todo', auth, controller.addTodo.bind(controller))
router.put('/api/todo/:id', auth, controller.updateTodo.bind(controller))
router.delete('/api/todo/:id', auth, controller.removeTodo.bind(controller))
router.delete('/api/todo', auth, controller.reset.bind(controller))

const yml = path.join(__dirname, '../../api_docs.yml')
const docs = YAML.load(yml)

router.use('/api/docs', swaggerUi.serve)
router.get('/api/docs', swaggerUi.setup(docs))

export default router