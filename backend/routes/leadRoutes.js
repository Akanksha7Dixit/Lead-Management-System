const express = require("express");

const router = express.Router();

const {
  addLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} = require("../controllers/leadController");


router.post("/", addLead);

router.get("/", getLeads);

router.put("/:id", updateLeadStatus);

router.delete("/:id", deleteLead);


module.exports = router;