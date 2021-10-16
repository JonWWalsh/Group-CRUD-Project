//Lex's code 2-46
const recipes = [];

function onAddRecipe() {
    const newRecipe = {
        name: document.getElementById("recipe-name-input").value,
        ingredients: []
    }
    recipes.push(newRecipe);
    renderApp();
}

function formClear(){
    document.getElementById("recipe-name-input").value = " ";
}

function onDeleteRecipe(recipe) {
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    renderApp();
}

function onAddIngredient(recipe, ingredient) {
    recipe.ingredients.push(ingredient);
    renderApp();
}

function onDeleteIngredient(recipe, ingredient) {
    let index = recipe.ingredients.indexOf(ingredient);
    recipe.ingredients.splice(index, 1);
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

function renderRecipe(recipe){
    const recipeDiv = document.createElement("div")
    recipeDiv.classMeal = "mt-3";

    const ingredientNameHeading = document.createElement("h2");
    ingredientNameHeading.textContent = recipe.name;
    recipeDiv.appendChild(ingredientNameHeading);
    // Billy's code 52-57
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Recipe";
    deleteButton.className = "btn btn-warning";
    deleteButton.addEventListener("click", () => onDeleteRecipe(recipe));
    ingredientNameHeading.appendChild(deleteButton);
    recipeDiv.appendChild(renderIngredientsTable(recipe));

    return recipeDiv;
}
//Jame's code.
function renderIngredientsTable(recipe) {
    const ingredientsTable = document.createElement("table");
    ingredientsTable.className = "table table-dark table-striped";

    const headerRow = ingredientsTable.insertRow(0);

    const ingredientNameLabelCell = document.createElement("th");
    ingredientNameLabelCell.textContent = "Ingredient Name"
    headerRow.appendChild(ingredientNameLabelCell);


    const recipeListLabelCell = document.createElement("th");
    recipeListLabelCell.textContent = "Amount"
    headerRow.appendChild(recipeListLabelCell);

    const createLabelCell = document.createElement("th");
    headerRow.appendChild(createLabelCell);

    const formRow = ingredientsTable.insertRow(1);

    const ingredientNameInputCell = document.createElement('td');
    formRow.appendChild(ingredientNameInputCell);

    const ingredientNameInput = document.createElement('input');
    ingredientNameInput.type = "text";
    ingredientNameInput.className = "form-control";
    ingredientNameInputCell.appendChild(ingredientNameInput);

    const recipeListInputCell = document.createElement('td');
    formRow.appendChild(recipeListInputCell)

    const recipeListInput = document.createElement('input');
    recipeListInput.type = "text";
    recipeListInput.className = "form-control";
    recipeListInputCell.appendChild(recipeListInput);

    let addButtonCell = document.createElement('td');
    formRow.appendChild(addButtonCell);
 
    const addButton = document.createElement("button");
    addButton.className = "btn btn-info";
    addButton.textContent = "Add";
    addButton.addEventListener("click", () => {
        const ingredient = {
            ingredientName: ingredientNameInput.value, 
            recipeList: recipeListInput.value
        }
        onAddIngredient(recipe, ingredient) 
    })
    addButtonCell.appendChild(addButton);

    for (let ingredient of recipe.ingredients) {
        ingredientsTable.firstElementChild.appendChild(renderIngredientRow(recipe, ingredient))
    }

    return ingredientsTable;
}

//Billy's code 122-135
function renderIngredientRow(recipe, ingredient) {
    const ingredientRow = document.createElement("tr");

    // Data Cells
    ingredientRow.insertCell(0).textContent = ingredient.ingredientName;
    ingredientRow.insertCell(1).textContent = ingredient.recipeList;

    // Delete Cell
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
        onDeleteIngredient(recipe, ingredient)
    );
    ingredientRow.insertCell(2).appendChild(deleteButton)

    //Jon's code 138-155
const list = document.getElementById("recipes");
const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.className = "btn btn-warning";
editButton.addEventListener("click", function() {
  list.contentEditable = true;
} );
ingredientRow.insertCell(2).appendChild(editButton)

const endButton = document.createElement("button");
endButton.textContent = "Save";
endButton.className = "btn btn-success";
endButton.addEventListener("click", function() {
  list.contentEditable = false;
} )
ingredientRow.insertCell(2).appendChild(endButton)
    return ingredientRow;
}


function emptyElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
