const database = require('../database/database');

const getTasks = (callback) => {
    const sql = `SELECT * FROM Tasks`;
    database.appDatabase.all(sql, [], (err, rows) => {
        if (err) {
            console.log("Error at Models", err.message);
        }
        callback(rows);
    });
};

const createTask = (task, descr, stat, callback) => {
    const sql = "INSERT INTO Tasks (Task, Descr, Status) VALUES (?, ?, ?)";

    database.appDatabase.run(sql, [task, descr, stat], (err) => {
        if (err) {
            callback(err.message);
        }

        const successMsg = "Task entered successfully";
        callback(successMsg);
    });
};

const getTask = (id, callback) => {
    const sql = "SELECT * FROM Tasks where Task_Id = ?";
    database.appDatabase.get(sql, [id], (err, row) => {
        if (err){
            callback("error at getTask func..", err.message);
        }
        callback(row);
    });
};

const deleteTask = (id, callback) => {
    const sql = "DELETE FROM Tasks where Task_Id = ?";
    database.appDatabase.run(sql, [id], (err) => {
        if (err) {
            callback(err.message);
        }
        const msg = "Task deleted successfully";
        callback(msg);
    });
};

const updateTask = (task, descr, status, id, callback) => {
    const sql = "UPDATE Tasks set Task = ?, Descr = ?, Status = ? where Task_Id = ?";
    database.appDatabase.run(sql, [task, descr, status, id], (err) => {
        if (err) {
            callback(err.message);
        }
        msg = "Task updated successfully";
        callback(msg);
    });
};


module.exports = { 
    getTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
 };
