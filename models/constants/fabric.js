const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fabricSchema = new Schema({
    fabricQuality: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("fabricConstant", fabricSchema);