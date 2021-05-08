/**
 * This function handle all errors related with database errors
 * @param errors
 * @returns {Object}
 */
const handleSequelizeDatabaseError = (errors) => {
    const { code, errno, sqlMessage } = errors.original;
    // TODO: Write a switch to handle at least the basics sql errors
    return {
        code,
        errno,
        sqlMessage
    };
};

/**
 * This function handle all errors related with foreign key constraint errors
 * @param errors
 * @returns {Object}
 */
const handleSequelizeForeignKeyConstraintError = (errors) => {
    const { code, errno, sqlMessage } = errors.original;
    // TODO: Write a switch to handle at least the basics sql errors
    return {
        code,
        errno,
        sqlMessage
    };
};

/**
 * This function handle all errors related with unique constraints errors
 * @param errors
 * @returns {Object}
 */
const handleSequelizeUniqueConstraintError = (errors) => {
    let handledErrors = {};
    let error = undefined;

    for (err in errors.errors) {
        // err represent the index of errors.errors array
        error = errors.errors[err];
        handledErrors = {
            ...handledErrors,
            [error.path]: {
                // The name of property will be the path of the error
                path: error.path,
                type: error.type,
                message: error.message,
                validatorKey: error.validatorKey,
                instance: error.instance
            }
        };
    }

    return handledErrors;
};

/**
 * This function handle all errors related with validations errors
 * @param errors
 * @returns {Object}
 */
const handleSequelizeValidationError = (errors) => {
    let handledErrors = {};
    let error = undefined;

    for (err in errors.errors) {
        // err represent the index of errors.errors array
        error = errors.errors[err];
        handledErrors = {
            ...handledErrors,
            [error.path]: {
                // The name of property will be the path of the error
                path: error.path,
                type: error.type,
                message: error.message,
                validatorKey: error.validatorKey,
                instance: error.instance
            }
        };
    }

    return handledErrors;
};

/**
 * Useful function to manage the error when something goes wrong in our sequelize
 * models or connections. By the way, the function take the catch error as argument.
 * @returns {Object}
 * @param {any} errors
 */
module.exports = (errors) => {
    switch (errors.name) {
        case 'SequelizeDatabaseError':
            return { [errors.name]: handleSequelizeDatabaseError(errors) };
        case 'SequelizeUniqueConstraintError':
            return {
                [errors.name]: handleSequelizeUniqueConstraintError(errors)
            };
        case 'SequelizeValidationError':
            return { [errors.name]: handleSequelizeValidationError(errors) };
        case 'SequelizeForeignKeyConstraintError':
            return {
                [errors.name]: handleSequelizeForeignKeyConstraintError(errors)
            };
        default:
            return { [errors.name]: 'No handled error' };
    }
};
