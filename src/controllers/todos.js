const {
    successRequestResponse,
    badRequestResponse,
    notFoundRequestResponse,
    internalServerErrorRequestResponse
} = require('../utils/responseHandler');
const { TODOS_BASE_QUERY } = require('../config/constants');
const Todo = require('../db/models/todos');
const sequelizeErrorHandling = require('../utils/sequelizeErrorHandling');

/**
 * Get todos saved in database
 * @param {Request} req
 * @param {Response} res
 */
exports.getTodos = (req, res) => {
    const query_params = req.query;
    let todos_query = {
        ...TODOS_BASE_QUERY,
        ...query_params
    };
    console.log(todos_query);
    Todo.findAll({ where: todos_query })
        .then((todos) => {
            if (todos.length <= 0) return notFoundRequestResponse(res, 'Todos');
            return successRequestResponse(res, todos);
        })
        .catch((error) => {
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Save a new todo, all params are received on req.body
 * @param {Request} req
 * @param {Response} res
 */
exports.createTodo = (req, res) => {
    const todo = req.body;
    console.log(req.body);
    if (Object.keys(todo).length <= 0)
        return badRequestResponse(res, {
            todos: {
                msg: 'Server does not receive all required params'
            }
        });
    Todo.create(todo)
        .then((nTodo) => {
            return successRequestResponse(res, nTodo);
        })
        .catch((error) => {
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Update a todo, all params are received on req.body
 * @param {Request} req
 * @param {Response} res
 */
exports.updateTodo = (req, res) => {
    const todo = req.body;
    if (Object.keys(todo).length <= 0)
        return badRequestResponse(res, {
            todos: {
                msg: 'Server does not receive all required params'
            }
        });
    const { todo_id } = todo;
    // Verificar si el id del registro fue enviado
    if (!todo_id)
        return badRequestResponse(res, {
            todos: {
                msg: 'todo_id was not sent'
            }
        });
    Todo.update(todo, { where: { todo_id } })
        .then((uTodo) => {
            // uTodo es un array de 1 posicion, los valores posibles son
            // 0: no se realizo la actualizacion porque es probable que no se
            // encontraran registros con esas condiciones.
            // 1: El registro se actualizo correctamente
            const wasUpdated = uTodo[0];
            if (!wasUpdated)
                return notFoundRequestResponse(res, `Todos with id ${todo_id}`);
            // Si el registro se actualizó, buscarlo para retornarlo en la response
            Todo.findByPk(todo_id).then((updatedTodo) => {
                return successRequestResponse(res, updatedTodo);
            });
        })
        .catch((error) => {
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};

/**
 * Delete a todo, all params are received on req.body
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteTodo = (req, res) => {
    const todo = req.body;
    if (Object.keys(todo).length <= 0)
        return badRequestResponse(res, {
            todos: {
                msg: 'Server does not receive all required params'
            }
        });
    const { todo_id } = todo;
    // Verificar si el id del registro fue enviado
    if (!todo_id)
        return badRequestResponse(res, {
            todos: {
                msg: 'todo_id was not sent'
            }
        });
    Todo.update(todo, { where: { todo_id } })
        .then((dTodo) => {
            // uTodo es un array de 1 posicion, los valores posibles son
            // 0: no se realizo la actualizacion porque es probable que no se
            // encontraran registros con esas condiciones.
            // 1: El registro se actualizo correctamente
            const wasDeleted = dTodo[0];
            if (!wasDeleted)
                return notFoundRequestResponse(res, `Todos with id ${todo_id}`);
            // Si el registro se actualizó, buscarlo para retornarlo en la response
            Todo.findByPk(todo_id).then((deletedTodo) => {
                return successRequestResponse(res, deletedTodo);
            });
        })
        .catch((error) => {
            const handledErrors = sequelizeErrorHandling(error);
            return internalServerErrorRequestResponse(res, handledErrors);
        });
};
