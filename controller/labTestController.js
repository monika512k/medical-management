const constants = require("../config/constants");
const response = require("../config/response");
const LabTest = require("../model/LabTest");
const mongoose = require("mongoose");
const { Validator } = require("node-input-validator");
const helper = require("../helper/helper");

module.exports.getAllLabTests = async (req, res) => {
  try {
    const getList = await LabTest.aggregate([
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
          isRepeat: 1,
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

module.exports.addLabTest = async (req, res) => {
  try {
    let v = new Validator(req.body, {
      name: "required|string",
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

    const newLabTest = new LabTest(req.body);
    await newLabTest.save();
    return response.returnTrue(
      req,
      res,
      "Lab test added successfully",
      []
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteLabTest = async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    await LabTest.findByIdAndUpdate(Id, { isDeleted: true });
    return response.returnTrue(req, res, "Deleted Successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateLabTest = async (req, res, next) => {
  try {
    if (!req.body.name) {
      delete req.body.name;
    }
    if (!req.body.patient) {
      delete req.body.patient;
    }
    if (!req.body.isRepeat) {
      delete req.body.isRepeat;
    }
    if (!req.body.notes) {
      delete req.body.notes;
    }
   

    await LabTest.findByIdAndUpdate(req.params.id, req.body);
    return response.returnTrue(req, res, "Update successfully", []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
