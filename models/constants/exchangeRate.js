const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    currencyName: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String,
        required: true
    },
    currencyValue: {
        type: String,
        required: true,
        default: "0.00"
    }

},{
    timestamps: true,
})

module.exports = mongoose.model("exchangeRateConstant", exchangeSchema);