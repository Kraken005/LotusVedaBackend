const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateName: {
        type: String,
        required: true
    },
    stateCode: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    stateType: {
        type: String,
        required: true
    }

},{
    timestamps: true,
})

module.exports = mongoose.model("stateConstant", stateSchema);