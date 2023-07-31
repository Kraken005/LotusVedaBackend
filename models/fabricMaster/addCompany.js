const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNo: {
        type: String,
        required: true
    },
    gstin: {
        type: String,
        required: false
    },
    tin: {
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
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);

