const express = require('express');
const { userLogin } = require('../controller/userController');
const router = express.Router();

router.post('/',userLogin);

//exporting
module.exports = router