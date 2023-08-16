const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxSchema = new Schema({
    taxName: {
        type: String,
        required: true,
    },
    percent: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

module.exports = mongoose.model("taxConstant", taxSchema);