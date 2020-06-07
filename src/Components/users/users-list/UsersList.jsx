import React, { useState, useEffect } from 'react';
import { getAllUsers, getLoggedUser, deleteUser } from '../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';

const usersListStyle  = {
    flexWrap:'wrap'
}

export function UsersList(){
    const loggedUser = getLoggedUser();
    const[users,setUsers] = useState([]);

    useEffect(()=>{
        getAllUsers().then((allUsers)=>{
            setUsers(allUsers.data);
        });
    },[]);
    
    const onDelete=(id)=>{
        deleteUser(id).then(()=>{
            setUsers((prevState)=>{
                return prevState.filter(u=>u.id!==id);
            })
        })
        .catch((err)=>console.error(err.message));
    }

    return(
        <div className="users-list d-flex" style={usersListStyle}>
            {users.filter(user=>user.id !== loggedUser.id).map((user)=><UserCard user={user} key={user.id} userDelete={onDelete}/>)}
        </div>
    )
}