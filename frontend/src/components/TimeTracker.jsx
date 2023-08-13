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
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
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

  const [reload, setReload] = useState(false)
  useEffect(()=>{

    let emailStorage = localStorage.getItem('email')
      axios.get(`/api/table/${emailStorage}` )
      .then((res)=>{
        console.log('test below');
        console.log(res.data.data[res.data.data.length - 1]._id);
        
          setValuesinp(res.data.data)
          
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },[reload])

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
    // console.log(inp);
  }

  const emailId = localStorage.getItem('email')
  const [lastId, setLastId] = useState([])

  const readHandler = () =>{
    setTimerActive(true);

    console.log(inp);
    

    axios.post('/api/addEmployerStatus', inp)
    .then((res)=>{
      console.log(res);
      if(res.data.status==='1'){
      alert(res.data.message)
      setLastId(res.data.lData._id);
      console.log("id:   " +lastId);
      // const lastID = res.data.lData._id
      
      setReload(prevState => !prevState);
        
      }
      else if(res.data.status=== '2'){
        alert(res.data.message)
        
      }
    })
    .catch(err=>console.log(err))

  }

  // const restart = () =>{

  //   setSeconds(0);
  //   setMinutes(0);
  //   setTimerActive(true);
  //   console.log('clicked');

  // }
  // const [dataList, setDataList] = useState([]);

  const stop = () =>{
    
    console.log('last SDAJKHBFVCSDB '+lastId);
    
      const newObj = {
        _id: lastId,
        timerMinutes: minutes,
        timerSeconds: seconds
      };
// console.log(newObj);

    console.log('clicked '+ minutes + ' : ' + seconds);
    // console.log(lastID);
    axios.put(`/api/addEmployerStatus`,newObj)
    .then((res)=>{
      console.log(res);
      setSeconds(0);
      setMinutes(0);
      setTimerActive(false);
      setReload(prevState => !prevState);


    })
  }

  // values in table

  


  return (
    <div className='homeMain'>
        <Grid container className='mains'>
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
              <Card className='cardHead' style={{paddingBottom:'20px'}}>
                
                <div style={{display:'flex'}} >{emailId} &nbsp; <AccountCircleIcon/></div>
                
                <div style={{paddingLeft:'20px'}}>Date</div>
                <div style={{paddingLeft:'20px'}}>
                  <Card style={{padding:'5px'}}>
                  <IconButton color='secondary' size="small"> <TimerIcon /> {minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+ seconds: seconds}</IconButton>
                  </Card>

                </div>
              </Card> 
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

                        <IconButton color='secondary' size="large" onClick={readHandler}> <PlayCircleIcon /> </IconButton>
                        {/* <IconButton   color='secondary' size="large"> <PauseCircleIcon /> </IconButton> */}
                        <IconButton color='secondary' size="large" onClick={stop} > <StopCircleIcon /> </IconButton>
                        {/* <IconButton color='secondary' size="large"> Restart<StopCircleIcon onClick={restart} /> </IconButton> */}
                      
                        
                        

                      </Card>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {valuesinp.map((val,i)=>{
                      return(
                        <TableRow key={i}>
                          {/* <TableCell>{val._id}</TableCell> */}
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