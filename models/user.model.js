const mongoose = require("mongoose");
const moment = require("moment");
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  refreshToken: String,
  earning: {
    type: Object,
    default: {
      totalMoneyEachYear: [
        {
          year: moment().year(),
          months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      transactions: []
    }
  },
  spending: {
    type: Object,
    default: {
      totalMoneyEachYear: [
        {
          year: moment().year(),
          months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      transactions: []
    }
  }
});
var User = mongoose.model("User ", userSchema, "users");
module.exports = User;
