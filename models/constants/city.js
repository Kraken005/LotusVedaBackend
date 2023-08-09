const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    stateName: {
        type: String,
        required: true
    },
    cityCode: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("cityConstant", citySchema);