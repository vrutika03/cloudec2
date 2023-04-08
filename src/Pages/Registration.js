import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';

const Registration = () =>{
  const [email, setEmail] = useState('')
  const [cname, setcname] = useState('')
  const [phonenumber, setphone] = useState('')
  const [password, setPassword] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false);
  const emailError = email === '' && formSubmitted; 
  const passwordError = password === ''&& formSubmitted;
  const cnameError = cname === '' && formSubmitted; 
  const phoneError = phonenumber === '' && formSubmitted; 
  const navigate = useNavigate();
 
 
 const HandleSubmit = async (e) =>{
  e.preventDefault();
  if (email === '' || password === '' || cname === ''||phonenumber === '' ) {
    setFormSubmitted(true);
    return;
  }
  try {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        phone_number: phonenumber,
        name: cname
      }
    });
    navigate(`/confirm?username=${encodeURIComponent(email)}`);
  } catch (error) {
    console.log('error signing up:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An account with the given email already exists',
      
    }) 
  
  }
}
const HandleLogin = (e) =>{
  e.preventDefault();
  navigate('/');
}

  return (
    <div className="App" >
      <header className="App-header">
        <form > 
        <Grid container alignItems="center"  direction="column">
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '35ch',borderRadius: '20px',},
        display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh'
      }}
      noValidate
      autoComplete="off"
    >
         <Grid item>
            <TextField
              id="outlined-basic"
              label="Name*"
              type="text"
              value={cname}
              error={cnameError}
              onChange={(e) => setcname(e.target.value)}
              helperText={cnameError ? 'This field is required' : ''}
            />
          </Grid>
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
              id="outlined-basic"
              label="Phone number*"
              
              value={phonenumber}
              error={phoneError}
              onChange={(e) => setphone(e.target.value)}
              helperText={phoneError ? 'This field is required' : ''}
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
          <Button type="submit" onClick={HandleLogin}>Login</Button>
          
          </Grid>
          </Box>
        </Grid>
        </form>
      </header>
    </div>
  );
}

export default Registration;
