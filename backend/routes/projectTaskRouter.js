const express = require('express');
const { addProject, getProject } = require('../controller/projectTaskControl');
const { route } = require('./trackerData');
const router = express.Router();

router.post('/project',addProject)
router.get('/viewProject',getProject)

module.exports = router;