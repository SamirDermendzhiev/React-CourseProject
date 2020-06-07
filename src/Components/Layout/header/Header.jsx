import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../../core/api/users.api';

const loginStyle={
    right:'0'
}

export function Header(){
    const [isLoggedOut,setIsLoggedOut]=useState(false);

    const onLogout = ()=>{
        logout();
        setIsLoggedOut(true);
    }
    
    return(
        <>
        {isLoggedOut && <Redirect to="/login"/>}
        <div className="header bg-dark text-light">
            <nav className="navbar navbar-expand-lg positon-relative">
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li><Link className="nav-link text-light" to="/">Recipes</Link></li>
                        <li><Link className="nav-link text-light" to="/users">Users</Link></li>
                        <li><Link className="nav-link text-light" to="/recipes/create">Create recipe</Link></li>
                    </ul>
                </div>
                <span className="nav-link position-absolute text-light" style={loginStyle} to="/login" onClick={onLogout}>Logout</span>
            </nav>
        </div>
        </>
    );
}