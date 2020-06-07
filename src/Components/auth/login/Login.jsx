import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../core/api/users.api';
import './Login.css';

export function Login(props){
    const [loginData,setLoginData]=useState({});
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [errorMessage, setErrorMessage]=useState("");

    const onInputChange = (event)=>{
        event.persist();
        setLoginData((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }));
    }
    
    const onSubmit = (event)=>{
        event.preventDefault();
        login(loginData).then(()=>{
            setIsLoggedIn(true);   
        })
        .catch((err)=>setErrorMessage(err.message));
    };

    return(
        <>
        {isLoggedIn && <Redirect to="/"/>}
        <div className="login">
            <form className="login-form" onSubmit={onSubmit}>
                {errorMessage && <span className="text-danger">{errorMessage}</span>}
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange}/>
                </div>
                <button className="btn btn-primary">Login</button><br/>
                <Link to="/register">Don't have an account?</Link>
            </form>
        </div>
        </>
    )
}