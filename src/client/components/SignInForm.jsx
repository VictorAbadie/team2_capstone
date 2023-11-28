import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


function LogIn({token, setToken}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(name, password, email)
      const response = await fetch('http://localhost:3000/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
          name,
          email,
          password,
          
      })
    });
    const result = await response.json();
    console.log(result)
    setToken(result)
    localStorage.setItem("token", result.user.id)
    console.log(token);
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
        Name: <input className='input' value={name} type="text" onChange={(e) => setName(e.target.value)}/>  
        </label>
          <br/> 
          <label>
        Email: <input className='input' value={email} type="text" onChange={(e) => setEmail(e.target.value)}/>  
        </label>
          <br/>
          <label>
        Password: <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button className='button' type="submit"
        >Log In</button>

        <p className='href'>Don't have an account?<a href="./register"> Sign Up</a> </p>
    </form>
    </>
  )
}
export default LogIn;