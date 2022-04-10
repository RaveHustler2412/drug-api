const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
//   product_url: {
//     type: String,
//   },
//     MID: {
//         type: String,
//     },
    product_id: {
        type: String,
    }
  
});

module.exports = mongoose.model("Manufacturedb", productSchema);
