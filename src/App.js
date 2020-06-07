import React from 'react';
import './App.css';
import { Layout } from './Components/Layout/Layout';
import { AuthenticatedRoute }from './core/guard/AuthenticatedRoute.jsx';
import { NonAuthenticatedRoute }from './core/guard/NonAuthenticatedRoute.jsx';
import { Login } from './Components/auth/login/Login';
import { Switch } from 'react-router-dom';
import { Register } from './Components/auth/register/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute exact path="/login" component={Login}></NonAuthenticatedRoute>
        <NonAuthenticatedRoute exact path="/register" component={Register}></NonAuthenticatedRoute>
        <AuthenticatedRoute path="/" component={Layout}></AuthenticatedRoute>
      </Switch>
    </div>
  );
}

export default App;
