import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch('https://3qj6507cjc.execute-api.us-east-1.amazonaws.com/test/tablelist')
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        const rows = parsedData.map((item) => {
          return createData(item.bloodgroup, item.dname, item.expiry, item.bloodbag, item.quantity);
        });
        setRows(rows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function createData(bloodgroup, dname, expiry, bloodbag, quantity) {
  return { bloodgroup, dname, expiry, bloodbag, quantity };
}
  
  const onRequest = (row) => {
    const state = {
      bloodgroup: row.bloodgroup,
      dname: row.dname,
      bloodbag: row.bloodbag
    };
    navigate('/request', { state });
  };

  const navigate = useNavigate();



  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      
      <TableContainer
        component={Paper}
        sx={{ maxWidth: '90%', maxHeight: '90%', margin: '50px auto 0 auto', borderRadius: 5,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',}}
      >
        <Table sx={{ minWidth: 650, borderSpacing: '0px 10px',borderCollapse: 'separate'  }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Blood Group</TableCell>
              <TableCell align="right">Donor Name</TableCell>
              <TableCell align="right">Expiry Date</TableCell>
              <TableCell align="right">Blood Bag ID</TableCell>
              <TableCell align="right">Quantity(mL)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.bloodbag}
                sx={{ '&:last-child td, &:last-child th': { border: 0 },paddingY: 5 }}
              >
                <TableCell component="th" scope="row">
                  {row.bloodgroup}
                </TableCell>
                <TableCell align="right">{row.dname}</TableCell>
                <TableCell align="right">{row.expiry}</TableCell>
                <TableCell align="right">{row.bloodbag}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
         
        <Button variant="contained" color="primary"  onClick={() => onRequest(row)}>
          Request
        </Button>
       
      </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
   
  );
}


export default Home;
