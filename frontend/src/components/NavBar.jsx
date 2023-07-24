import { AppBar, Box, Button, CssBaseline, Fab, Grid, OutlinedInput, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import './styles/login.css'
import LoginPage from './LoginPage';
import CloseIcon from '@mui/icons-material/Close';

const NavBar = () => {
    const [modal,setModal] = useState(false);
    const [inp,setInp] = useState({email:'',password:''})
    const inputHandler = (e) =>{
        const {name,value} = e.target;
        setInp((prev)=>({prev,[name]:value}))
        console.log(inp)
        // console.log(e.target.value)

    }
    const toggleModal = () => {
        setModal(!modal);
      };
    
    const darkTheme = createTheme({
        palette: {
            primary : {
                light: '#757ce8',
                main: '#009688',
                dark: '#002884',
                contrastText: '#fff',
            },
        },
    })
  return (
    <Box sx={{display:'flex',backgroundColor:'#00695f'}}>
        <CssBaseline/>
        <ThemeProvider theme={darkTheme}>

        
        <AppBar component={'nav'} color='primary'>
            <Toolbar>
                <Typography variant='h5' component='div'>
                ICTAK Clock-In System
                </Typography>
                
                <Box sx={{marginLeft:'auto'}}>
                    <Button variant='contained' onClick={toggleModal} >
                        Login

                    </Button> &nbsp;
                    <Button variant='contained'>
                        Logout
                    </Button>

                </Box>
                
                
            </Toolbar>

        </AppBar>
        </ThemeProvider>
        {modal && (
            // <LoginPage/>
            <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content"> <br /><br />
            <TextField id="outlined-required" required name='email' value={inp.email} InputLabelProps={{
                shrink: true,
            }} 
            label='Email' placeholder='Email'  onChange={inputHandler} variant='outlined'/>
            <br /><br />
            <TextField type='password' required name='password' value={inp.password} onChange={inputHandler}
            InputLabelProps={{
                shrink: true,
              }}
               label='Password' placeholder='Password'/>
            <br /><br />
            <Button variant='text' color='success'>Login</Button>
            
            <Fab color="success" aria-label="add"
            sx={{position: 'absolute',
            top: '-9px',
            right: '-9px',
            padding: '5px 7px'}}
            onClick={toggleModal}
            >
            <CloseIcon/>

            </Fab>

          </div>
        </div>
        
      )}

    </Box>
    
  )
}

export default NavBar