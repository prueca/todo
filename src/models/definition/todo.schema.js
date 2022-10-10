import { DataTypes } from 'sequelize'

const definition = {
  opt: {
    engine: 'InnoDB',
    tableName: 'Todo',
    timestamps: false
  },
  attr: {
    todoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    todo: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }
}

export default definition