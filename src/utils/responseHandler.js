const {
    SUCCESS_CODES,
    CLIENT_ERROR_CODES,
    SERVER_ERROR_CODES
} = require('../config/constants');

/**
 * Retorna una response con un SUCCESS_CODES.ok (200), de igual manera se
 * retorna el resultado (result) de la request. Se debe usar cuando la request
 * se ejecute con exito.
 * @param {Response} res
 * @param {any} result
 */
exports.successRequestResponse = function (res, result) {
    res.status(SUCCESS_CODES.ok).send({
        status_code: res.statusCode,
        result
    });
};

/**
 * Retorna una response con un CLIENT_ERROR_CODES.bad_request (401),
 * de igual manera se retorna el resultado (result) de la request. Se debe usar
 * cuando los parametros enviados no sean correctos.
 * @param {Response} res
 * @param {any} result
 */
exports.badRequestResponse = function (res, result) {
    res.status(CLIENT_ERROR_CODES.bad_request).send({
        status_code: res.statusCode,
        result
    });
};

/**
 * Retorna una response con un CLIENT_ERROR_CODES.not_found (404), el cual indica que
 * no encontraron resultados para la request solicitada.
 * @param {Response} res
 * @param {any} result
 */
exports.notFoundRequestResponse = function (res, result) {
    result = {
        msg: `Not found: ${result}`
    };
    res.status(CLIENT_ERROR_CODES.not_found).send({
        status_code: res.statusCode,
        result
    });
};

/**
 * Retorna una response con un SERVER_ERROR_CODES.internal_server_error (500), el cual indica
 * que ocurrio un error interno del sevidor por lo que la request no puede
 * ser contestada correctamente.
 * @param {Response} res
 * @param {any} result
 */
exports.internalServerErrorRequestResponse = function (res, result) {
    res.status(SERVER_ERROR_CODES.internal_server_error).send({
        status_code: res.statusCode,
        result
    });
};

/**
 * Retorna una response con un CLIENT_ERROR_CODES.unauthorized (403), el cual
 * indica que el usuario no tiene permiso para acceder a ese recurso.
 * @param {Response} res
 * @param {any} result
 */
exports.notAuthorizedRequestResponse = function (res, result) {
    res.status(CLIENT_ERROR_CODES.unauthorized).send({
        status_code: res.statusCode,
        result
    });
};
