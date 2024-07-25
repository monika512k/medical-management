const constants = require("../config/constants");
const response = require("../config/response");
const DrugPrescription = require("../model/DrugPrescription");
const mongoose = require("mongoose");
const { Validator } = require("node-input-validator");
const helper = require("../helper/helper");

module.exports.getAllDrugPrescription = async (req, res) => {
  try {
    const getList = await DrugPrescription.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "patient",
          localField: "patient",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: {
          path: "$patient",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          dosage: 1,
          frequency: 1,
          duration: 1,
          duration: 1,
          time: 1,
          contents: 1,
          notes: 1,
          createdAt: 1,
          patientName: "$patient.name",
          patientAge: "$patient.age",
        },
      },
    ]);
    if (getList.length > 0) {
      return response.returnTrue(req, res, "Record found", getList);
    } else {
      return response.returnFalse(req, res, "No record found", []);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.addDrugPrescription = async (req, res) => {
  try {
    let v = new Validator(req.body, {
      name: "required|string",
      dosage: "required",
      frequency: "required|string",
      time: "required",
      patient: "required",
      duration:"required|min:0",
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

    const newDrugPrescription = new DrugPrescription(req.body);
    await newDrugPrescription.save();
    return response.returnTrue(
      req,
      res,
      "Drug prescription added successfully",
      []
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteDrugPrescription = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    await DrugPrescription.findByIdAndUpdate(Id, { isDeleted: true });
    return response.returnTrue(req, res, "Deleted Successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateDrugPrescription = async (req, res, next) => {
  try {
    if (!req.body.name) {
      delete req.body.name;
    }
    if (!req.body.dosage) {
      delete req.body.dosage;
    }
    if (!req.body.patient) {
      delete req.body.patient;
    }
    if (!req.body.frequency) {
      delete req.body.frequency;
    }
    if (!req.body.duration) {
      delete req.body.duration;
    }
    if (!req.body.time) {
      delete req.body.time;
    }
    if (!req.body.contents) {
      delete req.body.contents;
    }
    if (!req.body.notes) {
      delete req.body.notes;
    }

    await DrugPrescription.findByIdAndUpdate(req.params.id, req.body);
    return response.returnTrue(req, res, "Update successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
