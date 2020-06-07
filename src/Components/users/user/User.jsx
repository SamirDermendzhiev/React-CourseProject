import React, { useState, useEffect } from 'react';
import { getUserById, getLoggedUser, deleteUser } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function User(props){
    const loggedUser = getLoggedUser();
    const [curentUser,setCurentUser]=useState({});
    const [redirect,setRedirect]= useState(false);

    const onDelete=(id)=>{
        deleteUser(id).then(()=>{
            setRedirect(true);
        })
        .catch((err)=>console.error(err.message));
    }

    useEffect(()=>{
        getUserById(props.computedMatch.params.id).then((user)=>{
            setCurentUser(user.data);
        }).catch(err=>alert(err.message));
    },[props.computedMatch.params.id]);

    return(
        <>
        {redirect && <Redirect to="/"/>}
        <div className="Recipe m-5">
            <div className="card mb-3 w-75 m-auto">
                <img className="card-img-top" src={curentUser.picture} alt={curentUser.name}/>
                <div className="card-body">
                    <h4 className="card-title">{curentUser.name}</h4>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><p className="card-text">Age: {curentUser.age}</p></li>
                    <li className="list-group-item"><p className="card-text">Email: {curentUser.email}</p></li>
                    <li className="list-group-item">
                        {(loggedUser.id===curentUser.id || loggedUser.isAdmin) &&
                            <div className="card-body">   
                                <Link to={`/users/edit/${curentUser.id}`} className="m-0">Edit</Link>&nbsp;
                                <span className="card-link" onClick={()=>{onDelete(curentUser.id)}}> Delete</span> 
                            </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}