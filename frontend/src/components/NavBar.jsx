import { Alert, AppBar, Box, Button, CssBaseline, Fab,  TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './styles/login.css'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [modal,setModal] = useState(false);
    const navigate = useNavigate()
    const [userData,setUserData] = useState({})
    // const [inp,setInp] = useState({email:'',password:''})
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail,setIsValidEmail] = useState(true)
    const [isValidPassword,setIsValidPassword] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    // const inputHandler = (e) =>{
    //     const {name,value} = e.target;
    //     setInp((prev)=>({prev,[name]:value}))
    //     console.log(inp)
    //     // console.log(e.target.value)

    // }
    const toggleModal = () => {
        setModal(!modal);
      };
    const loginUser = async()=>{
      // console.log(email)
      // console.log(password)
      await axios.post('http://localhost:3005/login',{email,password})
        .then(async(res)=>{
          if(res.status===200){
            console.log('user type',res.data.data.user.userType)
            console.log('Email--->',res.data.data.user.email)
            console.log(res.data.status)
            console.log('token----->',res.data.data.token)
            
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('email', res.data.data.user.email)

            console.log('userData---->',res.data.data.user)
            console.log('type-->',res.data.data.user.userType)
            setIsLoggedIn(true)
            // await setUserData(res.data.data)
            await setUserData(res.data.data.user)
            setModal(!modal);
            setIsValidEmail(true)
            setIsValidPassword(true)
            if(res.data.data.user.userType==='EMPLOYEE'){
              console.log('inside then',userData)
              // setFlag(true)  
              navigate('/tracker')
            }
            if(res.data.data.user.userType==='ADMIN'){
              navigate('/adminHome')
            }
            
            
          }
          if(res.status===401){
            console.log(res.status)
            // console.log(res.data.status);
          }
          if(res.status===500){
            console.log(res.status)
            // console.log(res.data.status)
          }
          
          

        })
        .catch((err)=>{
          console.log(err)
          console.log(err.message)
          alert('Invalid Email or Password')
          console.log('invalid login')
          setIsValidEmail(false)
          setIsValidPassword(false)
        })
        // console.log(userData.email)
        
        // setModal(!modal);
        
        
        
    }
    // useEffect(() => {
    //   console.log(userData); // This will now log the updated value of userData
    // }, [userData]);
    // console.log("user data",userData)
    
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
    const logout = ()=>{
      console.log('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      setIsLoggedIn(false)
      navigate('/')
    }
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
                    <Button variant='contained' onClick={toggleModal} disabled={isLoggedIn} >
                    {isLoggedIn ? "Logged In" : "Login"}

                    </Button> &nbsp;
                    {isLoggedIn && (
                      <Button variant='contained' onClick={logout}>
                      Logout
                    </Button>

                    )}
                    

                </Box>
                
                
            </Toolbar>

        </AppBar>
        </ThemeProvider>
        
        
        {modal && (
            // <LoginPage/>
            <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content"> <br /><br />
            <TextField id="outlined-required" required name='email' value={email} InputLabelProps={{
                shrink: true,
            }} 
            
            label='Email' placeholder='Email'
            className={isValidEmail ? '': 'red-border'}
             
            onChange={(e) => setEmail(e.target.value)}
            variant='outlined'/>
            <br /><br />
            <TextField type='password' required name='password' value={password} 
            
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
                shrink: true,
              }}
              className={isValidPassword ? '': 'red-border'}
               label='Password' placeholder='Password'/>
            <br /><br />
            <Button variant='text' onClick={loginUser}  color='success' >
              
              {/* <Link to={'/tracker'} style={{textDecoration:'none',color:'green'}}>
                Login
              </Link> */}
              Login
            </Button>
            
            <Fab color="error" aria-label="add"
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