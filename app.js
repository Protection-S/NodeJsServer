const express = require('express');
const app = express();
const mysql = require("mysql2");
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ChatBotTests'
  });

connection.connect(err=>{
    if(err){
        console.error('Error connection to the DB'. err.stack);
        return;
    }

    console.log('Connected to the DB')
});



app.get('/getAllItems', (request, response) =>{
    connection.query('select * from items', (error, results) => {
        if(error){
            response.json({error: 'Error, try again!'});
        }
        else{
            response.json(results);
        }
    });
});


app.post('/addItem', (request, response) => {
    const {name, description} = request.query;
    if(!name || !description){
        response.json(null);
        return;
    }

    const query = 'insert into items (name, description) values(?, ?)';
    connection.query(query, [name, description], (error, results) => {
        if(error){
            response.json({error: "Error, try again!!"});
        }
        else{
            response.json({id: results.insertId, name, description});
        }
    });
});


app.post('/deleteItem', (request, response) => {
    const {id} = request.query;
    if(typeof id === 'undefined' || isNaN(id)){
        response.json({error: "Ошибка бро"});
        return;
    }

    const query = 'delete from items where id = ?';
    connection.query(query, [id], (error, results) => {
        if(error){
            response.json({error: "Error, try again!!"});
        }
        else{
            response.json({id});
        }
    });
});



app.post('/updateItem', (request, response) => {
    const {id, name, description} = request.query;
    if(!id || isNaN(id) || !name || !description){
        response.json(null);
        return;
    }

    const query = 'update items set name = ?, description = ? where id = ?';
    connection.query(query, [name, description, id], (error, results) => {
        if(error){
            response.json({error: "Error, try again!!"});
        }
        else{
            response.json({id, name, description});
        }
    });
});



app.get('/static', (request, response) => {
  response.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end('<h1>Привет, Октагон!</h1>');
  });

app.get('/dynamic', (request, response) => {
  const a = parseFloat(request.query.a);
  const b = parseFloat(request.query.b);
  const c = parseFloat(request.query.c);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    response.json({ header: 'Error' });
  } else {
    const result = (a * b * c) / 3;
    response.json({ header: 'Calculated', body: result.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
