import React, { useState } from "react";

// const jwt = require('jsonwebtoken')
// const {JWT_SECRET = "whateveriwant"} = process.env;

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState(false);
  // const [birthday, setBirthday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const ageCheck = () => {}
    //   const currentYear = new Date().getFullYear();
    //   console.log(currentYear)
    //   const year = e.target.value;
    //   const age = (currentYear - year);
    // ageCheck(currentYear, year, age);
   

    const fetchToken = async (name, email, password /*birthday*/) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              name,
              email,
              password,
              // birthday
        })
        
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setName("");
        setEmail("");
        setPassword("");
        // setBirthday("");
        // sessionStorage.setItem("token", result.data.token)
        // console.log(result);
        return result
      } 
      // console.log(result);
      // sessionStorage.setItem("token", result.data.token)
      // return result
    } catch (error) {
      console.log(error);
    }}
    fetchToken(name, email, password, /*birthday*/);
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
          {/* <label>
        Birthday: <input
                  className='input'
                  type='date'
                  value={birthday}
                  placeholder='mm/dd/yyyy'
                  onChange={(e) => setBirthday(e.target.value)}
                  required/>
          </label> */}
        <button className='button' type="submit">Sign Up</button>
        <p>Already have an account?<br/>
        <a href="./login">Sign In</a> </p>
      </form>
    </>
  )
}

export default SignUpForm