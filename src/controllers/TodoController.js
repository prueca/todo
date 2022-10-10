import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import models from '../models'

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
      const todo = await this.todo.create({ todo: newTodo })

      res.data({ todo })
    } catch(error) {
      res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
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
      res.data({ todos })
    } catch(error) {
      res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
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
      const todo = await this.todo.findByPk(id)

      if (!todo) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      
      res.data({ todo })
    } catch(error) {
      res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
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
      const item = await this.todo.findByPk(id)

      if (!item) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)

      const { todo: newText, done } = req.body

      item.todo = newText
      item.done = done
      await item.save()

      res.data({ todo: item })
    } catch (error) {
      res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
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
      const item = await this.todo.findByPk(id)
      
      if (!item) return res.error(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      
      await item.destroy()
      res.data({ success: true })
    } catch(error) {
      res.error(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
  }
}
