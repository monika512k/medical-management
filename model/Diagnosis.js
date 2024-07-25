const mongoose = require('mongoose');
const DiagnosisSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,"Diagnosis is required"],
        trim: true 
    },
    notes: {
        type:String,
        default:"",

    },
    patient: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
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
DiagnosisSchema.index({ patient: 1, name: 1 });
module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
