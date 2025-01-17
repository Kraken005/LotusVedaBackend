const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hsnSchema = new Schema({
    hsnCode: {
        type: String,
        required: true
    },
    taxSlabName: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("hsnConstant", hsnSchema);