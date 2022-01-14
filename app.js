const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.urlencoded({extended:false}));

// app.get('/', (req, res) => {
//     res.send('To-Do application');
// });

app.use(taskRoutes);

app.listen(8000, () => {
    console.log("Server started in port 8000");
});