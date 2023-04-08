

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useLocation } from 'react-router-dom';

const Confirmation = () =>{
  
  const [confirmation, setConfirmation] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false);
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const confirmationError = confirmation === ''&& formSubmitted;
  const navigate = useNavigate();

 const HandleSubmit =  async (e) =>{
  e.preventDefault();
  if (confirmation === ''  ) {
    setFormSubmitted(true);
  }
  try {
    await Auth.confirmSignUp(username, confirmation);
    navigate('/'); 
  } catch (error) {
    confirmationError(true);
    console.error(error);
  }
 }

  return (
    <div className="App" >
      <header className="App-header">
        <form > 
        <Grid container alignItems="center"  direction="column">
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '25ch' },
        display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
      }}
      noValidate
      autoComplete="off"
    >
            <Grid item>
            <TextField
              id="outlined-multiline"
              label="Confirmation Code"
              type="password"
              value={confirmation}
              error={confirmationError}
              onChange={(e) => setConfirmation(e.target.value)}
              helperText={confirmationError ? 'This field is required' : ''}
            />  
          </Grid>
          <Grid item >
          <Button type="submit" onClick={HandleSubmit}>Submit</Button>
          </Grid>
          </Box>
        </Grid>
        </form>
      </header>
    </div>
  );
}

export default Confirmation;
