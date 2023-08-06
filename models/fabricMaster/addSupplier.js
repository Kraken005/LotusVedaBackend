const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplerSchema = new Schema({
    prefix: {
        type: String,
        required: true
    },
    localType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactPerson : {
        type: String,
        required: false
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    gstNo: {
        type: String,
        required: false
    },
    panNo: {
        type: String,
        required: false
    },
    remarks: {
        type: String,
        required: false
    },
    
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplerSchema);