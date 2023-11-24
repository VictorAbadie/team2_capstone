import React, {useState} from "react";
// import axios from "axios";

function LogIn({token, setToken}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
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
    <h2 className="Sign-In">Please Log In Work</h2>
    <form onSubmit={handleSubmit}>
    {/* <label>
        Name: <input value={name} type="text" onChange={(e) => setName(e.target.value)}/>  
        </label>
          <br/> */}
          <label>
        Email: <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/>  
        </label>
          <br/>
          <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="./register">SignUp</a> </p>
    </form>
    </>
  )
}
export default LogIn;