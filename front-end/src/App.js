import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import UserPage from './User/user-page.js';
import AdminLoginPage from './Admin/admin-login-page';
import AdminHomePage from './Admin/admin-home-page';




const App = ()=> {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
   const [events, setEvents] = useState(null);
   const [loggedIn,setLoggedIn] = useState(false);
//let events;
useEffect( () => {
  const sendRequest = async () => {

    setIsLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/events");
      const responseData = await  response.json();
      
      if (!response.ok) {
        window.alert(responseData.message);
      }
      setEvents(responseData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  sendRequest();
}, []);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<div className="App">{!isLoading&&events? <UserPage datas={events}/>: <div className="App">Loading...</div>}</div>} exact />
        <Route path="/admin" element={<div className="App">{<AdminLoginPage setLoggedIn={setLoggedIn}/>}</div>} exact />
        <Route path="/admin/home" element={<div className="App">{!isLoading&&events? <AdminHomePage datas={events} loggedIn={loggedIn}/>: <div className="App">Loading...</div>}</div>} exact />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;
