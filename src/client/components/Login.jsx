// UNLESS SPECIFIED AND SAID THAT I GAVE IT A CLASS NAME ASSUME THE CLASSNAME WAS ALREADY THERE AND IN USE SOMEWHERE IN THE PREBUILT CSS FOR THE FORM

// IF A NEW CSS FORM IS GOING TO BE MADE THERES NO PROBLEM DELETING THIS PREBUILT ONE (REGISTER.CSS) AND STARTING FROM SCRATCH. ILL TRY MY BEST TO HAVE ALL CLASSNAMES LABELED FOR WHERE AND WHAT THEY ARE FOR

// IF YOU CANT GET THINGS TO MOVE AS A WHOLE LOOK AT THE "SECTION" TAGS AND TRY ADDING A CLASS NAME FOR THEM. OR USE THE SECTION TAG AS A WHOLE AND DONT ADD CLASS NAMES. 

// REFERENCE THE BOILERPLATE CSS BECAUSE THIS SHIT WAS A LITTLE CONFUSING TO ME

// ALL THE PSUEDO CODE IS GOING TO BE FOR THE LINE DIRECTLY BELOW UNLESS SPECIFIED FOR SOMETHING ELSE

// ESSENTIALLY THE SAME AS REGISTER FORM WITH CLASSES AND SUCH

import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
// import axios from './api/axios';


const LOGIN_URL = '/signin';

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                      {/* need to put the link for our homescreen here when we make one */}
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="button">Sign In</button>
                    </form>
                    <p>
                        Dont have an account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="./signup">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login