const taskModel = require('../models/taskModels');
const { validationResult } = require('express-validator');

function index_page_get (req, res) {
    taskModel.getTasks((queryResult) => {
        console.log(queryResult);
        res.render('index', {tasks : queryResult});
    });
};

function about_page (req, res) {
    res.render('about');
};

function create_page_get (req, res) {
    res.render('create', {errors : {}});
};

function create_page_post (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('create', {errors : errors.mapped()});
    }
    const task = req.body.Task;
    // const status = "In progress";
    const status = req.body.Status;
    const descr = req.body.Descr;

    taskModel.createTask(task, descr, status, (result) => {
        console.log(result);
        res.redirect('/');
    });
};

function delete_page_get (req, res) {
    const id = req.params.id;
    taskModel.getTask(id, (result) => {
        console.log("At delete_page_get", result);
        res.render('delete', {task: result});
    });
};

function delete_page_post (req, res) {
    const id = req.params.id;
    taskModel.deleteTask(id, (result) => {
        console.log("At delete_page_post..", result);
        res.redirect('/');
    });
};

function update_page_get (req, res) {
    const id = req.params.id;
    taskModel.getTask(id, (result) => {
        console.log("At update_page_get", result);
        res.render('update', {task: result, errors:{}});
    });
};

function update_page_post (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('update', { task:req.body, errors:errors.mapped()});
    }
    const id = req.params.id;
    const task = req.body.Task;
    const status = req.body.Status;
    const descr = req.body.Descr;
    taskModel.updateTask(task, descr, status, id, (result) => {
        console.log("At update_page_post..", result);
        res.redirect('/');
    });
};

module.exports = {
    index_page_get,
    about_page,
    create_page_get,
    create_page_post,
    delete_page_get,
    delete_page_post,
    update_page_get,
    update_page_post
};


