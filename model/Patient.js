const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Patient name is required"],
        trim:true,
    },
    age: {
        type:Number,
        required:[true,"Patient age is required"],
        min:18,
        max:100
    },
    gender: {
        type:String,
        required:[true,"Patient gender is required"],
        enum: ['Male', 'Female', 'Other']
    },
   
        isDeleted:{
            type: Boolean,
            default: false
         },
        createdAt:{
            type: Date,
            default: Date.now
        },

},{
    timestamps: true 
});
module.exports = mongoose.model('Patient', PatientSchema);
