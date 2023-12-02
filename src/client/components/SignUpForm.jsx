import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const jwt = require('jsonwebtoken')
// const {JWT_SECRET = "whateveriwant"} = process.env;


const SignUpForm = ({setToken}) => {
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchToken = async (email, password ) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              email,
              password,
        })
        
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setEmail(" ");
        setPassword(" ");
        navigate('/');
        setToken(result);
        localStorage.setItem("token", result.user.id);
        return result
      } 
    } catch (error) {
      console.log(error);
    }}
    fetchToken(email, password);
  }
  return (
    <>
      <h2 className="Sign-In">
        Register below!<br/>
      You must be at least 21 to create an account.</h2>
      <form className='styleForm' onSubmit={handleSubmit}>
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
        <button className='button'
        type="submit"
        >Sign Up</button>

        <p>Already have an account?<br/>
        <a href="./login">Sign In</a> </p>
      </form>
    </>
  )
}

export default SignUpForm