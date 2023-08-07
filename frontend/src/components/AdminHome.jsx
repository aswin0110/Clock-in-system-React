import React, { useEffect, useState } from 'react'
import './styles/adminHome.css'
import { Box, Card, Grid, TableBody, TableCell, Typography,TableContainer,Table,TableHead,TableRow,TextField, IconButton,Autocomplete, Button, Fab } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const AdminHome = () => {
    const [users,setUsers] = useState([])
    const [showOptions, setShowOptions] = useState(false);
    const [modals,setModals] = useState(false);
    const [details,setDetails] = useState([])
    const [inpProject,setInpProject] = useState()
    const [inpTask,setInpTask] = useState()
    // const [userDetails,setUserDetails] = useState([])
    // const [inp,setInp] = useState({email:''})
    // const [email,setEmail] = useState('')
    const [project,setProject] = useState([])
    const [task,setTask] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3005/users/employees')
        .then((res)=>{
            // console.log('then-->',res.data.data)
            setUsers(res.data.data)
        })
        .catch((err)=>{console.log(err)})
    },[])
    //project
    useEffect(()=>{
      axios.get('http://localhost:3005/add/viewProject')
      .then((res)=>{
        console.log('project status-->',res.status)
        console.log('project data-->',res.data.data)
        setProject(res.data.data)
      })
      .catch((err)=>{console.log(err)})
    },[])
    //task
    useEffect(()=>{
      axios.get('http://localhost:3005/add/task')
      .then((res)=>{
        console.log('task status-->',res.status)
        console.log('task data-->',res.data.data)
        // setProject(res.data.data)
        setTask(res.data.data)
      })
      .catch((err)=>{console.log(err)})
    },[])
    /////////////////////////////////////////add task and project
    const inputProjectHandler = (e)=>{
      setInpProject(e.target.value)
      // console.log(inpProject)
    }
    const addInputProject = ()=>{
      console.log(inpProject)
      var projectEnty = {project :inpProject}
      console.log('project entry--->',projectEnty);
      axios.post('http://localhost:3005/add/project',projectEnty)
      .then((res)=>{
        console.log(res.status);
        if(res.status==200)
        {
          alert('New project added')
        }
        console.log('project added');
      })
      .catch((err)=>{console.log(err)})
    }

    const inputTaskHandler = (e)=>{
      setInpTask(e.target.value)
      console.log(inpTask)
    }

    const addInputTask = ()=>{
      console.log(inpTask)
      var taskEnty = {task :inpTask}
      console.log('project entry--->',taskEnty);
      axios.post('http://localhost:3005/add/task',taskEnty)
      .then((res)=>{
        console.log(res.status);
        if(res.status==200)
        {
          alert('New task added')
        }
        console.log('task added');
      })
      .catch((err)=>{console.log(err)})
    }

    // console.log('data-->',users[0].email)
    const handleFilterClick = () => {
        setShowOptions(!showOptions);
      };
    
    ///----
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    //------->Project
    const toggleModals = () => {
        setModals(!modals);
      };
    
    const handleOptionChange = (event,value)=>{
        
        if(value){
            const email = value
            console.log('seleted option-----:',value)
            console.log('seleted option:',email)
            
            axios.post('http://localhost:3005/details/userTimeTracker',{email})
            .then((res)=>{
                console.log(res.status)
                console.log('res-->',res)
                console.log('data-->',res.data.data)
                console.log('project-->',res.data.data[0].project)
                setDetails(res.data.data)
                
            })
            .catch((err)=>console.log(err))


            
            
        }
    }
    
  return (
    <div className='homeMain'>
        {/* <Grid container className='main' sx={{paddingLeft:'15em'}} >
            <Box  sx={{ bgcolor: '#cfe8fc', height: '50vh',width:'80%',boxShadow:'5px 5px 25px -5px rgba(0,0,0,0.5)',borderRadius:'15px' }}>
                

            </Box>
            

        </Grid> */}
        <Grid container class='main'>
            
            <Card  style={{padding:'25px',height:'30em', paddingLeft:'20px', paddingRight:'20px'}}>
              <card class='cardHead' style={{paddingBottom:'20px'}}>
                
                <div style={{display:'flex'}}>Admin <AccountCircleIcon/></div>
                
                <div style={{paddingLeft:'20px'}}>
                  <Button>
                    <Link to={'/viewUsers'} style={{textDecoration:'none',color:'black'}}>View Employees</Link>
                  </Button>
                </div>
                <div style={{paddingLeft:'20px'}}>
                  <Card style={{padding:'5px'}}>
                    <Button variant='contained' onClick={toggleModals}>Edit</Button>

                  </Card>

                </div>
              </card> 

              <TableContainer sx={{ maxHeight: 350,minHeight:350 }}>
                <Table  stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align={'left'} style={{ minWidth:'200px' }}>
                        {/* <Autocomplete id="free-solo-demo" freeSolo 
                        options='aa'
                        renderInput={(params)=> <TextField {...params} label='Project' /> }>

                        </Autocomplete> */}
                        <Typography variant='h6'>Employee Name</Typography>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                        
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                      <Autocomplete disablePortal
                        id="combo-box-demo"
                        options={users.map((option)=>option.email)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Name" />}
                        onChange={handleOptionChange}/>
                        
                      </TableCell>
                      {/* <TableCell><Button variant='contained' onClick={readHandler}>Search</Button></TableCell> */}
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                      <Fab color="error" aria-label="add"
                        sx={{position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '5px 7px'}}
                        onClick={handleClick}
                        >
                            <FilterAltIcon />

                        </Fab>

                        <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        >
                            <MenuItem onClick={handleClose}>Day</MenuItem>
                            <MenuItem onClick={handleClose}>Weekly</MenuItem>
                            <MenuItem onClick={handleClose}>Monthly</MenuItem>
                            <MenuItem onClick={handleClose}>Yearly</MenuItem>
                        </Menu>
                        
                        
                        {/* <Button variant='contained' onClick={handleFilterClick} color='success'>
                            <FilterAltIcon />
                        </Button> */}
                        
                        {/* {showOptions &&(
                            <div className='filter-options'>
                                <Button>Day</Button>
                                <Button>Weekly</Button>
                                <Button>Monthly</Button>
                                <Button>Yearly</Button>
                            </div>
                        )} */}

                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'20px' }}>
                      {/* <Button variant="contained" color="success"> Start </Button> */}
                      {/* <Card style={{padding:'5px'}}>

                        <IconButton color='secondary' size="large"> <PlayCircleIcon /> </IconButton>
                        <IconButton color='secondary' size="large"> <PauseCircleIcon /> </IconButton>
                        <IconButton color='secondary' size="large"> <StopCircleIcon /> </IconButton>

                        
                        

                      </Card> */}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.map((val,index)=>{
                      return(
                        <TableRow>
                          <TableCell>{val.project}</TableCell>
                          <TableCell>{val.task}</TableCell>
                          <TableCell>{val.jobDescription}</TableCell>
                          <TableCell>{val.modeOfWork}</TableCell>
                          <TableCell>{val.timerMinutes}</TableCell>
                        </TableRow>
                      )
                    })}
                    {/* <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell> */}
                  </TableBody>

                </Table>
              </TableContainer>
              
            </Card>
            
        </Grid>
        
        {modals && (
            // <LoginPage/>
            <div className="modals">
                {/* <div onClick={toggleModal} 
                className="overlay"
                ></div> */}
                <div className="modals-content"> <br /><br />
                    <card class='cardHead' style={{paddingBottom:'20px'}}>
                        <div style={{paddingLeft:'20px'}}>
                            {/* <Autocomplete disablePortal
                            id="combo-box-demo"
                            options="project"
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Project" />}/> */}
                            <Autocomplete disablePortal
                            id="combo-box-demo"
                            options={project.map((option)=>option.project)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Project" />}
                            // onChange={handleOptionChange}
                            />
                            <br />
                            <TextField variant='outlined' onChange={inputProjectHandler} label='Add new project'/>
                            <br /><br />
                            <Button variant='contained' onClick={addInputProject}>Add Project</Button>
                        </div>
                
                        <div style={{paddingLeft:'20px'}}>
                            {/* <Autocomplete disablePortal
                            id="combo-box-demo"
                            options="Tasks"
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Tasks" />}/> */}

                            <Autocomplete disablePortal
                            id="combo-box-demo"
                            options={task.map((option)=>option.task)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Task" />}
                            // onChange={handleOptionChange}
                            />
                            <br />
                            <TextField variant='outlined' onChange={inputTaskHandler} label='Add new task'/>
                            <br /><br />
                            <Button variant='contained' onClick={addInputTask}>Add Task</Button>
                        </div>

                        </card>
                    
                        
                    
                    <br /><br />
                    {/* <Button variant='text'   color='success' >
                        Login
                    </Button> */}
            
                    <Fab color="error" aria-label="add"
                    sx={{position: 'absolute',
                    top: '-9px',
                    right: '-9px',
                    padding: '5px 7px'}}
                    onClick={toggleModals}
            >
                    <CloseIcon/>
                    

            </Fab>

          </div>
        </div>
        
      )}

    </div>
  )
}

export default AdminHome