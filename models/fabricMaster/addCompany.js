const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
        required: false
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

