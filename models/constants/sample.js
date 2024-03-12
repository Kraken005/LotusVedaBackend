const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    sampleNo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    sampleCode: {
        type: String,
        required: false
    },
    fabricQuality: {
        type: String,
        required: false
    },
    fabricDescription: {
        type: String,
        required: false
    },
    MRP: {
        type: String,
        required: true
    },
    retailRate: {
        type: String,
        required: true
    },
    purchaseRate: {
        type: String,
        required: true
    },
    fabricCode: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    wholeSaleRate: {
        type: String,
        required: true
    },
    rateCode: {
        type: String,
        required: false
    },
    semiWholeSaleRate: {
        type: String,
        required: false
    },
    HSN: {
        type: String,
        required: false
    },
    remarks: {
        type: String,
        required: false
    },
    picture: {
        type: Buffer,
        required: false
    },
    barcode: {
        type: String,
        required: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("sampleConstant", sampleSchema);


