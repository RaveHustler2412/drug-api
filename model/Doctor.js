const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    doctor_id: {
        type: String,
    },
    password: {
        type: String,
    },
    private_key: {
        type: String,
    }
  
});

module.exports = mongoose.model("doctordb", doctorSchema);
