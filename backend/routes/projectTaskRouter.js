const express = require('express');
const { addProject, getProject, addTask, getTask } = require('../controller/projectTaskControl');
const { route } = require('./trackerData');
const router = express.Router();

router.post('/project',addProject)
router.get('/viewProject',getProject)
// router.post('/task',addTask)
router.post('/task',addTask)
router.get('/task',getTask)

module.exports = router;