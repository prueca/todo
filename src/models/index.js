import Sequelize from 'sequelize'
import {
  CONNECT,
  DATABASE,
  USER,
  PASS,
  OPTIONS,
} from '../configs/db'
import schema from '../models/definition'
import Todo from './Todo'

const { todo: todoSchema } = schema

export const sequelize = CONNECT ? new Sequelize(
  DATABASE,
  USER,
  PASS,
  OPTIONS
) : null

const models = {
  Todo: Todo.init(sequelize, todoSchema)
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .map(model => model.associate(models))

export default models
