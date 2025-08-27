const searchBox =document.querySelector('.searchBox');
const searchBtn =document.querySelector('.searchBtn');
const recipeContainer =document.querySelector('.recipe-container');
const recipeDetailContain =document.querySelector('.recipe-detail-contain');
const recipeCloseBtn =document.querySelector('.recipe-close-btn');


// function to get recipe from meals
const fetchRecipes =async (query)=>{
    // recipeContainer.innerHTML="<h2>Fetching Recipies...</h2>"
    recipeContainer.innerHTML = `<h2 class="loading">🍳 Fetching Recipes...</h2>`;

    try{

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML=""; //to empty the inner html
     recipeContainer.classList.add("searched"); 
    // in result we getting an array from  response so we using loop to accesing each element/ meals-->

    response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    // to add assign a class
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
       `
        // creating button
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        // Adding addEventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });

    }
    catch(error){
    recipeContainer.innerHTML="<h2>😓 opps ! Error in Fetching Recipies <br>Try again...!</h2>"

    }
    
   
    
}
// function to fetchIngredient and measurments for recipe details
const fetchIngredients = (meal) => {
    let ingredientsList = "";  // empty list to store the ingredients and measurements..
    for (let i = 1; i <= 20 ; i++) { 
        const ingredient = meal[`strIngredient${i}`];
            if(ingredient){
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`
            
            }
            else{
                break;
            }
              
            
        }
        return ingredientsList;

    }
const openRecipePopup= (meal) =>{
    recipeDetailContain.innerHTML=`
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3> Ingredents</h3>
            <ul class="ingredientList">${fetchIngredients(meal)}</ul>
            <div class="recipeInstructions">
                <h3> Instructions:</h3>
                <p >${meal.strInstructions}</p>
            </div>
    `
   
    recipeDetailContain.parentElement.style.display="block";    
}
// to close the button of recipe instruction details
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailContain.parentElement.style.display="none";
});


// for search btn
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();// prevent from auto submit when the page refresh or loads
    // console.log("button click");
    const searchInput =searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    
});