const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");

const vocabularyValidateion = require("../validations/vocabulary.validation");
const vocabularyController = require("../controllers/vocabulary.controller");

router.get("/", vocabularyController.getVocabulary);
router.post("/",
  celebrate({ body: vocabularyValidateion.vocabularySchema }, { abortEarly: false }),
  vocabularyController.postVocabulary
);
router.delete("/:id", vocabularyController.deleteVocabulary);
router.patch("/", vocabularyController.patchVocabulary);

module.exports = router;
