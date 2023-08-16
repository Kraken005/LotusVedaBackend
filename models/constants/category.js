const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryPrefix: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: false,
    },
    HSN: {
        type: String,
        required: true,
    },
    barcodeType: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("categoryConstant", categorySchema);