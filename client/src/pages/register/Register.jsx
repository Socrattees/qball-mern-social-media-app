import React from "react";
import "./register.css";

export default function Register() {
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
          <div className="registerBox">
            <input placeholder="Username" type="text" className="registerInput" />
            <input placeholder="Email" type="email" className="registerInput" />
            <input placeholder="Password" type="password" className="registerInput" />
            <input placeholder="Re-enter Password" type="password" className="registerInput" />
            <button className="registerButton">Sign Up</button>
            <button className="registerRegisterButton">Log into account</button>
          </div>
        </div>
      </div>
    </div>
  );
}