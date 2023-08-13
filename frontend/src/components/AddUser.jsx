import { Button, Card, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/addUser.css'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';

const AddUser = (props) => {
    const [inp,setInp] = useState(props.data)
    const navigate = useNavigate()
    const inpHandler = (e)=>{
        const {name,value} = e.target;
        setInp((prev)=>({...prev,[name]:value}))
        console.log(inp);
    }

    const addUser = ()=>{
        console.log('add clicked')
        console.log(inp)
        if(props.method == 'post'){
            axios.post('/api/users/addEmployee',inp)
            .then((res)=>{
                if(res.status === 201){
                alert('Employee successully added')
                setInp({email:'',password:'',uname:'',designation:'',mobileNo:''})
                navigate('/viewUsers')
                }
            })
            .catch((err)=>{console.log(err)})
        }
        if(props.method == 'put'){
            axios.put('/api/users/updateEmployee/'+inp._id,inp)
            .then(()=>{
                alert("Updated")
                window.location.reload(false)
             })
             .catch((err)=>{console.log(err)})
        }
    }
  return (
    <div className='homeMain'>
        {/* <Button >
                        <Link to={'/adminHome'} style={{textDecoration:'none',color:'black'}}>back</Link>
            
                     </Button> */}
        <Grid container class='main'>
        
            <Card style={{padding:'25px',height:'30em', paddingLeft:'20px', paddingRight:'20px'}}>
            <card class='cardHead' style={{paddingBottom:'20px'}}>
                
                <div style={{display:'flex'}}>
                    <Button variant='contained' color='success' startIcon={<KeyboardReturnIcon/>}>
                        <Link to={'/adminHome'} style={{textDecoration:'none',color:'white'}}>Back</Link>
            
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

                </div>
              </card>
              <Grid container spacing={2} rowSpacing={1} sx={{width:'50em'}}>
                <Grid xs={6} md={6}>
                    
                    <TextField
                    required id='standard-required' name='email' onChange={inpHandler} value={inp.email}  variant='standard' label='Email'  placeholder='Email' />

                </Grid>
                <Grid xs={6} md={6}>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name='madate' label='Released Date' slotProps={{ textField: { variant: 'standard' } }} />

                    </LocalizationProvider> */}
                    {/* <Typography variant='h6'>Release Date</Typography> */}
                    {/* <TextField 
                    variant='standard' name='mdate'  placeholder='' label='Released Date' type='date' 
                     margin="normal" sx={{width:'200px'}} InputLabelProps={{shrink: true,}}
                    /> */}
                    <TextField
                    required id='standard-required' name='uname' onChange={inpHandler} value={inp.uname}  variant='standard' label='name'  placeholder='Name' />
                    

                </Grid>
                <Grid xs={6} md={6}>
                <TextField 
                required id='standard-required' name='password' onChange={inpHandler} value={inp.password} variant='standard' label='Password' placeholder='Password'/>

                </Grid>
                <Grid xs={6} md={6}>
                <TextField 
                required id='standard-required' name='designation' onChange={inpHandler} value={inp.designation}  label='Designation' variant='standard' placeholder='Designation'/>

                </Grid>
                <Grid xs={12} md={12}>
                <TextField
                required id='standard-required' name='mobileNo' value={inp.mobileNo} onChange={inpHandler}  label='Mobile No' variant='standard' placeholder='Mobile No'/>

                </Grid>
                {/* <Grid xs={6} md={6}>
                <TextField
                required id='standard-required' name='mproducer'  label='Producer' variant='standard' placeholder='Producer'/>

                </Grid> */}
                {/* <Grid xs={6} md={6}>
                <TextField
                required id='standard-required' name='mdirector'  label='Director' variant='standard' placeholder='Director'/>

                </Grid>
                <Grid xs={6} md={6}>
                <TextField
                required id='standard-required' name='mlang'  label='Language' variant='standard' placeholder='Language'/>

                </Grid><br /><br /> */}
                <br /><br /><br />
                <Grid xs={12} md={12}>
                <Button variant='elevated' onClick={addUser} sx={{borderRadius:'12px'}}>
                    Add
                </Button>

                </Grid>

            </Grid>

            </Card>
        </Grid>
        
    </div>
  )
}

export default AddUser