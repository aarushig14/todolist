/**
 * Created by a.gupta1409 on 15-04-2017.
 */

const express = require('express')
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/', express.static(__dirname + "/public_static" ));

let todo = []

app.get('/tasks',function (req,res) {
    res.send(JSON.stringify(todo));
})

app.post('/add',function (req,res) {
    let task = {
        task: req.body.task,
        done: req.body.done,
        id: req.body.id
    }
    todo.push(task);
    res.redirect('/tasks');
})

app.post('/refresh',function (req,res) {
    console.log(req.body.list);
    todo = req.body.list;
    console.log(todo);
    res.redirect('/tasks');
})

app.get('/clr',function (req,res) {
    todo = [];
    res.redirect('tasks');
})

app.listen(3456, function () {
    console.log('Server is connected to http://localhost3456');
});