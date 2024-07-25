const constants = require("../config/constants");
const response = require("../config/response");
const FollowUpAppointment = require("../model/FollowUpAppointment");
const mongoose= require("mongoose");
const { Validator } = require('node-input-validator');
const helper = require('../helper/helper');

module.exports.getAllAppointments= async (req, res) => {
    try{
        const getList = await FollowUpAppointment.aggregate([
            {
                $match:{
                    "isDeleted":false,
                }
            },{
                 $lookup:{
                    from: "patient",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient"
                }
            },{
                $unwind: {
                    path: "$patient",
                    preserveNullAndEmptyArrays: true,
                  }
            },
            {
                $project: {
                  _id: 1, 
                  date: 1,
                  time: 1,
                  patientName: "$patient.name", 
                  patientAge: "$patient.age", 
                },
            },
          ]);
          if (getList.length > 0) {
            return response.returnTrue(
              req,
              res,
              "Record found",
              getList
            );
          } else {
            return response.returnFalse(req, res, "No record found", []);
          }
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
 
};


module.exports.addAppointment = async (req, res) => {
  try {
   
    const checkUniqueAppointment = await FollowUpAppointment.findOne({
        date: req.body.date,
        time: req.body.time,
      });
    if (checkUniqueAppointment !== null) {
      return response.returnFalse(req, res, "Please choose another time or date for appointment", []);
    }
    let v = new Validator(req.body, {
        date: "required|date",
        time: "required|string",
        patient: "required|string",
      });
  
      let matched = await v.check();
      if (!matched) {
        return response.returnFalse(
          req,
          res,
          helper.validationErrorConvertor(v),
          {}
        );
      }
  
      const newAppointment = new FollowUpAppointment(req.body);
      await newAppointment.save();
      return response.returnTrue(req, res, "Appointment added successfully", []);
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteAppointment = async (req, res) => {
    try {
      const Id =new mongoose.Types.ObjectId(req.params.id); 
      await FollowUpAppointment.findByIdAndUpdate(Id,{isDeleted:true});
      return response.returnTrue(req, res,"Deleted Successfully", []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

module.exports.updateAppointment = async (req, res, next) => {
  try {

    if (!req.body.date) {
      delete req.body.date;
    }
    if (!req.body.time) {
        delete req.body.time;
    }
    if (!req.body.patient) {
        delete req.body.patient;
    }
   

    await FollowUpAppointment.findByIdAndUpdate(req.params.id, req.body);
    return response.returnTrue(req, res, "Update successfully", []);
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};
