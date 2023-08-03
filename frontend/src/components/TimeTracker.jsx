import { Autocomplete,Card, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './styles/timeTracker.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
// import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import TimerIcon from '@mui/icons-material/Timer';


const TimeTracker = () => {
  const projectValues = [
    {title:'Academic'},
    {title:'Corporate'},
    {title:'Government'},
    {title:'Knowledge Office'},
    {title:'Retail'},
  ]

  const taskValue =[
    {title:'Training'},
    {title:'Meetings & Discussions'},
    {title:'Lark Activity'},
    {title:'Content Development'}
  ]

  const modeofworkValue = [
    {title:'Work from Office'},
    {title:'Work from Home'}
  ]
  // const click = () =>{
  //   console.log('working')
  // }
  

  
  
  const [seconds, setSeconds]= useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // const startTimer = () => {
  //   setTimerActive(true);
  // };

  const [valuesinp, setValuesinp] = useState([])

  var timer;
  useEffect((timer)=>{

    if(timerActive){
      timer = setInterval(()=>{
        setSeconds(seconds+1)
        if(seconds===59){
          setMinutes(minutes+1);
          setSeconds(0);
        }
      },1000)
  
      return ()=> clearInterval(timer);
  
    }

    
      
    

    

    
  });

  useEffect(()=>{
    let emailStorage = localStorage.getItem('email')
      axios.get(`http://localhost:3005/api/table/${emailStorage}` )
      .then((res)=>{
        // console.log(res);
        if (Array.isArray(res.data.data)) {
          setValuesinp(res.data.data)
          
        } else {
          console.error('Data is not an array:', res.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  })
  var [inp,setInpu] = useState({
    employerEmail:localStorage.getItem('email'),
    project:"",
    task:"",
    jobDescription:"",
    modeOfWork:"",
    timerMinutes:minutes,
    timerSeconds:seconds
  })

  const inputHandler = (e)=>{
    const {name, value}= e.target;
    setInpu((inp)=>({...inp,[name]:value}));
    console.log(inp);
  }

  const emailId = localStorage.getItem('email')

  const readHandler = () =>{
    setTimerActive(true);

    console.log('Button Clicked: '+inp.task);
    axios.post('http://localhost:3005/api/addEmployerStatus', inp)
    .then((res)=>{
      console.log(res);
      if(res==='1'){
      alert('timer started')
        
      }
      else{
        alert('timer not started')
        
      }
    })
    .catch(err=>console.log(err))

  }

  const restart = () =>{

    setSeconds(0);
    setMinutes(0);
    setTimerActive(true);
    console.log('clicked');

  }

  const stop = () =>{
    setSeconds(0);
    setMinutes(0);
    setTimerActive(false);

    console.log('clicked '+ minutes + ' : ' + seconds);
  }

  // values in table

  


  return (
    <div class='homeMain'>
        <Grid container class='main'>
            {/* <Typography variant='h1'> Tracker</Typography> */}

            {/* <Card>
              
            <List  component="nav" aria-label="mailbox folders">
              
                <ListItem button>
                <DashboardCustomizeOutlinedIcon/> <ListItemText primary=" Dashboard" /></ListItem> 
              
              <Divider />
              
                <ListItem  tItem button divider>
                <WorkHistoryOutlinedIcon/><ListItemText primary=" Work History" /></ListItem>
              
            </List>
            </Card> */}
            <Card  style={{padding:'25px', paddingLeft:'20px', paddingRight:'20px'}}>
              <card class='cardHead' style={{paddingBottom:'20px'}}>
                
                <div style={{display:'flex'}} >{emailId} &nbsp; <AccountCircleIcon/></div>
                
                <div style={{paddingLeft:'20px'}}>Date</div>
                <div style={{paddingLeft:'20px'}}>
                  <Card style={{padding:'5px'}}>
                  <IconButton color='secondary' size="small"> <TimerIcon /> {minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+ seconds: seconds}</IconButton>
                  </Card>

                </div>
              </card> 
              <TableContainer sx={{ maxHeight: 350 }}>
                <Table  stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align={'left'} style={{ minWidth:'200px' }}>
                        <Autocomplete id="free-solo-demo" freeSolo name='project' onChange={(event, newValue) => {
                        inputHandler({
                          target: {
                            name: 'project',
                            value: newValue,
                          },
                        });
                      }}  value={inp.project}
                        options={taskValue.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params}  label='Project' /> }>

                        </Autocomplete>
                      </TableCell>


                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                        <Autocomplete id="free-solo-demo" freeSolo name='task'  onChange={(event, newValue)=>{
                          inputHandler({
                            target:{
                              name:'task',
                              value:newValue,
                            }
                          });
                        }} value = {inp.task}
                        options={projectValues.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params}  label='Task' /> }>

                        </Autocomplete>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                        <TextField id="outlined-basic" name='jobDescription' value={inp.jobDescription} onChange={inputHandler} label="Job Description" variant="outlined" />
                      </TableCell>

                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                      <Autocomplete id="free-solo-demo" freeSolo name='modeOfWork'  onChange={(event, newValue)=>{
                        inputHandler({
                          target:{
                            name:'modeOfWork',
                            value:newValue,
                          }
                        });
                      }} value={inp.modeOfWork}
                        options={modeofworkValue.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params}  label='Mode of Work' /> }>

                        </Autocomplete>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'20px' }}>
                      {/* <Button variant="contained" color="success"> Start </Button> */}
                      <Card style={{padding:'5px'}}>

                        <IconButton color='secondary' size="large"> <PlayCircleIcon onClick={readHandler}/> </IconButton>
                        <IconButton   color='secondary' size="large"> <PauseCircleIcon /> </IconButton>
                        <IconButton color='secondary' size="large"> <StopCircleIcon onClick={stop} /> </IconButton>
                        <IconButton color='secondary' size="large"> Restart<StopCircleIcon onClick={restart} /> </IconButton>
                      
                        
                        

                      </Card>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {valuesinp.map((val,i)=>{
                      return(
                        <TableRow key={i}>
                          <TableCell>{val.project}</TableCell>
                          <TableCell>{val.task}</TableCell>
                          <TableCell>{val.jobDescription}</TableCell>
                          <TableCell>{val.modeOfWork}</TableCell>
                          <TableCell>{val.timerMinutes }: {val.timerSeconds}</TableCell>
                        </TableRow>
                      )
                    })}


                  </TableBody>
                </Table>
              </TableContainer>
              
            </Card>
            
        </Grid>
    </div>
  )
}

export default TimeTracker