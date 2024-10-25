import React, { useRef } from "react";
import "./login.css";

export default function Login() {
  const email = useRef(); //unlike useState, prevents re-renders to save performance
  const password = useRef(); //also it's designed to directly interacting with DOM elements and not so much on states

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Q-Ball</h3>
          <span className="loginDesc">
            Connect with friends from around the world.
          </span>
        </div>
        <div className="loginRight" onSubmit={ handleClick }>
          <form className="loginBox">
            <input placeholder="Email" type="email" className="loginInput" ref={ email } required />
            <input placeholder="Password" type="password" className="loginInput" ref={ password } required />
            <button className="loginButton">Log in</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}