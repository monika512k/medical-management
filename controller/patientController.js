const mongoose = require('mongoose');
const Patient = require('../model/Patient');
const { Validator } = require('node-input-validator');
const response = require('../config/response');
const helper = require('../helper/helper');

// Get all patients
module.exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.aggregate([
        {
            $match: { isDeleted: false }
        },
        {
            $lookup:{
                from: 'diagnoses',
                localField: '_id',
                foreignField: 'patient',
                as: 'diagnoses'
            }
        },
        {
            $lookup:{
                from: 'drugprescriptions',
                localField: '_id',
                foreignField: 'patient',
                as: 'drugprescriptions'
            }
        },
        {
            $lookup:{
                from: 'labtests',
                localField: '_id',
                foreignField: 'patient',
                as: 'labtests'
            }
        },
        {
            $lookup:{
                from: 'symptoms',
                localField: '_id',
                foreignField: 'patient',
                as: 'symptoms'
            }
        },{
            $lookup:{
                from: 'followupappointments',
                localField: '_id',
                foreignField: 'patient',
                as: 'followupappointments'
            }
        },
        {
            $sort: { timestamp: 1 }
          }

    ])
    if (patients.length > 0) {
      return response.returnTrue(req, res, "Patients found", patients);
    } else {
      return response.returnFalse(req, res, "No patients found", []);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single patient by ID
module.exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('symptoms diagnoses labTests drugPrescriptions followUpAppointments');
    if (patient) {
      return response.returnTrue(req, res, "Patient found", patient);
    } else {
      return response.returnFalse(req, res, "Patient not found", []);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deletePatient = async (req, res) => {
    try {
      const Id = new mongoose.Types.ObjectId(req.params.id);
      await Patient.findByIdAndUpdate(Id, { isDeleted: true });
      return response.returnTrue(req, res, "Deleted Successfully", []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

// Create a new patient
module.exports.addPatient = async (req, res) => {
  try {
    let v = new Validator(req.body, {
      name: "required|string",
      age: "required|integer|min:18|max:100",
      gender: "required|string|in:Male,Female,Other",
    });

    let matched = await v.check();
    if (!matched) {
      return response.returnFalse(req, res, helper.validationErrorConvertor(v), {});
    }

    const newPatient = new Patient(req.body);
    await newPatient.save();
    return response.returnTrue(req, res, "Patient created successfully", newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a patient
module.exports.updatePatient = async (req, res) => {
    try {
      const v = new Validator(req.body, {
        name: 'string',
        age: 'integer|min:18|max:100',
        gender: 'string|in:Male,Female,Other'
      });
  
      const matched = await v.check();
      if (!matched) {
        return response.returnFalse(req, res, helper.validationErrorConvertor(v), {});
      }
  
      const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPatient) {
        return response.returnFalse(req, res, 'Patient not found', {});
      }
      return response.returnTrue(req, res, 'Patient updated successfully', updatedPatient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }}