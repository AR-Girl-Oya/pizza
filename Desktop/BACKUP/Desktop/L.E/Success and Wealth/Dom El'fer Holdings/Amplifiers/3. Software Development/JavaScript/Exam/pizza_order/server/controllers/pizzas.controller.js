const Pizza = require('../models/pizzas.model');



module.exports.findAllPizzas = (req, res) => {
    Pizza.find()
        .then((allPizzas) => {
            console.log("Current Pizzas Available:", allPizzas);
            res.json({ pizza: allPizzas })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}



module.exports.findOneSinglePizza = (req, res) => {
    Pizza.findOne({ _id: req.params.id })
        .then(oneSinglePizza => {
            console.log("Pizza Located:", oneSinglePizza);
            res.json({ pizza: oneSinglePizza })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
        
module.exports.createNewPizza = (req, res) => {
    console.log("Received request to create a new Pizza:", req.body);

    Pizza.create(req.body)
        .then(newlyCreatedPizza => {
            console.log("New Pizza created:", newlyCreatedPizza);
            res.json({ pizza: newlyCreatedPizza });
        })
        .catch((err) => {
            console.log("Error occurred while creating a new Pizza:", err);
            res.json({ message: 'Something went wrong', error: err });
        });
};

module.exports.updateDeliveredStatus = (req, res) => {
    const { id } = req.params;
    const { delivered } = req.body;
    
        Pizza.findByIdAndUpdate(
        id,
        { delivered },
        { new: true }
        )
        .then((updatedPizza) => {
            res.json({ pizza: updatedPizza });
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to update delivered status" });
        });
    };

module.exports.deleteAnExistingPizza = (req, res) => {
    Pizza.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log("Pizza Deleted!!:", result);
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
