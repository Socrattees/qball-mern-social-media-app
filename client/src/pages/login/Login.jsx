import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls.js";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef(); //unlike useState, prevents re-renders to save performance
  const password = useRef(); //also it's designed to directly interacting with DOM elements and not so much on states
  const { user, isFetching, error, dispatch } = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email:email.current.value, password:password.current.value }, dispatch); //current is the actual DOM element and value is the element's value
  }

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Q-Ball</h3>
          <span className="loginDesc">
            Connect with friends from around the world.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={ handleClick }>
            <input placeholder="Email" type="email" className="loginInput" ref={ email } required />
            <input placeholder="Password" type="password" className="loginInput" ref={ password } required />
            <button className="loginButton" type="submit" disabled={ isFetching }>{ isFetching ? <CircularProgress color="error" size={25} /> : "Log In" }</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton" type="button">Create a new Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}