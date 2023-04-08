
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Swal from 'sweetalert2'

function Horizontal() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };
  const handleSubscribe = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      };Swal.fire({
        icon: 'success',
        title: 'Place check your email',
        text: 'You are succesfully subscribed wohoo!!',
        
      })
  
      const response = await fetch('https://3qj6507cjc.execute-api.us-east-1.amazonaws.com/test/subscription', requestOptions);
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDonate = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      };Swal.fire({
        icon: 'success',
        title: 'Place check your email for details',
      })
  
      const response = await fetch('https://3qj6507cjc.execute-api.us-east-1.amazonaws.com/test/sendingemail', requestOptions);
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">Blood Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Available Blood</Nav.Link>
          {/* <Nav.Link href="/request">Request</Nav.Link>  */}
        </Nav>
        <Nav>
          <Nav.Link onClick={handleDonate}>Want to donate?</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleSubscribe}>Subscribe</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Horizontal;
