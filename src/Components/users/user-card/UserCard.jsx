import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

const cardStyle={
    width:"18rem"
}

export function UserCard({user,userDelete}){

    const loggedUser = getLoggedUser();
    
    return(
        <div className="user-card m-3">
            <div className="card" style={cardStyle}>
                <img className="card-img-top" src={user.picture} alt={user.name}/>
                <div className="card-body">
                    <Link to={`/users/${user.id}`}><h5 className="card-title">{user.name}</h5></Link>
                </div>
                {loggedUser.isAdmin &&
                <div className="card-body list-group-item">
                    <Link to={`/users/edit/${user.id}`}>Edit </Link>
                    <span className="card-link" onClick={()=>{userDelete(user.id)}}> Delete</span>
                </div>
                }
            </div>
        </div>
    )
}