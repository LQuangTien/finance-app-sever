const mongoose = require("mongoose");
const moment = require("moment");
var yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    default: moment().year()
  },
  months: {
    type: Array,
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
});
var Year = mongoose.model("Year ", yearSchema);
module.exports = Year;
