const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    rateCode: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    HSN: {
        type: String,
        require: true
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("sampleConstant", sampleSchema);