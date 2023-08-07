const express = require('express');
const { getEmpDetails } = require('../controller/empDetailsControl');
const router = express.Router();

router.post('/userTimeTracker',getEmpDetails)

//exporting
module.exports = router;