// THIS Code is all working!!!
// ====================================
const recipes = [];

// This is triggered when we click the button on line 19 of index.html
function onAddRecipe() {
    const newRecipe = {
        name: document.getElementById("recipe-name-input").value,
        ingredients: []
    }
    recipes.push(newRecipe);
    renderApp();
}

// This is triggered when we click the button created by the renderRecipe() function on line 56
function onDeleteRecipe(recipe) {
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    renderApp();
}

// This is triggered when we click the button created by the renderIngredientsTable() function on line 118
function onAddIngredient(recipe, ingredient) {
    recipe.ingredients.push(ingredient);
    renderApp();
}

// This is triggered when we click the button created by the renderMemberRow() function on line 148
function onDeleteMember(recipe, ingredient) {
    let index = recipe.ingredients.indexOf(ingredient);
    recipe.ingredients.splice(index, 1);
    renderApp();
}

/***** Render Functions *****/

// This is the top-level function, that calls the other render functions (or calls functions that call functions)
function renderApp() {
    const recipesDiv = document.getElementById("recipes");
    emptyElement(recipesDiv);
    for (let recipe of recipes) {
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

    // Ingredient Name Heading -> Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Recipe";
    deleteButton.className = "btn btn-warning ms-2";
    deleteButton.addEventListener("click", () => onDeleteRecipe(recipe));
    ingredientNameHeading.appendChild(deleteButton);

    // Ingredients Table
    recipeDiv.appendChild(renderIngredientsTable(recipe));

    // We return the <div> and it's appended on line 45
    return recipeDiv;
}

function renderIngredientsTable(recipe) {
    const ingredientsTable = document.createElement("table");
    ingredientsTable.className = "table table-dark table-striped";

    // Header Row
    const headerRow = ingredientsTable.insertRow(0);

    // Header Row -> Name Label Cell
    const ingredientNameLabelCell = document.createElement("th");
    ingredientNameLabelCell.textContent = "Ingredient Name"
    headerRow.appendChild(ingredientNameLabelCell);

    // Header Row -> Add to recipe List? Label Cell
    const recipelistLabelCell = document.createElement("th");
    recipeListLabelCell.textContent = "Quantity"
    headerRow.appendChild(recipeListLabelCell);

    // Header Row -> Create Label Cell (empty placeholder)
    const createLabelCell = document.createElement("th");
    headerRow.appendChild(createLabelCell);

    // Form Row
    const formRow = ingredientsTable.insertRow(1);

    // Form Row -> Name Input Cell
    const ingredientNameInputCell = document.createElement('td');
    formRow.appendChild(ingredientNameInputCell);

    // Form Row -> Name Input Cell -> Name Input
    const ingredientNameInput = document.createElement('input');
    ingredientNameInput.type = "text";
    ingredientNameInput.className = "form-control";
    ingredientNameInputCell.appendChild(ingredientNameInput);

    // Form Row -> recipe List Input Cell
    const recipeListInputCell = document.createElement('td');
    formRow.appendChild(recipeListInputCell)

    //Form Row -> recipe List Input Cell -> recipe List Input
    const recipeListInput = document.createElement('input');
    recipeListInput.type = "text";
    recipeListInput.className = "form-control";
    recipeListInputCell.appendChild(recipeListInput);

    // Form Row -> Create Button Cell
    let addButtonCell = document.createElement('td');
    formRow.appendChild(addButtonCell);

    // Form Row -> Create Button Cell -> Create Button
    const addButton = document.createElement("button");
    addButton.className = "btn btn-info";
    addButton.textContent = "Add";
    addButton.addEventListener("click", () => {
        const ingredient = {
            ingredientName: ingredientNameInput.value, // the function will remember what nameInput was pointing to when it was created
            recipeList: recipeListInput.value // and what recipeListInput was pointing to when it was created
        }
        onAddIngredient(recipe, ingredient) // This way onAddRecipeMember() doesn't need to know how the form is set up
    })
    addButtonCell.appendChild(addButton);

    // Ingredient Rows
    for (let ingredient of recipe.ingredients) {
        ingredientsTable.firstElementChild.appendChild(renderIngredientRow(recipe, ingredient)) // firstElementChild is grabbing the <tbody>
    }

    return ingredientsTable; // We return the <table> and it's appended on line 66
}

function renderIngredientRow(recipe, ingredient) {
    const ingredientRow = document.createElement("tr");

    // Data Cells
    ingredientRow.insertCell(0).textContent = ingredient.ingredientName;
    ingredientRow.insertCell(1).textContent = ingredient.recipeList;

    // Delete Cell
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
        onDeleteMember(recipe, ingredient)
    );
    ingredientRow.insertCell(2).appendChild(deleteButton)

    return ingredientRow; // We return the <tr> and it's appended on line 135
}

/***** Helpers *****/

function emptyElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}