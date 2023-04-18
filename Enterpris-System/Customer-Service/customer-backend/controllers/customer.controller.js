const db = require("../models");
const Customer = db.customers;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the customer system");
    response.end();
};

// Create and Save a new customer
exports.create = (req, res) => {
     // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a customer model object
    const customer = new Customer({
        name: req.body.name,
        number: req.body.number,
        company: req.body.company,
        phone: req.body.phone,
    });
    // Save customer in the database
    customer
        .save(customer)
        .then(data => {
            console.log("customer saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the customer."
            });
        });
};
 
// Retrieve all Books from the database by Name.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //We use req.query.title to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Customer
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Suppliers."
            });
        });
};

//Find a single Supplier with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond Supplier by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving supplier with id!" + id });

        });
};
 
// Update a customer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update customer with id=${id}.Maybe customer was not found`
                });
            } else res.send({ message: "customer was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating customer with id=" + id
            });
        });  
};
 
// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Customer.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete customer with id=${id}.Maybe customer was not found`
                });
            } else {
                res.send({
                  message: "customer was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Supplier with id=" + id
            });
       });        
};
 
 
// Delete all customer from the database.
exports.deleteAll = (req, res) => {

    Customer.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} customer were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customer."
            });
        });
};

// Find all purchased customer
exports.findAllPurchased = (req, res) => {
    Supplier.find({ purchased: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Suppliers."
            });
        });
}