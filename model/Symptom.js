const mongoose = require('mongoose');
const SymptomSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: [true, "Symptom name is required"],
        trim: true
    },
    duration:{ 
        type: Number,
        default: 0,
        min: [0, "Duration must be a positive number"]
    },
    notes: {
        type: String,
        default: "",
        trim: true
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
SymptomSchema.index({ patient: 1, name: 1 });
module.exports = mongoose.model('Symptom', SymptomSchema);
