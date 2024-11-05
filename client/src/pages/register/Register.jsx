import React, { useContext, useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (password.current.value !== rePassword.current.value) {
      rePassword.current.setCustomValidity("Passwords don't match!");
    } else {
      rePassword.current.setCustomValidity("");
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      registerCall(user, dispatch);
      navigate("/");
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Q-Ball</h3>
          <span className="registerDesc">
            Connect with friends from around the world.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={ handleClick }>
            <input placeholder="Username" type="text" className="registerInput" ref={ username } required />
            <input placeholder="Email" type="email" className="registerInput" ref={ email } required />
            <input placeholder="Password" type="password" className="registerInput" ref={ password } required />
            <input placeholder="Re-enter Password" type="password" className="registerInput" ref={ rePassword} required />
            <button className="registerButton" type="submit">Sign Up</button>
            <Link to="/login">
              <button className="loginButton" type="button">Log into account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}