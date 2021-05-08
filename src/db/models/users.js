const { useHash } = require('../../hooks/useHash');
const { sequelize, DataTypes } = require('../index');

const User = sequelize.define(
    'users',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            len: [3, 50],
            notEmpty: {
                msg: 'User name should not be empty'
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_username: {
            type: DataTypes.STRING(25),
            len: [4, 25],
            notEmpty: {
                msg: 'User username should not be empty'
            }
        },
        user_role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'user_created_at',
        updatedAt: 'user_updated_at'
    }
);

User.beforeCreate(async (user, _) => {
    const [hashedPassword] = await useHash(user.user_password);
    user.user_password = hashedPassword;
});

User.afterCreate((user, _) => {
    const username = user.user_name.substring(0, 3) + user.user_id;
    user.user_username = username;

    return user.update({
        user_username: username
    });
});

module.exports = User;
