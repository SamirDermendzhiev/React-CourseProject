import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../../../core/api/users.api';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import './RecipeCard.css';
import { getRateById, rateRecipe, getUserRateFor } from '../../../core/api/rate.api';
const cardStyle={
    width:"18rem"
}

export function RecipeCard({recipe,onDelete}){

    const loggedUser = getLoggedUser();
    const [recipeRate,setRecipeRate] = useState(0);
    const [userRate,setUserRate]=useState(0);
    useEffect(()=>{
        getRateById(recipe.id).then((rate)=>{
            setRecipeRate(rate);
        })
        getUserRateFor(recipe.id).then((rate)=>{
            setUserRate(rate);         
        })        
    },[recipe.id]);
    
    const rateCurentRecipe = (rated)=>{
        rateRecipe(recipe.id,loggedUser.id,rated); 
    };
    return(
        <div className="note-card m-3">
            <div className="card" style={cardStyle}>
                <img className="card-img-top" src={recipe.picture} alt={recipe.name}/>
                <div className="card-body">
                    <Link to={`/recipes/${recipe.id}`}><h5 className="card-title">{recipe.name}</h5></Link>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">by: {recipe.author}</li>
                    <li className="list-group-item">{recipe.difficulty}</li>
                    <li className="list-group-item">
                        <div className="card-body">
                            <div>Rate: {Number((recipeRate).toFixed(1))}</div>
                            <Rating emptySymbol="fa fa-star" fullSymbol="fa fa-star checked" initialRating={userRate} onClick={rateCurentRecipe}></Rating>
                        </div>
                    </li>
                </ul>         
                {(loggedUser.id===recipe.userId || loggedUser.isAdmin)&&
                <div>
                    <Link to={`/recipes/edit/${recipe.id}`} className="m-0">Edit </Link>     
                    <span className="card-link" onClick={()=>{onDelete(recipe.id)}}> Delete</span>
                </div>
                }                   
            </div>
        </div>
    )
}