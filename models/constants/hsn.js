const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hsnSchema = new Schema({
    hsnCode: {
        type: String,
        required: true
    },
    taxSlab: {
        type: String,
        required: true
    },
    slabCode: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("hsnConstant", hsnSchema);