console.log("here")
const mongoose = require("mongoose")
const log = mongoose.connect('mongodb+srv://vanshbhatnagar14dev:129212@cluster0.blv3ioj.mongodb.net/');
console.log("db connect done" + log);
const {Schema} = mongoose;
const fetchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    last: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    buy: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    sell: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    volume: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    base_unit: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    }
})
console.log("schema defined");
const hodlinfo = mongoose.model('hodlinfo',fetchSchema);
console.log('model initiated');
module.exports= {
    hodlinfo
}