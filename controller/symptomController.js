const constants = require("../config/constants");
const response = require("../config/response");
const Symptom = require("../model/Symptom");
const mongoose = require("mongoose");
const { Validator } = require("node-input-validator");
const helper = require("../helper/helper");


module.exports.getAllSymptom = async (req, res) => {
  try {
    const getList = await Symptom.aggregate([
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
          duration: 1,
          notes:1,
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

module.exports.addSymptom = async (req, res) => {
  try {
    let v = new Validator(req.body, {
      name: "required|string",
      patient: "required",
      duration:"required|min:1"
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

    const newSymptom = new Symptom(req.body);
    await newSymptom.save();
    return response.returnTrue(
      req,
      res,
      "Symptom added successfully",
      []
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteSymptom = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    await Symptom.findByIdAndUpdate(Id, { isDeleted: true });
    return response.returnTrue(req, res, "Deleted Successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateSymptom = async (req, res, next) => {
  let v = new Validator(req.body, {
    patient: "required",
    duration:"required|min:1"
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
  try {
    if (!req.body.name) {
      delete req.body.name;
    }
    if (!req.body.duration) {
      delete req.body.duration;
    }
    if (!req.body.patient) {
      delete req.body.patient;
    }
    if (!req.body.notes) {
      delete req.body.notes;
    }

    await Symptom.findByIdAndUpdate(req.params.id, req.body);
    return response.returnTrue(req, res, "Update successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
