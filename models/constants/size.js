const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
    sizeName: {
        type: String,
        require: true
    },
    remarks: {
        type: String,
        required: false
    }
},{
    timestamps: true,
}
);


module.exports = mongoose.model("sizeConstant", sizeSchema);