const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplerSchema = new Schema({
    prefix: {
        type: String,
        required: false
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
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
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
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gstNo: {
        type: String,
        required: true
    },
    panNo: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplerSchema);