import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';

const Login = () =>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false);
  const emailError = email === '' && formSubmitted; 
  const passwordError = password === ''&& formSubmitted;
  const navigate = useNavigate();
 
 
const HandleSubmit = async (e) =>{
  e.preventDefault();
  if (email === '' || password === '' ) {
    setFormSubmitted(true);
  }
  try {
    await Auth.signIn(email, password);
    navigate('/home');
  } catch (error) {
    console.log('error signing in', error);
    Swal.fire({
      icon: 'error',
      text: 'Incorrect Password or Username',
    });
  }    
}
const HandleNew = (e) =>{
  e.preventDefault();
  navigate('/register');
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
              id="outlined-basic"
              label="Email Id*"
              type="email"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError ? 'This field is required' : ''}
            />
          </Grid>
            <Grid item>
            <TextField
              id="outlined-multiline"
              label="Password*"
              type="password"
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError ? 'This field is required' : ''}
            />  
          </Grid>
          <Grid item >
          <Button type="submit" onClick={HandleSubmit}>Submit</Button>
          <Button type="submit" onClick={HandleNew}>Create New Account</Button>
          
          </Grid>
          </Box>
        </Grid>
        </form>
      </header>
    </div>
  );
}

export default Login;
