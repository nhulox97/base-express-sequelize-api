const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.REMOTE_DB_NAME || process.env.LOCAL_DB_NAME,
    process.env.REMOTE_DB_USER || process.env.LOCAL_DB_USER,
    process.env.REMOTE_DB_PASS || process.env.LOCAL_DB_PASS,
    {
        host: process.env.REMOTE_DB_HOST || process.env.LOCAL_DB_HOST,
        dialect: 'mysql'
    }
);

/*const sequelize = new Sequelize(
    process.env.LOCAL_DB_NAME,
    process.env.LOCAL_DB_USER,
    process.env.LOCAL_DB_PASS, 
    {
        host: process.env.LOCAL_DB_HOST,
        dialect: 'mysql'
    }
);*/

module.exports = { sequelize, DataTypes };
