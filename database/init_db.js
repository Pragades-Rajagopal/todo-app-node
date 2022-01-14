const path = require("path");
const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database(':data:');

// db.run("CREATE TABLE IF NOT EXISTS Tasks (Task TEXT NOT NULL, Status TEXT NOT NULL, Task_Id INTEGER PRIMARY KEY AUTOINCREMENT);", (err) => {
//     if (err) {
//         console.log("Error while creating database...", err);
//     }
//     console.log("Table created");
// });

// db.close();

var db_path = path.resolve(__dirname, 'data.sqlite3');

let db = new sqlite3.Database(path.resolve(db_path), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(db_path);
        console.log("Error while creating database...", err);
    }
    else {
        console.log("Created database...");
        createTable();
    }
});


const createTable = () => {
    console.log("Creating table...");
    db.run("CREATE TABLE IF NOT EXISTS Tasks (Task TEXT NOT NULL, Status TEXT NOT NULL, Descr TEXT, Task_Id INTEGER PRIMARY KEY AUTOINCREMENT);", insertData);
};

const insertData = () => {
    console.log("Inserting data...");
    db.run("INSERT INTO Tasks (Task, Status, Descr, Task_Id) VALUES (?,?,?,?)", ["Task One", "Completed", "Just a description", "1"], readData);
};

const readData = () => {
    console.log("Reading data...");

    db.all("SELECT * FROM Tasks", (err, rows) => {
        if (err) throw err;

        rows.forEach((row) => {
            console.log(row.Task_Id +": "+ row.Task);
        });
    });
};

db.close();



