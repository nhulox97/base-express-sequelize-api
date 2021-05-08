const bcrypt = require('bcrypt');
const {
    successRequestResponse,
    internalServerErrorRequestResponse,
    notFoundRequestResponse,
    badRequestResponse
} = require('../utils/responseHandler');
// const { User } = require('../db/models');
const { generateToken } = require('../services/jwt');
const Models = require('../db/models');
const sequelizeErrorHandling = require('../utils/sequelizeErrorHandling');

/**
 * Get user token generate by itself properties
 * @param {Request} req
 * @param {Response} res
 */
exports.getToken = (req, res) => {
    const user = req.body;
    const token = generateToken(user);
    successRequestResponse(res, token);
};

/**
 * Test auth user token generate by itself properties
 * @param {Request} req
 * @param {Response} res
 */
exports.getUsers = (req, res) => {
    Models.User.findAll()
        .then((users) => {
            // Check if there ir a user stored in database
            if (users.length <= 0) return notFoundRequestResponse(res, 'Users');
            // return found users
            return successRequestResponse(res, { users });
        })
        .catch((error) => {
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Save a new user, all params are received on req.body
 * @param {Request} req
 * @param {Response} res
 */
exports.signInUser = (req, res) => {
    const user = req.body;
    // Verificar que el objeto contenga al menos una propiedad.
    // Sequelize se encargará de verificar que la propiedad del objeto
    // user sean las correctas
    if (Object.keys(user).length <= 0)
        return badRequestResponse(res, {
            users: {
                msg: 'Server does not received all required params'
            }
        });

    // Create new user
    Models.User.create(user)
        .then((nUser) => {
            const token = generateToken(nUser);
            return successRequestResponse(res, {
                user: nUser,
                token,
                msg: 'User was successfully created'
            });
        })
        .catch((error) => {
            console.log(error);
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Login user and get token if this is required by user, the token its generate
 * by user itself properties
 * @param {Request} req
 * @param {Response} res
 */
exports.loginUser = (req, res) => {
    const { user_username, user_password } = req.body;
    console.log(user_username);
    // Verificar que el objeto contenga al menos una propiedad.
    // Sequelize se encargara de verificar que las propiedad del objeto
    // user sean las correctas
    if (!user_password || !user_username)
        return badRequestResponse(res, {
            users: {
                msg: 'Server does not received all required params'
            }
        });

    // Buscar el usuario
    Models.User.findOne({
        where: {
            user_username: user_username
        }
    })
        .then((lUser) => {
            // Verificar si el usuario fue encontrado en la base de datos
            if (!lUser) return notFoundRequestResponse(res, 'User');

            // Verificar si las password enviada es la correcta
            bcrypt.compare(
                user_password,
                lUser.user_password,
                (err, isValidPass) => {
                    // Verificar si existen errores
                    if (err)
                        return internalServerErrorRequestResponse(res, err);

                    // Si las passwords no coinciden, entonces retornar el error
                    if (!isValidPass)
                        return badRequestResponse(res, {
                            invalidPass: true,
                            msg: 'Password is wrong'
                        });

                    // Verificar si el token no fue requerido
                    const { isTokenRequired } = req.body;
                    if (!isTokenRequired)
                        return successRequestResponse(res, lUser);

                    // Si el token fue requerido, solicitarlo.
                    const token = generateToken(lUser);
                    return successRequestResponse(res, {
                        user: lUser,
                        token,
                        msg: 'User successfully logged'
                    });
                }
            );
        })
        .catch((error) => {
            // TODO: Funcion que haga el handler de los diferentes errores que
            // puedan ocurrir en sequelize
            console.log(error);
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Update an existing user.
 * @param {Request} req
 * @param {Response} res
 */
exports.updateUser = (req, res) => {
    const nUser = req.body;
    // check if the body request has at least one param
    if (Object.keys(nUser).length <= 0)
        return badRequestResponse(res, {
            users: {
                msg: 'Server does not received all required params'
            }
        });

    // chech if user_id was sent
    const { user_id } = nUser;
    if (!user_id) return badRequestResponse(res, 'User id was not sent');

    // Eliminar propieda del passweord para evitar que se actualice
    delete nUser.user_password;
    // Find and update the User.
    Models.User.update(nUser, { where: { user_id: user_id } })
        .then((uUser) => {
            console.log(uUser);
            // uUser es un array de 1 posicion, los valores posibles son
            // 0: no se realizo la actualizacion porque es probable que no se
            // encontraran registros con esas condiciones.
            // 1: El registro se actualizo correctamente
            const userWasUpdated = uUser[0];
            if (!userWasUpdated)
                return notFoundRequestResponse(res, `User with id ${user_id}`);

            // Si el usuario se actualizo, entonces devolver el objeto del usuario
            // actualizado
            Models.User.findByPk(user_id).then((updatedUser) =>
                successRequestResponse(res, { user: updatedUser })
            );
        })
        .catch((error) => {
            // TODO: Funcion que haga el handler de los diferentes errores que
            // puedan ocurrir en sequelize
            console.log(error);
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};
