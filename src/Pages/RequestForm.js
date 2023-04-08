import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RequestForm = () => {
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const emailError = email === '' && formSubmitted;
  const quantityError = quantity === '' && formSubmitted;
  const location = useLocation();
  const [dname] = useState(location.state.dname);
  const [bloodgroup] = useState(location.state.bloodgroup);
  const [bloodbag] = useState(location.state.bloodbag);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || dname === '' || bloodbag === '' || bloodgroup === '' || quantity === '') {
      setFormSubmitted(true);
      return;
    }
    const url = 'https://3qj6507cjc.execute-api.us-east-1.amazonaws.com/hello/update';
    const data = {
      quantity: quantity,
      bloodbag: bloodbag
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      if (response.status === 200) {
        Swal.fire({
          text: JSON.parse(result).body,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: JSON.parse(result).body,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
    const HandleConfirm = async (e) => {
      e.preventDefault();
      if (email === '' || dname === '' || bloodbag === '' || bloodgroup === '' || quantity === '') {
        setFormSubmitted(true);
        return;
      }
    const apiUrl = 'https://3qj6507cjc.execute-api.us-east-1.amazonaws.com/hello/rconfirmation';
    const info = {
      dname: dname,
      bloodbag: bloodbag,
      quantity: quantity,
      email: email,
      bloodgroup: bloodgroup
    };
    const optionsone = {
      method: 'POST',
      body: JSON.stringify(info)
    };
    try {
      const response = await fetch(apiUrl, optionsone);
      const result = await response.text();
      if (response.status === 200) {
        Swal.fire({
          text: JSON.parse(result).body,
        }).then(() => {
          navigate('/home');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: JSON.parse(result).body,
        });
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="App" >
      <header className="App-header">
        <form >
          <Grid container alignItems="center" direction="column">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 3, width: '35ch', borderRadius: '15px !important' },
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
                  label="Donor Name*"
                  type="text"
                  value={dname}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline"
                  label="Blood Type*"
                  type="text"
                  value={bloodgroup}
                />
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Blood Bag*"
                    value={bloodbag}
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
                    label="Quantity*"
                    type="number"
                    value={quantity}
                    error={quantityError}
                    onChange={(e) => setQuantity(e.target.value)}
                    helperText={quantityError ? 'This field is required' : ''}
                  />
                </Grid>
              </Grid>
              <Grid item >
                <Button type="submit" onClick={HandleSubmit}>Submit</Button>
                </Grid>
                <Grid item>
                <Button type="submit" onClick={HandleConfirm}>Want Confirmation? Click here</Button>
              </Grid>
            </Box>
          </Grid>
        </form>
      </header>
    </div>
  );
}

export default RequestForm;
