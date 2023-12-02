import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function LogIn({token, setToken}) {
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") || false);
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      console.log(password, email, token)
      const response = await fetch('http://localhost:3000/api/users/login', {
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
    console.log(result)
    localStorage.setItem("token", result.user.id)
    setLoggedIn(true)

    if (result.success)
    setToken(result)  
    console.log(token);
      setEmail(" ");
      setPassword(" ");
      navigate('/')
      console.log(result);
      
    return result
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <>
    <h2 className="Sign-In">Please log in!</h2>
    <form className='styleForm' onSubmit={handleSubmit}>
          <label>
        Email: <input className='input' value={email} type="text" onChange={(e) => setEmail(e.target.value)} required/>  
        </label>
          <br/>
          <label>
        Password: <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <button className='button' type="submit"
        >Log In</button>

        <p className='href'>Don't have an account?<a href="./register"> Sign Up</a> </p>
    </form>
    </>
  )
}
export default LogIn;