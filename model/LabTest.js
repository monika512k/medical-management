const mongoose = require('mongoose');
const LabTestSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,"Lab test name is required"],
        trim:true,
    },
    isRepeat:{ 
        type:Boolean,
        default: false,
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
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true,
     }
},{
    timestamps: true 
});
LabTestSchema.index({ patient: 1, name: 1 });
module.exports = mongoose.model('LabTest', LabTestSchema);
