const express = require('express');
const { getUsers, addUser, getEmployees } = require('../controller/userController');
const router = express.Router();

router.get('/',getUsers);
router.post('/',addUser);
router.get('/employees',getEmployees)


//exporting
module.exports = router;