import React, { useState, useEffect } from 'react';
import { getAllRecipes, deleteRecipe } from '../../../core/api/recipes.api';
import { RecipeCard } from '../recipes-card/RecipeCard';

const recipesListStyle  = {
    flexWrap:'wrap'
}

export function RecipesList(){

    const [allRecipes,setAllRecipes]=useState([]);

    useEffect(()=>{
        getAllRecipes().then((recipes)=>{
            setAllRecipes(recipes.data);
        })
    },[]);

    const onDelete=(id)=>{
        deleteRecipe(id).then(()=>{
            setAllRecipes((prevState)=>{
                return prevState.filter(u=>u.id!==id);
            });
           
        })
        .catch((err)=>console.error(err.message));
    }


    return(
        <div className="recipe-list" style={recipesListStyle}>
            <div className="text-center">Какво искате да приготвите?</div>
            <div className="recipes d-flex">
                {allRecipes.map((recipe)=><RecipeCard recipe={recipe} key={recipe.id} onDelete={onDelete}/>)}
            </div>
        </div>
    )
} 