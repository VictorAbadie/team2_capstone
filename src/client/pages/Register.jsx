// UNLESS SPECIFIED AND SAID THAT I GAVE IT A CLASS NAME ASSUME THE CLASSNAME WAS ALREADY THERE AND IN USE SOMEWHERE IN THE PREBUILT CSS FOR THE FORM

// IF A NEW CSS FORM IS GOING TO BE MADE THERES NO PROBLEM DELETING THIS PREBUILT ONE (REGISTER.CSS) AND STARTING FROM SCRATCH. ILL TRY MY BEST TO HAVE ALL CLASSNAMES LABELED FOR WHERE AND WHAT THEY ARE FOR

// IF YOU CANT GET THINGS TO MOVE AS A WHOLE LOOK AT THE "SECTION" TAGS AND TRY ADDING A CLASS NAME OR THEM. OR USE THE SECTION TAG AS A WHOLE AND DONT ADD CLASS NAMES. 

// REFERENCE THE BOILERPLATE CSS BECAUSE THIS SHIT WAS A LITTLE CONFUSING TO ME

// ALL THE PSUEDO CODE IS GOING TO BE FOR THE LINE DIRECTLY BELOW UNLESS SPECIFIED FOR SOMETHING ELSE

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';


// The 2 lines below are for making Case Sensitive Usernames and Passwords
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/signup';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
              // if you want to do something with the "section" below and add a class name that will be good for flex box etc and moving things around
                <section>
                  {/* below is the success message youll get when you successfully make an account */}
                    <h1>Success!</h1>
                    {/* below is the link to the sign in page that will also be provided on the success page which when clicked will redirect you to the sign in page, there is no class name for either so if you want to add one go ahead, just describing what they do even though im sure you can read it and know what they do wow why am i still typing */}
                    <p>
                        <a href="./SignIn">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                   {/* Below is the big ass Register h1 above username with the class name Register-P I gave it. There was no class before for it so you shouldnt run into any issues trying to style it */}
                    <h1 className="Register-P">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                          {/* The 2 classNames for validName and inValid username are the 2 icons that will pop up next to username - the check and x */}
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        {/* the classname below is for the message that will pop up when creating a username */}
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            {/* the 2 classnames below are for telling is passwords match or not via the check and x */}
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        {/* the classname below is for the message that will pop up when creating a password */}
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            {/* Check and x for if the confirm password matches the regular password */}
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        {/* class below is for a message when the passwords do not match */}
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                            {/* classname below is for.. you guessed it, the sign up button */}
                        <button className="Sign-Up-Butt" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    {/* classname below is the for "already registered?" text */}
                    <p className="Already-Reg">
                        Already registered?<br />
                        {/* not entirely sure what the line classname is for, change the color of the text and see what changes. I THINK its for the "Sign In!". pretty sure i remember changing that around to be blue and nice looking-ish */}
                        <span className="line">
                            {/*put router link here*/}
                            <a href="./SignIn">Sign In!</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register