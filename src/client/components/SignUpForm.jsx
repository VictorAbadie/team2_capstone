import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const fetchToken = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              name,
              email,
              password
        })
        
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setName("");
        setEmail("");
        setPassword("");
        return result
      } 
    } catch (error) {
      console.log(error);
    }}
    fetchToken(name, email, password);
  }
  return (
    <>
      <h2 className="Sign-In">
        Register below!<br/>
        You must be at least 21 to register.</h2>
      {/* {successMessage && <p>{successMessage}</p>} */}
      {/* {error && <p> {error }</p>} */}

      <form className='styleForm' onSubmit={handleSubmit}>
        <label>
        Name: <input
              className='input'
              value={name} type="text"
              onChange={(e) => setName(e.target.value)}
              minLength={3}
              required/> 
        </label>
          <br/>
          <label>
        Email: <input
                className='input'
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required/>  
        </label>
          <br/>
          <label>
        Password: <input
                  className='input'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={9}
                  required/>
        </label>
          <br/>
        <button className='button' type="submit"
          onClick={(e) => { 
            e.preventDefault();
            navigate(`/`); }}>Sign Up</button>
        <p>Already have an account?<br/>
        <a href="./login">Sign In</a> </p>
      </form>
    </>
  )
}

export default SignUpForm