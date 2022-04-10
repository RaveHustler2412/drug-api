const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

   patient_name: {
         type: String,
        },
    patient_id: {
        type: String,
    },
    Medicine: {
        type: String,
    },
    Dosage: {
        type: String,
    },
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    private_key: {
        type: String,
    },
    doctor_id: {
        type: String,
    },
  
});

module.exports = mongoose.model("patientdb", patientSchema);
