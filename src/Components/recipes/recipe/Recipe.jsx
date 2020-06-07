import React, { useEffect, useState } from 'react';
import { getLoggedUser } from '../../../core/api/users.api';
import { Link, Redirect } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../../../core/api/recipes.api';
import Rating from 'react-rating';
import { getRateById, rateRecipe } from '../../../core/api/rate.api';

export function Recipe(props){
    const loggedUser = getLoggedUser();
    const [curentRecipe,setCurentRecipe]=useState({});
    const [redirect,setRedirect]= useState(false);
    const [recipeRate,setRecipeRate] = useState(0);

    const onDelete=(id)=>{
        deleteRecipe(id).then(()=>{
            setRedirect(true);
        })
        .catch((err)=>console.error(err.message));
    }
    
    const rateCurentRecipe = (rated)=>{ 
        rateRecipe(curentRecipe.id,loggedUser.id,rated); 
    }

    useEffect(()=>{
        getRecipeById(props.computedMatch.params.id).then((recipe)=>{
            setCurentRecipe(recipe.data);
        }).catch(err=>alert(err.message));

        getRateById(curentRecipe.id).then((rate)=>{
            setRecipeRate(rate);
        });      
    },[props.computedMatch.params.id,curentRecipe.id]);
    return(
        <>
        {redirect && <Redirect to="/"/>}
        <div className="Recipe m-5">
            <div className="card mb-3 w-75 m-auto">
                <img className="card-img-top" src={curentRecipe.picture} alt={curentRecipe.name}/>
                <div className="card-body">
                    <h4 className="card-title">{curentRecipe.name} </h4>
                    <h6 className="text-secondary">{curentRecipe.difficulty}</h6>
                    <p className="card-text"><small className="text-muted">by: {curentRecipe.author}</small></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><p className="card-text">{curentRecipe.ingrediants}</p></li>
                    <li className="list-group-item"><p className="card-text">{curentRecipe.instructions}</p></li>
                    <li className="list-group-item"><div className="card-body">
                        <div>Rate: {recipeRate}</div>
                            <Rating emptySymbol="fa fa-star" fullSymbol="fa fa-star checked" onChange={rateCurentRecipe}></Rating>
                        </div>
                    </li>
                    <li className="list-group-item">
                        {(loggedUser.id===curentRecipe.userId || loggedUser.isAdmin) &&
                            <div className="card-body">   
                                <Link to={`/recipes/edit/${curentRecipe.id}`} className="m-0">Edit &nbsp;</Link>
                                <span className="card-link" onClick={()=>{onDelete(curentRecipe.id)}}> Delete</span> 
                            </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}