import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import models from '../models'
import decode from '../utils/decode'
import encode from '../utils/encode'

export default class TodoController {
  /**
   * Create controller instance
   */
  constructor() {
    this.todo = models.Todo
  }

  /**
   * Create todo item
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @returns void
   */
  async addTodo(req, res) {
    try {
      const { todo: newTodo } =  req.body

      if (!newTodo) return res.error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

      const todo = await this.todo.create({ todo: newTodo })

      return res.data({
        todo: {
          ...todo.toJSON(),
          todoId: encode(todo.todoId)
        }
      })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Get all todo items
   *
   * @param {Request} _req 
   * @param {Response} res 
   * 
   * @return void
   */
  async getAll(_req, res) {
    try {
      const todos = await this.todo.findAll()
        .then(result => {
          const transformed = result.map(item => ({
            ...item.toJSON(),
            todoId: encode(item.todoId)
          }))

          return transformed
        })

      return res.data({ todos })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Get todo item by ID
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @returns void
   */
  async getItem(req, res) {
    try {
      const { id } = req.params
      const decoded = decode(id)
      const todo = await this.todo.findByPk(decoded)

      if (!todo) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      
      return res.data({
        todo: {
          ...todo.toJSON(),
          todoId: encode(todo.todoId)
        }
      })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Update todo item
   * 
   * @param {Request} req
   * @param {Response} res
   *
   * @returns void
   */
  async updateTodo(req, res) {
    try {
      const { id } = req.params
      const decoded = decode(id)
      const item = await this.todo.findByPk(decoded)

      if (!item) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)

      const { todo: newText, done } = req.body

      item.todo = newText
      item.done = done
      await item.save()

      return res.data({
        todo: {
          ...item.toJSON(),
          todoId: encode(item.todoId)
        }
      })
    } catch (error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Delete todo item
   *
   * @param {Request} req 
   * @param {Response} res
   *
   * @returns void
   */
  async removeTodo(req, res) {
    try {
      const { id } = req.params
      const decoded = decode(id)
      const item = await this.todo.findByPk(decoded)
      
      if (!item) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      
      await item.destroy()
      return res.data({ success: true })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Get todo items based on page and limit
   *
   * @param {Request} req 
   * @param {Response} res 
   * 
   * @returns void
   */
  async paginate(req, res) {
    try {
      const { page, limit } = req.query

      if (!page || !limit) {
        return res.error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
      }

      const { count, rows } = await this.todo.findAndCountAll({
        offset: Number((page - 1) * limit),
        limit: Number(limit),
      })

      const transformed = rows.map(item => ({
        ...item.toJSON(),
        todoId: encode(item.todoId)
      }))

      return res.data({
        todos: transformed,
        count
      })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Reset Todo table
   * 
   * @param {Request} _req 
   * @param {Response} res 
   * 
   * @returns void
   */
  async reset(_req, res) {
    try {
      await this.todo.sync({ force: true })
      res.data({ success: true })
    } catch(error) {
      return res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
}
