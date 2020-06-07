import React, { useState } from 'react';
import { register } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Register(){
    
    const [registerUser,setRegisterUser]=useState({picture:'',name:'',age:0,email:'',password:''});
    const [error,setError]= useState('');
    const [redirect,setRedirect]= useState(false);

    const onInputChange = (event)=>{
        event.persist();
        setRegisterUser((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    const onFormSubmit = (event)=>{
        event.preventDefault();
        register(registerUser).then(()=>{
            setRedirect(true);
        })
        .catch((err)=>setError(err.message));
    }

    return(
        <>
        {redirect && <Redirect to="/users"/>}
        <div className="user-edit">
            <form className="user-edit-form" onSubmit={onFormSubmit}>
            {error && <span className="text-danger">{error}</span>}
                <div className="form-group">
                    <label labelfor="picture">Image(url only):</label>
                    <input type="text" name="picture" id="picture" className="form-control" onChange={onInputChange} required/>
                    <img className="card-img-top" src={`${registerUser.picture}`} alt=""/>
                </div>
                <div className="form-group">
                    <label labelfor="name">Name:</label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label labelfor="age">Age:</label>
                    <input type="number" name="age" min="0" max="100" id="age" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label labelfor="email">Email:</label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label labelfor="password">Password:</label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} required/>
                </div>
                <button className="btn btn-success">Register</button><br/>
                <Link to="/login">Already have an account?</Link>
            </form>
        </div>
        </>
    )
}