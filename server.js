const express = require('express');
const app = express(); 
const mysql = require('mysql2');
//const cors = require('cors');
const dotenv = require('dotenv'); 

app.use(express.json());
//app.use(cors());
dotenv.config(); 


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//question 1 

app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving patients')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

//question 2

app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving providers')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

//question 3
app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM patients WHERE first_name = ?', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving patients')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});


//question 4
app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM providers WHERE provider_specialty = ?', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving providers')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});




const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})