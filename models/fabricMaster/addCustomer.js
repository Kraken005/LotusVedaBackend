const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    prefix: {
        type: String,
        required: false
    },
    localType: {
        type: String,
        required: false,
        default: 'Local'
    },
    name: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: false,
        //default: " "
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false,
        //default: " "
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
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        //default: " "
    },
    gstNo: {
        type: String,
        required: false,
        //default: " "
    },
    discount: {
        type: String,
        required: false,
        default: 'Single',
    },
    discountPercentage: {
        type: String,
        required: false,
        //default: " "
    },
    remarks: {
        type: String,
        required: false,
        //default: " "
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);