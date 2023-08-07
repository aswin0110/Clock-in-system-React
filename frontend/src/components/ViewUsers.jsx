import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './styles/addUser.css'
import axios from 'axios'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from './AddUser'

const ViewUsers = () => {
    const [users,setUsers] = useState([])
    const [singleVal,setSingleVal] = useState([])
    const [update,setUpdate] = useState(false)
    useEffect(()=>{
        
        axios.get('http://localhost:3005/users/employees')
        .then((res)=>{
            // console.log('then-->',res.data.data)
            setUsers(res.data.data)
        })
        .catch((err)=>{console.log(err)})
    },[])
    
    const removeEmployee = (id)=>{
        console.log('id-->',id);
        // console.log('email-->',email);
        // axios.delete('http://localhost:3005/users/deleteEmployee',email)
        axios.delete('http://localhost:3005/users/deleteEmployee/'+id)
        .then(()=>{
            alert("Deleted")
            window.location.reload(false)
        })
        .catch((err)=>{console.log(err)})

    }

    const updateEmployee = (val)=>{
        console.log('clicked')
        // console.log(val.email);
        setUpdate(true)
        setSingleVal(val)
    }

    var finaljsx = 
    <Grid container class='main'>
            <Card style={{padding:'25px',height:'30em', paddingLeft:'20px', paddingRight:'20px'}}>
            <card class='cardHead' style={{paddingBottom:'20px'}}>
                
                <div style={{display:'flex'}}>
                    <Button variant='contained' color='success' startIcon={<KeyboardReturnIcon/>}>
                        <Link to={'/adminHome'} style={{textDecoration:'none',color:'white'}}>back</Link>
            
                     </Button>

                </div>
                
                <div style={{paddingLeft:'20px'}}>
                  {/* <Button>
                    <Link to={'/addUser'} style={{textDecoration:'none',color:'black'}}>Add user</Link>
                  </Button> */}
                </div>
                <div style={{paddingLeft:'20px'}}>
                  {/* <Card style={{padding:'5px'}}>
                    <Button variant='contained' onClick={toggleModals}>Edit</Button>

                  </Card> */}
                  <Button variant='contained' color='success'>
                        <Link to={'/addUser'} style={{textDecoration:'none',color:'white'}}>Add user</Link>
            
                     </Button>

                </div>
              </card>
              <TableContainer x={{ maxHeight: 350,minHeight:350 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align={'left'} style={{ minWidth:'200px' }}>
                                <Typography>Employee Name</Typography>
                            </TableCell> */}
                            <TableCell>
                                <Typography>EmployeeID</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>Email</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>Designation</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>Mobile NO</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((val,index)=>{
                            return(
                                <TableRow>
                                    <TableCell>{val.employeeId}</TableCell>
                                    <TableCell>{val.email}</TableCell>
                                    <TableCell>{val.uname}</TableCell>
                                    <TableCell>{val.designation}</TableCell>
                                    <TableCell>{val.mobileNo}</TableCell>
                                    <TableCell>
                                        {/* <Button variant='contained'>Update</Button>&nbsp; */}
                                        <IconButton>
                                            <EditIcon color='success' onClick={()=>{updateEmployee(val)}}/>
                                        </IconButton>
                                        {/* <Button variant='contained'>Delete</Button> */}
                                        <IconButton>
                                            {/* <DeleteIcon color='error' onClick={()=>{removeEmployee(val.email)}}/> */}
                                            <DeleteIcon color='error' onClick={()=>{removeEmployee(val._id)}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                
                            )
                        })}
                    </TableBody>

                </Table>

              </TableContainer>

            </Card>

        </Grid>
        if(update) finaljsx = <AddUser data = {singleVal} method = 'put'/>
  return (
    <div className='homeMain'>
        {finaljsx}        

    </div>
  )
}

export default ViewUsers