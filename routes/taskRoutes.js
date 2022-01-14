const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const taskValidator = require('../validation/taskValidator');

// router.get('/', (req, res) => {
//     res.render('index');
// });

router.get('/', taskController.index_page_get);
router.get('/about', taskController.about_page);
router.get('/task/create', taskController.create_page_get);
router.post('/task/create', taskValidator.validateTask, taskController.create_page_post);
router.get('/task/delete/:id', taskController.delete_page_get);
router.post('/task/delete/:id', taskController.delete_page_post);
router.get('/task/update/:id', taskController.update_page_get);
router.post('/task/update/:id', taskValidator.validateTask, taskController.update_page_post);

module.exports = router;

