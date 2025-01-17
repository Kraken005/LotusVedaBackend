const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    colorName: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("colorConstant", colorSchema);