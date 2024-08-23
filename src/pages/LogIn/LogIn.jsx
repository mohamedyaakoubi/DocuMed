import React from 'react';
import './Login.css'; 

export const LogIn = () => {
    return (
        <div className="loginContainer">
            <h2>Log In</h2>
            <form className="loginForm">
                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="panpm startssword" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="loginButton">Log In</button>
            </form>
        </div>
    );
};

export default LogIn;
