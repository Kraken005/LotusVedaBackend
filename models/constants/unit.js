const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unitName: {
        type: String,
        required: true,
    },
    unitDescription: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("unitConstant", unitSchema);