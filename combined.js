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
} //Added the above 3 functions

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
    //Copied Billy's button and inserted here
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Recipe";
    deleteButton.className = "btn btn-warning";
    deleteButton.addEventListener("click", () => onDeleteRecipe(recipe));
    ingredientNameHeading.appendChild(deleteButton);
    recipeDiv.appendChild(renderIngredientsTable(recipe));

    return recipeDiv;
}
//This entire function is from Lex's original code.  I'm sure there's a much easier way to generate the table, most likely by defining it in bootstrap and referencing it with a little JS.
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
//James' code
// let id = 0;

// document.getElementById('add').addEventListener('click', () => {
//     let table = document.getElementById('list');
//     let row = table.insertRow(1);
//     row.setAttribute('id', `item-${id}`);
//     row.insertCell(0).innerHTML = document.getElementById('ingredient').value;
//     row.insertCell(1).innerHTML = document.getElementById('amount').value;
//     let actions = row.insertCell(2);
//     actions.appendChild(createDeleteButton(id++)); 
// })


// function createDeleteButton(id) {
//     let btn = document.createElement('button');
//     btn.className = 'btn btn-primary';
//     btn.id = id;
//     btn.innerHTML = 'Remove';
//     btn.onclick = () => {
//         let elementToDelete = document.getElementById(`item-${id}`)
//         elementToDelete.parentNode.removeChild(elementToDelete);
//     };
//     return btn;
// }



//Billy's code 144-158
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

    //Jon's code 161-178
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
//We still need a function to clear the input field for recipes