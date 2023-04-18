var express = require('express');
var router = express.Router();
//Require controller
var supplierController = require('../controllers/supplier.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the bookshop api"});
});

// Create a new supplier
router.post("/suppliers/", supplierController.create);
 
// Retrieve all suppliers
router.get("/suppliers/", supplierController.findAll);
 
// Retrieve a single supplier with id
router.get("/suppliers/:id", supplierController.findOne);

// Retrieve a single supplier with isbn
router.get("/suppliers/:isbn", supplierController.findOne);
 
// Update a supplier with id
router.put("/suppliers/:id", supplierController.update);
 
// Delete a supplier with id
router.delete("/suppliers/:id", supplierController.delete);
 
// Delete all suppliers of the database
router.delete("/suppliers/", supplierController.deleteAll);
 
module.exports = router;