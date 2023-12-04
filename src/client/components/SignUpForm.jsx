import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ setToken }) => {
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
            password,
          })
        });
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setName("");
          setEmail("");
          setPassword("");

          // Sign in the user after successful registration
          const signInResponse = await fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password,
            })
          });

          if (!signInResponse.ok) {
            // Handle sign-in error
            const signInError = await signInResponse.json();
            console.error('Sign-in failed:', signInError);
            return;
          }

          const signInResult = await signInResponse.json();
          console.log(signInResult);

          localStorage.setItem("token", signInResult.user.id);
          setToken(signInResult);

          // Redirect to the homepage after successful sign-up and sign-in
          navigate('/');
        } else {
          // Handle registration error
          console.error('Registration failed:', result);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    }

    fetchToken(name, email, password);
  }

  

  return (
    <>
      <h2 className="Sign-In">
        Register below!<br />
        You must be at least 21 to create an account.
      </h2>
      <form className='styleForm' onSubmit={handleSubmit}>
        <label>
          Name: <input
            className='input'
            value={name} type="text"
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            placeholder="Enter your name"
            required />
        </label>
        <br />
        <label>
          Email: <input
            className='input'
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required />
        </label>
        <br />
        <label>
          Password: <input
            className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={9}
            placeholder="Enter your password"
            required />
        </label>
        <br />
        <button className='button' type="submit">Sign Up</button>
        <p>Already have an account?<br />
          <a href="./login">Sign In</a> </p>
      </form>
    </>
  )
}

export default SignUpForm;
