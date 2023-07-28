const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    dealerName: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

module.exports = mongoose.model("dealerConstant", dealerSchema);