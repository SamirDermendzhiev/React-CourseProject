import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../../../core/api/recipes.api';
import './RecipeEdit.css';
export function RecipeEdit(props){

    const [editedRecipe,setEditedRecipe]=useState({picture:'',name:'',instructions:'',ingrediants:'',difficulty:''});
    const [error,setError]= useState('');
    const [redirect,setRedirect]= useState(false);

    useEffect(()=>{
        if(props.computedMatch.params.id){
            getRecipeById(props.computedMatch.params.id).then((recipe)=>{
                setEditedRecipe(recipe.data);
            }).catch((err)=>setError(err));
        }
    },[props.computedMatch.params.id]);

    const onFormSubmit = (event)=>{
        event.preventDefault();
        updateRecipe(editedRecipe).then(()=>{
            setRedirect(true);
        })
        .catch((err)=>setError(err.message));
    }

    const onInputChange = (event)=>{
        event.persist();
        setEditedRecipe((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    return(
        <>
        {redirect && <Redirect to="/"/>}
        <div className="recipe-edit">
            <form className="recipe-edit-form" onSubmit={onFormSubmit}>
            {error && <span className="text-danger">{error}</span>}
                <div className="form-group">
                    <label labelfor="name">Name:</label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedRecipe.name} required/>
                </div>
                <div className="form-group">
                    <img className="card-img-top" src={`${editedRecipe.picture}`} alt=""/><br/> 
                    <label labelfor="picture">Image(url only):</label>                  
                    <input type="text" name="picture" id="picture" className="form-control" onChange={onInputChange} value={editedRecipe.picture} required/>
                </div>
                <div className="form-group">
                    <label labelfor="ingrediants">Ingrediants:</label>
                    <textarea className="form-control" id="ingrediants" name="ingrediants" onChange={onInputChange} value={editedRecipe.ingrediants}/>  
                </div>
                <div className="form-group">
                    <label labelfor="instructions">instructions:</label>
                    <textarea className="form-control" id="instructions" name="instructions" onChange={onInputChange} value={editedRecipe.instructions}/>  
                </div>
                <div className="form-group">
                    <label labelfor="difficulty">difficulty:</label>
                    <select name="difficulty" id="difficulty" className="form-control" onChange={onInputChange} value="Medium">
                        <option value="Easy" >Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>                
                </div>
                <button className="btn btn-success">Save recipe</button>
            </form>
        </div>
        </>
    )
}