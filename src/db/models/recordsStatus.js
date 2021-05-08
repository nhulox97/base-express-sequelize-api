const { sequelize, DataTypes } = require('../index');

const RecordStatus = sequelize.define(
    'records_status',
    {
        record_status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        record_status_name: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false,
            min: 4
        },
        record_status_abv: {
            type: DataTypes.STRING(4),
            unique: true,
            allowNull: false
        },
        record_status_desc: {
            type: DataTypes.STRING(200),
            allowNull: false,
            min: 5,
            notEmpty: {
                msg: 'RecordStatus description should not be empty'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'record_status_created_at',
        updatedAt: 'record_status_updated_at'
    }
);

module.exports = RecordStatus;
