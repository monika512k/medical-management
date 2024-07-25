const express = require("express");
const router = express.Router();
const diagnosisController = require("../controller/diagnosisController");
const labTestController = require("../controller/labTestController");
const followUpAppointmentController = require("../controller/followUpAppointmentController");
const symptomController = require("../controller/symptomController");
const drugPrescriptionController = require("../controller/drugPrescriptionController");
const patientController = require("../controller/patientController");
const middleware = require("../middleware/auth");

// diagnosis routes start
router.post(
    "/addDiagnosis",
    middleware.authenticateToken,
    diagnosisController.addDiagnosis
  )
  router.delete(
    "/deleteDiagnosis/:id",
    middleware.authenticateToken,
    diagnosisController.deleteDiagnosis
  )
  router.get(
    "/getAllDiagnosis",
    middleware.authenticateToken,
    diagnosisController.getAllDiagnosis
  )
  router.put(
    "/updateDiagnosis/:id",
    middleware.authenticateToken,
    diagnosisController.updateDiagnosis
  )
  // diagnosis routes end

  // drug prescription routes start 
  router.post(
    "/addDrugPrescription",
    middleware.authenticateToken,
    drugPrescriptionController.addDrugPrescription
  )
  router.delete(
    "/deleteDrugPrescription/:id",
    middleware.authenticateToken,
    drugPrescriptionController.deleteDrugPrescription
  )
  router.get(
    "/getAllDrugPrescription",
    middleware.authenticateToken,
    drugPrescriptionController.getAllDrugPrescription
  )
  router.put(
    "/updateDrugPrescription/:id",
    middleware.authenticateToken,
    drugPrescriptionController.updateDrugPrescription
  )
//  drug prescription routes end 

 // lab test routes start 
 router.post(
  "/addLabTest",
  middleware.authenticateToken,
  labTestController.addLabTest
)
router.delete(
  "/deleteLabTest/:id",
  middleware.authenticateToken,
  labTestController.deleteLabTest
)
router.get(
  "/getAllLabTests",
  middleware.authenticateToken,
  labTestController.getAllLabTests
)
router.put(
  "/updateLabTest/:id",
  middleware.authenticateToken,
  labTestController.updateLabTest
)
//  lab test routes end 

 // appointment routes start 
 router.post(
  "/addAppointment",
  middleware.authenticateToken,
  followUpAppointmentController.addAppointment
)
router.delete(
  "/deleteAppointment/:id",
  middleware.authenticateToken,
  followUpAppointmentController.deleteAppointment
)
router.get(
  "/getAllAppointments",
  middleware.authenticateToken,
  followUpAppointmentController.getAllAppointments
)
router.put(
  "/updateAppointment/:id",
  middleware.authenticateToken,
  followUpAppointmentController.updateAppointment
)
//  appointment routes end 


 // symptom routes start 
 router.post(
  "/addSymptom",
  middleware.authenticateToken,
  symptomController.addSymptom
)
router.delete(
  "/deleteSymptom/:id",
  middleware.authenticateToken,
  symptomController.deleteSymptom
)
router.get(
  "/getAllSymptom",
  middleware.authenticateToken,
  symptomController.getAllSymptom
)
router.put(
  "/updateSymptom/:id",
  middleware.authenticateToken,
  symptomController.updateSymptom
)
//  symptom routes end 


 // drug prescription routes start 
 router.post(
  "/addDrugPrescription",
  middleware.authenticateToken,
  drugPrescriptionController.addDrugPrescription
)
router.delete(
  "/deleteDrugPrescription/:id",
  middleware.authenticateToken,
  drugPrescriptionController.deleteDrugPrescription
)
router.get(
  "/getAllDrugPrescription",
  middleware.authenticateToken,
  drugPrescriptionController.getAllDrugPrescription
)
router.put(
  "/updateDrugPrescription",
  middleware.authenticateToken,
  drugPrescriptionController.updateDrugPrescription
)
//  drug prescription routes end 
  
// patient routes start
router.post(
  "/addPatient",
  middleware.authenticateToken,
  patientController.addPatient
)
router.delete(
  "/deletePatient/:id",
  middleware.authenticateToken,
  patientController.deletePatient
)
router.get(
  "/getPatientById/:id",
  middleware.authenticateToken,
  patientController.getPatientById
)
router.get(
  "/getAllPatients",
  middleware.authenticateToken,
  patientController.getAllPatients
)
router.put(
  "/updatePatient/:id",
  middleware.authenticateToken,
  patientController.updatePatient
)
// end 
module.exports = router;
