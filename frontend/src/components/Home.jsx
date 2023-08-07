import { Grid, Typography } from '@mui/material'
import React from 'react'
import './styles/home.css'

const Home = () => {
  return (
    <Grid class='homeMain'style={{paddingTop:'90px'}}> 
        <Grid container
           spacing={2} class='main' >
          
          <Grid item xs={8} style={{textAlign:'initial'}} class='left'>
              <Typography class='lHead' variant='h2'>Your life's work, <br></br> powered by our life's work</Typography>
                <Typography class='lContent'>A unique and powerful software suite to transform the way you work</Typography>
            </Grid>

            <Grid item xs={4} class='right'>
            
                  <Typography variant='h3'>Features</Typography>
                        <ul style={{listStyleType:'none', textAlign: 'start'}}>
                        <li>Tract Time</li>
                        <li>Custome Project adding</li>
                        <li>Custome Task adding</li>
                        <li>Custome Job Description adding</li>
                        </ul>
                
            </Grid>
  
            
        </Grid>
    </Grid>
  )
}

export default Home