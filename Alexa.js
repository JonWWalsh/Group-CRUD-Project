
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
        recipesDiv.appendChild(renderRecipe(recipe));
    }
}

function renderRecipe(recipe) {
    const recipeDiv = document.createElement("div");
    recipeDiv.classRecipe = "mt-3";

    // Ingredient Name Heading
    const ingredientNameHeading = document.createElement("h2");
    ingredientNameHeading.textContent = recipe.name;
    recipeDiv.appendChild(ingredientNameHeading);

    // // Ingredient Name Heading -> Delete Button
    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "Delete recipe";
    // deleteButton.className = "btn btn-warning ms-2";
    // deleteButton.addEventListener("click", () => onDeleteRecipe(recipe));
    // ingredientNameHeading.appendChild(deleteButton);

    // Ingredients Table
    recipeDiv.appendChild(renderIngredientsTable(recipe));

    // We return the <div> and it's appended on line 45
    return recipeDiv;
}

function renderIngredientsTable(meal) {
    const ingredientsTable = document.createElement("table");
    ingredientsTable.className = "table table-dark table-striped";
}