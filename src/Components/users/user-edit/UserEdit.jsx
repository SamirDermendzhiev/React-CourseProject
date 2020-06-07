import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../../core/api/users.api';
import { Redirect } from 'react-router-dom';
import './UserEdit.css';

export function UserEdit(props){

    const [editedUser,setEditedUser]=useState({picture:'',name:'',age:0,email:'',password:'',isAdmin:false});
    const [error,setError]= useState('');
    const [redirect,setRedirect]= useState(false);

    useEffect(()=>{
        getUserById(props.computedMatch.params.id).then((user)=>{
            setEditedUser(user.data);
        }).catch((err)=>setError(err));
    },[props.computedMatch.params.id]);

    const onFormSubmit = (event)=>{
        event.preventDefault();
        updateUser(editedUser).then(()=>{
            setRedirect(true);
        })
        .catch((err)=>setError(err.message));
    }

    const onInputChange = (event)=>{
        event.persist();
        setEditedUser((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    const onCheckBoxChange = (event)=>{
        event.persist();
        setEditedUser((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.checked
        }))
    }

    return(
        <>
        {redirect && <Redirect to="/users"/>}
        <div className="user-edit">
            <form className="user-edit-form" onSubmit={onFormSubmit}>
            {error && <span className="text-danger">{error}</span>}
                <div className="form-group">
                    <label labelfor="picture">Image(url only):</label>
                    <input type="text" name="picture" id="picture" className="form-control" onChange={onInputChange} value={editedUser.picture}/>
                    <img className="card-img-top" src={`${editedUser.picture}`} alt=""/>
                </div>
                <div className="form-group">
                    <label labelfor="name">Name:</label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedUser.name}/>
                </div>
                <div className="form-group">
                    <label labelfor="age">Age:</label>
                    <input type="number" name="age" min="0" max="100" id="age" className="form-control" onChange={onInputChange} value={editedUser.age}/>
                </div>
                <div className="form-group">
                    <label labelfor="email">Email:</label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} value={editedUser.email}/>
                </div>
                <div className="form-group">
                    <label labelfor="password">Password:</label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} value={editedUser.password}/>
                </div>
                <div className="form-group">
                    <label labelfor="isAdmin">isAdmin:</label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={onCheckBoxChange} checked={editedUser.isAdmin}/>
                </div>
                <button className="btn btn-success">Save user</button>
            </form>
        </div>
        </>
    )
}