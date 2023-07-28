import { Autocomplete,  Card, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField  } from '@mui/material'
import React from 'react'
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
                
                <div style={{display:'flex'}}>Employer Name <AccountCircleIcon/></div>
                
                <div style={{paddingLeft:'20px'}}>Date</div>
                <div style={{paddingLeft:'20px'}}>
                  <Card style={{padding:'5px'}}>
                  <IconButton color='secondary' size="small"> <TimerIcon /> Timer</IconButton>
                  </Card>

                </div>
              </card> 
              <TableContainer sx={{ maxHeight: 350 }}>
                <Table  stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align={'left'} style={{ minWidth:'200px' }}>
                        <Autocomplete id="free-solo-demo" freeSolo 
                        options={taskValue.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params} label='Project' /> }>

                        </Autocomplete>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                        <Autocomplete id="free-solo-demo" freeSolo 
                        options={projectValues.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params} label='Task' /> }>

                        </Autocomplete>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                        <TextField id="outlined-basic" label="Job Description" variant="outlined" />
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'200px' }}>
                      <Autocomplete id="free-solo-demo" freeSolo 
                        options={modeofworkValue.map((option)=>option.title )}
                        renderInput={(params)=> <TextField {...params} label='Mode of Work' /> }>

                        </Autocomplete>
                      </TableCell>
                      <TableCell align={'right'} style={{ minWidth:'20px' }}>
                      {/* <Button variant="contained" color="success"> Start </Button> */}
                      <Card style={{padding:'5px'}}>

                        <IconButton color='secondary' size="large"> <PlayCircleIcon /> </IconButton>
                        <IconButton color='secondary' size="large"> <PauseCircleIcon /> </IconButton>
                        <IconButton color='secondary' size="large"> <StopCircleIcon /> </IconButton>

                        
                        

                      </Card>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                    <TableCell>value</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
              
            </Card>
            
        </Grid>
    </div>
  )
}

export default TimeTracker