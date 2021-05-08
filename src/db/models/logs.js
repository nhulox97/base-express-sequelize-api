const { sequelize, DataTypes } = require('../index');

const Log = sequelize.define(
    'logs',
    {
        log_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false
        },
        log_desc: {
            type: DataTypes.STRING(250),
            allowNull: false,
            len: [3, 250],
            notEmpty: {
                msg: 'Log description should not be empty'
            }
        },
        log_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'log_created_at',
        updatedAt: 'log_updated_at'
    }
);

module.exports = Log;
