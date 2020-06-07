import React from 'react';
import { Switch } from 'react-router-dom';
import { UsersList } from '../../users/users-list/UsersList';
import { AuthenticatedRoute } from '../../../core/guard/AuthenticatedRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';
import { User } from '../../users/user/User';
import { RecipesList } from '../../recipes/recipes-list/RecipesList';
import { RecipeEdit } from '../../recipes/recipe-edit/RecipeEdit';
import { Recipe } from '../../recipes/recipe/Recipe';

export function Main(){
    
    return(
        <div className="main">
            <Switch>
                <AuthenticatedRoute exact path="/users/edit/:id" component={UserEdit} admin={true}/>
                <AuthenticatedRoute exact path="/users/:id" component={User}/>
                <AuthenticatedRoute exact path="/users" component={UsersList}/>

                <AuthenticatedRoute exact path="/" component={RecipesList}/>
                <AuthenticatedRoute exact path="/recipes/edit/:id" component={RecipeEdit}/>
                <AuthenticatedRoute exact path="/recipes/create" component={RecipeEdit}/>
                <AuthenticatedRoute exact path="/recipes/:id" component={Recipe}/>
            </Switch>
        </div>
    );
}