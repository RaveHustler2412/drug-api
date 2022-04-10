const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_id: {
    type: String,
  },
    password: {
        type: String,
    }
  
});

module.exports = mongoose.model("User", userSchema);
