var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bookshopdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the booshop api.' });
});
 
// GET list of suppliers to show that we're up and running
router.get('/suppliers', function(req, res, next) {
    //Getting list of suppliers from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('suppliers');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving suppliers." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new suppler to the db
router.post('/suppliers', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { name: req.body.name, 
               number: req.body.number, 
               company: req.body.company,
               phone: req.body.phone,};

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('suppliers');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the supplier."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /supplier
router.put('/suppliers', function (req, res) {
 res.send('Got a PUT request at /supplier');
});
 
// accept DELETE request at /book
router.delete('/suppliers', function (req, res) {
 res.send('Got a DELETE request at /supplier');
});
 
module.exports = router;