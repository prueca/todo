import { Model } from 'sequelize'

export default class BaseModel extends Model {
  /**
   * Initialize a model,
   * representing a table in the DB,
   * with attributes and options.
   *
   * @param {Object} conn
   * @param {Object} schema
   */
  static init(conn, schema) {
    return super.init(schema.attr, { ...schema.opt, sequelize: conn })
  }
}