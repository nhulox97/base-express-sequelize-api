const { sequelize, DataTypes } = require('../index');

const Role = sequelize.define(
    'roles',
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        role_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            len: [3, 20],
            notEmpty: {
                msg: 'Role name should not be empty'
            }
        },
        role_desc: {
            type: DataTypes.STRING(200),
            allowNull: false,
            min: 5,
            notEmpty: {
                msg: 'Role description should not be empty'
            }
        },
        role_code: {
            type: DataTypes.STRING(5),
            defaultValue: 'cod'
        },
        role_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'role_created_at',
        updatedAt: 'role_updated_at'
    }
);

/* Role.beforeUpdate('onRoleUpdate', (role, options) => {
    const updatedDate = Date.now();
    role.role_updated_at = updatedDate;
});*/

Role.afterCreate((role, _) => {
    const id = role.role_id;
    const abvRole = role.role_name.substring(0, 3);
    role.role_code = `${id}${abvRole}`;
});

module.exports = Role;
