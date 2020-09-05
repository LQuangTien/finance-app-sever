const mongoose = require("mongoose");

const Vocabulary = require("../models/vocabulary.model");
const Response = require("../helpers/response.helper");

module.exports.getVocabulary = async (req, res) => {
  const { userId } = req.tokenPayload;
  const vocabularies = await Vocabulary.find({ userId });
  if (!vocabularies.length) {
    return Response.error(res, { message: "No vocabulary data" });
  }
  return Response.success(res, { vocabularies });
};
module.exports.postVocabulary = async (req, res) => {
  const { userId } = req.tokenPayload;
  const id = mongoose.Types.ObjectId(userId);
  const newVocabulary = new Vocabulary({
    userId: id,
    ...req.body
  });
  await newVocabulary.save();
  return Response.success(res, { message: "Submit Complete" }, 202);
};
module.exports.deleteVocabulary = async (req, res) => {
  const { id } = req.params;
  await Vocabulary.findOneAndDelete({ _id: id });
  return Response.success(res, { message: "Delete Complete" }, 202);
};
module.exports.patchVocabulary = async (req, res) => {
  const { _id, vocabulary, meaning, type, description} = req.body;
  await Vocabulary.findOneAndUpdate({ _id }, { $set: { vocabulary, meaning, type, description } });
  return Response.success(res, { message: "Edit Complete" }, 202);
};
