import 'dotenv/config'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { sequelize } from '../src/models'
import TodoController from '../src/controllers/TodoController'
import encode from '../src/utils/encode'

const controller = new TodoController()
let req = null, res = null

describe('Todo API', () => {
  beforeAll(() => {
    ({ res } = getMockRes())

    res.data = jest.fn(data => ({
      data: JSON.parse(JSON.stringify(data)),
      statusCode: 200
    }))

    res.error = jest.fn((statusCode, errorMessage) => ({
      statusCode,
      error: errorMessage,
    }))
  })

  afterAll(() => sequelize.close())

  test('CREATE - POST /api/todo', async () => {
    const todo = 'Todo 11'
    req = getMockReq({ body: { todo } })
    const result = await controller.addTodo(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.todo.todoId')
    expect(result).toHaveProperty('data.todo.todo', todo)
    expect(result).toHaveProperty('data.todo.done', false)
  })
  
  test('READ - GET /api/todo/:id', async () => {
    const id = encode(1)
    req = getMockReq({ params: { id } })
    const result = await controller.getItem(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.todo.todoId')
    expect(result).toHaveProperty('data.todo.todo')
    expect(result).toHaveProperty('data.todo.done')
  })

  test('READ ALL - GET /api/todo', async () => {
    req = getMockReq()
    const result = await controller.getAll(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.todos')
    expect(result.data.todos).toBeInstanceOf(Array)
  })

  test('UPDATE - PUT /api/todo/:id', async () => {
    const replacement = {
      todoId: encode(2),
      todo: 'Successfully updated',
      done: true
    }
    req = getMockReq({
      params: {
        id: replacement.todoId
      },
      body: {
        todo: replacement.todo,
        done: replacement.done
      }
    })
    const result = await controller.updateTodo(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.todo')
  })
  
  test('DELETE - DELETE /api/todo/:id', async () => {
    const id = encode(3)
    req = getMockReq({ params: { id } })
    const result = await controller.removeTodo(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.success', true)
  })

  test('PAGINATE - GET /api/todo/page', async () => {
    req = getMockReq({
      query: {
        page: 1,
        limit: 10
      }
    })
    const result = await controller.paginate(req, res)

    expect(result.statusCode).toBe(200)
    expect(result).toHaveProperty('data.count')
    expect(result).toHaveProperty('data.todos')
    expect(result.data.todos).toBeInstanceOf(Array)
  })
})