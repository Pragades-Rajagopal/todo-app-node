const { check } = require('express-validator');

exports.validateTask = [
    check('Task')
    .isLength({min:1, max:500})
    .withMessage("Task name must have characters between 1 and 500"),
    check('Descr')
    .isLength({min:1})
    .withMessage("Task description cannot be empty")
];

