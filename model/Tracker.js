const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({

    org_code: {
        type: String,
    },
    emp_code:{
        type:String
    },
    // product_id:{
    //     type:String
    // },
    status_code:{
    type:String
    },
    rawData:{
        type:String
    }
  
});

module.exports = mongoose.model("trackerdb", trackerSchema);
