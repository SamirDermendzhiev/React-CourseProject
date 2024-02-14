import axios from "axios";
import { getLoggedUser } from "./users.api";

const apiUrl = "http://localhost:3000/Recipes";

export function getAllRecipes() {
  return axios.get(apiUrl);
}

export function getRecipeById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export async function getRecipesByAuthorId(authorId) {
  const allRecipes = await getAllRecipes();

  return allRecipes.filter((recipe) => recipe.authorId === authorId);
}

export async function addRecipe(recipeData) {
  console.log(JSON.stringify(recipeData));
  const loggedUser = getLoggedUser();
  recipeData.difficulty = 1;
  recipeData.author = loggedUser.name;
  recipeData.authorId = loggedUser.id;

  return axios.post(apiUrl, recipeData);
}

export function updateRecipe(recipeData) {
  if (recipeData.id) return axios.put(`${apiUrl}/${recipeData.id}`, recipeData);

  return addRecipe(recipeData);
}

export function deleteRecipe(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export async function deleteRecipesByAuthorId(userId) {
  const allRecipes = (await getRecipesByAuthorId()).data;

  allRecipes.forEach((recipe) => {
    deleteRecipe(recipe.id);
  });
}
