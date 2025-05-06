import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const handleLoginSuccess = async (credentialResponse) => {
    const token = await credentialResponse.credential;
// console.log(token)
    try {
      const res = await fetch('http://localhost:5000/api/google-login', {
        method:'post',
        body : JSON.stringify({token}),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      // alert(`Welcome ${res.data.name}`);
      console.log(await res.json());
    } catch (err) {
      console.log('Login failed',err);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={(err) => console.error('Login Failed',err)} />
    </div>
  );
}

export default App;
