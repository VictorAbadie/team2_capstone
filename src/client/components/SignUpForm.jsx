import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken]= useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const fetchToken = async (name, email, password, token) => {
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
        // sessionStorage.setItem("token", result.data.token)
        // console.log(result);
        return result
      } else {
        console.log(token);
      }
    
    } catch (error) {
      console.log(error);
    }
    // fetchToken(name, email, password, token) | add a } above if you want to uncomment this out 
  }

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   axios.defaults.withCredentials = true;
//   axios.post("http://localhost:3000/api/users/register", {
//     name: name,
//     email: email,
//     password: password
// }).then((res) => console.log(res))
// .catch((error) => console.log(error))
// }
  return (
    <>
      <h2 className="Sign-Up">Sign Up! please </h2>
      {/* {successMessage && <p>{successMessage}</p>} */}
      {/* {error && <p> {error }</p>} */}

      <form onSubmit={handleSubmit}>
        <label>
        Name: <input value={name} type="text" onChange={(e) => setName(e.target.value)} minLength={3} required/> 
        </label>
          <br/>
          <label>
        Email: <input value={email} type="text" onChange={(e) => setEmail(e.target.value)}/>  
        </label>
          <br/>
          <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={9} required/>
        </label>
        <br />
        <button type="submit">SignUp</button>
        <p>Already have an account? <a href="./login">SignIn</a> </p>
      </form>
    </>
  )
}
export default SignUpForm;