const mongoose = require('mongoose');

const FollowUpAppointmentSchema = new mongoose.Schema({
    date:{
     type:Date,
     required: [true, 'Follow-up date is required'],
     validate: {
        validator: (value) => value > Date.now(),
        message: 'Follow-up date must be in the future'
    }
    },
    time:{
        type:String,
        required: true,
    },
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient',
        required:true
     },
     patientAdvice:{
        type: String,
        default:"",
     },
     privateNotes:{
        type: String,
        default:""
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

FollowUpAppointmentSchema.index({ patient: 1, date: 1 });
module.exports = mongoose.model('FollowUpAppointment', FollowUpAppointmentSchema);
