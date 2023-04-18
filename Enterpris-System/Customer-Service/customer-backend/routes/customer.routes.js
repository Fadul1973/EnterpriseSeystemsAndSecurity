var express = require('express');
var router = express.Router();
//Require controller
var customerController = require('../controllers/customer.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the customer api"});
});

// Create a new customer
router.post("/customers/", customerController.create);
 
// Retrieve all customers
router.get("/customers/", customerController.findAll);
 
// Retrieve a single customer with id
router.get("/customers/:id", customerController.findOne);

// Retrieve a single customer with isbn
router.get("/customers/:isbn", customerController.findOne);
 
// Update a customer with id
router.put("/customers/:id", customerController.update);
 
// Delete a customer with id
router.delete("/customers/:id", customerController.delete);
 
// Delete all customers of the database
router.delete("/customers/", customerController.deleteAll);
 
module.exports = router;