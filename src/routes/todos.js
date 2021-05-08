const { todos } = require('../controllers');
const router = require('express').Router();

router
    .route('/todos')
    .get(todos.getTodos)
    .post(todos.createTodo)
    .put(todos.updateTodo)
    .delete(todos.deleteTodo);

module.exports = router;
