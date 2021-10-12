/***** Data *****/

const meals = [];

/***** Event Listeners *****/

// This is triggered when we click the button on line 19 of index.html
function onAddMeal() {
    const newMeal = {
        name: document.getElementById("meal-name-input").value,
        ingredients: []
    }
    meals.push(newMeal);
    renderApp();
}

// This is triggered when we click the button created by the renderMeal() function on line 56
function onDeleteMeal(meal) {
    const index = meals.indexOf(meal);
    meals.splice(index, 1);
    renderApp();
}

// This is triggered when we click the button created by the renderIngredientsTable() function on line 118
function onAddIngredient(meal, ingredient) {
    meal.ingredients.push(ingredient);
    renderApp();
}

// This is triggered when we click the button created by the renderMemberRow() function on line 148
function onDeleteMember(meal, ingredient) {
    let index = meal.ingredients.indexOf(ingredient);
    meal.ingredients.splice(index, 1);
    renderApp();
}

/***** Render Functions *****/

// This is the top-level function, that calls the other render functions (or calls functions that call functions)
function renderApp() {
    const mealsDiv = document.getElementById("meals");
    emptyElement(mealsDiv);
    for(let meal of meals) {
        mealsDiv.appendChild( renderMeal(meal) );
    }
}

function renderMeal(meal) {
    const mealDiv = document.createElement("div");
    mealDiv.classMeal = "mt-3";

    // Ingredient Name Heading
    const ingredientNameHeading = document.createElement("h2");
    ingredientNameHeading.textContent = meal.name;
    mealDiv.appendChild(ingredientNameHeading);

    // Ingredient Name Heading -> Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Meal";
    deleteButton.className = "btn btn-warning ms-2";
    deleteButton.addEventListener("click", () => onDeleteMeal(meal));
    ingredientNameHeading.appendChild(deleteButton);

    // Ingredients Table
    mealDiv.appendChild( renderIngredientsTable(meal) );

    // We return the <div> and it's appended on line 45
    return mealDiv;
}

function renderIngredientsTable(meal) {
    const ingredientsTable = document.createElement("table");
    ingredientsTable.className = "table table-dark table-striped";

    // Header Row
    const headerRow = ingredientsTable.insertRow(0);

    // Header Row -> Name Label Cell
    const ingredientNameLabelCell = document.createElement("th");
    ingredientNameLabelCell.textContent = "Ingredient Name"
    headerRow.appendChild(ingredientNameLabelCell);

    // Header Row -> Add to Grocery List? Label Cell
    const groceryListLabelCell = document.createElement("th");
    groceryListLabelCell.textContent = "Add to Grocery List?"
    headerRow.appendChild(groceryListLabelCell);

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

    // Form Row -> Grocery List Input Cell
    const groceryListInputCell = document.createElement('td');
    formRow.appendChild(groceryListInputCell)

    //Form Row -> Grocery List Input Cell -> Grocery List Input
    const groceryListInput = document.createElement('input');
    groceryListInput.type = "text";
    groceryListInput.className = "form-control";
    groceryListInputCell.appendChild(groceryListInput);

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
            groceryList: groceryListInput.value // and what groceryListInput was pointing to when it was created
        }
        onAddIngredient(meal, ingredient) // This way onAddMealMember() doesn't need to know how the form is set up
    })
    addButtonCell.appendChild(addButton);

    // Ingredient Rows
    for(let ingredient of meal.ingredients) {
        ingredientsTable.firstElementChild.appendChild( renderIngredientRow(meal, ingredient) ) // firstElementChild is grabbing the <tbody>
    }

    return ingredientsTable; // We return the <table> and it's appended on line 66
}

function renderIngredientRow(meal, ingredient) {
    const ingredientRow = document.createElement("tr");

    // Data Cells
    ingredientRow.insertCell(0).textContent = ingredient.ingredientName;
    ingredientRow.insertCell(1).textContent = ingredient.groceryList;

    // Delete Cell
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => 
        onDeleteMember(meal, ingredient)
    );
    ingredientRow.insertCell(2).appendChild(deleteButton)

    return ingredientRow; // We return the <tr> and it's appended on line 135
}

/***** Helpers *****/

function emptyElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}