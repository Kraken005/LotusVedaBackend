const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema({
    techniqueName: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("techniqueConstant", techniqueSchema);