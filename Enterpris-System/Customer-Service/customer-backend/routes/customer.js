var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'customerservicedb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the booshop api.' });
});
 
// GET list of customers to show that we're up and running
router.get('/customers', function(req, res, next) {
    //Getting list of suppliers from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('customers');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving customers." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new customers to the db
router.post('/customers', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { name: req.body.name, 
               number: req.body.number, 
               company: req.body.company,
               phone: req.body.phone,};

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('customers');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the customers."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /customers
router.put('/customers', function (req, res) {
 res.send('Got a PUT request at /customers');
});
 
// accept DELETE request at /book
router.delete('/customers', function (req, res) {
 res.send('Got a DELETE request at /customers');
});
 
module.exports = router;