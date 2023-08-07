const express = require('express');
const { getUsers, addUser, getEmployees, addEmployee, deleteEmployee, updateEmployee } = require('../controller/userController');
const router = express.Router();

router.get('/',getUsers);
router.post('/',addUser);
router.post('/addEmployee',addEmployee)
router.get('/employees',getEmployees)
router.delete('/deleteEmployee/:id',deleteEmployee)
router.put('/updateEmployee/:id',updateEmployee)


//exporting
module.exports = router;