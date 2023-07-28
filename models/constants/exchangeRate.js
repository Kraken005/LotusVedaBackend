const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    rupee: {
        type: String,
        required: false,
    },
    usd: {
        type: String,
        required: false,
    },
    euro: {
        type: String,
        required: false,
    },
    pound: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("exchangeRateConstant", exchangeSchema);