const express = require('express');
const { getUsers, addUser } = require('../controller/userController');
const router = express.Router();

router.get('/',getUsers);
router.post('/',addUser);


//exporting
module.exports = router;