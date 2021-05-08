const { sequelize, DataTypes } = require('../index');

const Todo = sequelize.define(
    'todo',
    {
        todo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        todo_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        todo_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'todo_created_at',
        updatedAt: 'todo_updated_at'
    }
);

module.exports = Todo;
