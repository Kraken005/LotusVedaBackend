const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxSlabSchema = new Schema({
    slabCode: {
        type: String,
        required: true,
    },
    taxName: {
        type: String,
        required: true,
    },
    taxSlabName: {
        type: String,
        required: true,
    },
    fromAmount: {
        type: String,
        required: true,
    },
    toAmount: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("taxSlabConstant", taxSlabSchema);