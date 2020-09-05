const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocabularySchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  vocabulary: String,
  meaning: String,
  type: String,
  description: {
    type: String,
    default: "No description"
  }
});
const Vocabulary = mongoose.model("Vocabulary", vocabularySchema, "vocabulary");
module.exports = Vocabulary;
