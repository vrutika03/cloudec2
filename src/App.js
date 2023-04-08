
import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Home from './Pages/Home';
import RequestForm from './Pages/RequestForm';
import Confirmation from './Pages/Confirmation';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation(); 
  const enableNavbar = location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/confirm"; 

  return (
    <div>
      {enableNavbar && <Navbar />}
      
        <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Registration/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/request" element={<RequestForm/>}/>
        <Route exact path="/confirm" element={<Confirmation/>}/>

        </Routes>
         
        </div> 
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
