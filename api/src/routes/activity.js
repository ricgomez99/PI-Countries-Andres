const { Router } = require("express");
const {
  createActivity,
  getActivities,
} = require("../controllers/activities.controllers");
const router = Router();

router.get("/activities", getActivities);
router.post("/activities", createActivity);

module.exports = router;
