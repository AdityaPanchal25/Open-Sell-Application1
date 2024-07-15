import React, { useState } from "react";
import "./style/Login.css";
import { Link ,useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Ensure this path is correct
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import the necessary functions

function Login() {
  const history=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    // Use the modular signInWithEmailAndPassword function
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // it successfully signed in the user
        history('/');
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    // Use the modular createUserWithEmailAndPassword function
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // it successfully created a new user
      if(auth){
        history('/')
      }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create Your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
