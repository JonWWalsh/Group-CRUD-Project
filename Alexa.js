// Create Recipe

const recipes = [];

// Event Listeners //

// This is triggered when we click the button on line 19 of index.html

function onAddRecipe() {
    const newRecipe = {
        name: document.getElementById("recipe-name-input").value,
        ingredients: []
    }
    recipes.push(newRecipe);
    renderApp();
}

// Render Function

function renderApp() {
    const recipesDiv = document.getElementById("recipes");
    emptyElement(recipesDiv);
    for(let recipe of recipes) {
        recipesDiv.appendChild( renderRecipe(recipe));
    }
}

function renderRecipe(recipe){
    const recipeDiv = document.createElement("div")
    mealDiv.classMeal = "mt-3";
}