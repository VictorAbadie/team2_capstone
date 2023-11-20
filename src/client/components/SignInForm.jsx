import React, {useState} from "react";

function LogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken]= useState(null);
  const [admin, setAdmin] = useState("");

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
          password,
          admin
      })
    });
    const result = await response.json();
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
    <label>
        Name: <input value={name} type="text" onChange={(e) => setName(e.target.value)}/>  
        </label>
          <br/>
          <label>
        Email: <input value={email} type="text" onChange={(e) => setEmail(e.target.value)}/>  
        </label>
          <br/>
          <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Log In</button>
        <p>Don't have an account? <a href="./register">SignUp</a> </p>
    </form>
    </>
  )
}
export default LogIn;