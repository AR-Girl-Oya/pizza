const mongoose = require('mongoose');
 
const PizzasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Size is required"
        ]
    },
    
    size: {
        type: String,
        required: [
            true,
            "Size is required"
        ]
    },
    
    notes: {
        type: String
    },

    delivered: {
        type: Boolean,
        default: false,
      },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
 
const Pizza = mongoose.model('Pizza', PizzasSchema);
 
module.exports = Pizza;