const db = require("../models");
const Supplier = db.suppliers;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the bookshop system");
    response.end();
};

// Create and Save a new Book
exports.create = (req, res) => {
     // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a supplier model object
    const supplier = new Supplier({
        name: req.body.name,
        number: req.body.number,
        company: req.body.company,
        phone: req.body.phone,
    });
    // Save Supplier in the database
    supplier
        .save(supplier)
        .then(data => {
            console.log("Supplier saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the Spplier."
            });
        });
};
 
// Retrieve all Books from the database by Name.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //We use req.query.title to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Supplier
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

    Supplier.findById(id)
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
 
// Update a Supplier by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Supplier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Supplier with id=${id}.Maybe Supplier was not found`
                });
            } else res.send({ message: "Supplier was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Supplier with id=" + id
            });
        });  
};
 
// Delete a Supplier with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Supplier.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Supplier with id=${id}.Maybe Supplier was not found`
                });
            } else {
                res.send({
                  message: "Supplier was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Supplier with id=" + id
            });
       });        
};
 
 
// Delete all Suppliers from the database.
exports.deleteAll = (req, res) => {

    Supplier.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Suppliers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Suppliers."
            });
        });
};

// Find all purchased Suppliers
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