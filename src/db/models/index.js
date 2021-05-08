const RecordStatus = require('./recordsStatus');
const Role = require('./roles');
const User = require('./users');
const Log = require('./logs');

///////////////////////////////////////RecordStatus associations
// RecordStatus Role association
RecordStatus.hasMany(Role, {
    foreignKey: {
        name: 'role_status'
    }
});
// RecordStatus User association
RecordStatus.hasMany(User, {
    foreignKey: {
        name: 'user_status'
    }
});

///////////////////////////////////////Roles associations
// Role User association
Role.hasMany(User, {
    foreignKey: {
        name: 'user_role'
    }
});
// Role RecordStatus association
Role.belongsTo(RecordStatus, {
    foreignKey: {
        name: 'role_status'
    }
});

//////////////////////////////////////Users associations
// User Role Associations
User.belongsTo(Role, {
    foreignKey: {
        name: 'user_role'
    }
});
// User Log association
User.hasMany(Log, {
    foreignKey: {
        name: 'log_user'
    }
});
// User RecordStatus association
User.belongsTo(RecordStatus, {
    foreignKey: {
        name: 'user_status'
    }
});

//////////////////////////////////////Logs associations
//Logs User association
Log.belongsTo(User, {
    foreignKey: {
        name: 'log_user'
    }
});

/**
 * Contains all Models used on the schema
 */
module.exports = {
    RecordStatus,
    Role,
    User,
    Log
};
