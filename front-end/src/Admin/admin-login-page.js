import React ,{useState} from 'react';
import './admin-login-page.css'
import { useNavigate } from 'react-router-dom'; 


function AdminLoginPage({setLoggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const handleLogin = (e) => {
    
    e.preventDefault();
    const updateBody = {
      "name": username,
      "password":password
    }
    
    fetch(process.env.REACT_APP_BACKEND_URL+`/admin/signin`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateBody), // Convert the data to JSON format
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('invalid Credentials');
      }
    
      return response.json(); // Parse the response if necessary
    })
    .then((updateBody) => {
      // Handle the updated data from the server, if needed
      setLoggedIn(true);
      navigate('/admin/home');
      
      console.log('Data found', updateBody);
    })
    .catch((error) => {
      // Handle errors, e.g., show an error message to the user
      console.error('Error finding data:', error);
    });
    
  };
 



  return (
    <div className="login-container">
    <h2>Login</h2>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>SignIN</button>
  </div>
  )
}

export default AdminLoginPage;
