const mongoose = require('mongoose');
const constants= require('../config/constants')
const DrugPrescriptionSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Drug Prescription name is required"],
        trim:true,
    },
    dosage: {
        type:Number,
        required: [true, "Drug Prescription dosage is required"],
        min: [0, "Dosage must be a positive number"]
    },
    frequency: {
        type:String,
        required: [true, "Drug Prescription frequency is required"],
        trim: true,
    },
    duration: {
        type:Number,
        required: [true, "Drug Prescription duration is required"],
        min: [0, "Duration must be a positive number"]
    },
    time: {
        type:String,
        enum: [
            constants.CONST_DRUG_PRESCRIPTION_TIME_ARTER_MEAL,
            constants.CONST_DRUG_PRESCRIPTION_TIME_BEFORE_MEAL,
          ],
        required: [true, "Drug Prescription time is required"],
    },
    contents:{
        type:String,
        default:"",
        trim: true,
    },
    notes: {
        type:String,
        default:"",
    },
    isDeleted:{
        type: Boolean,
        default: false
     },
    patient: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required:true,
     },
     createdAt:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true 
});
DrugPrescriptionSchema.index({ patient: 1, name: 1 });
module.exports = mongoose.model('DrugPrescription', DrugPrescriptionSchema);
