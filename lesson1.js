document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById("recipe-form");
    const recipeList = document.getElementById("recipe-list");

    // Handle recipe form submission
    if (recipeForm) {
        recipeForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;

            // Check if both title and description are filled
            if (!title || !description) {
                alert("Wszystkie pola muszą być wypełnione.");
                return;
            }

            const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
            recipes.push({ title, description });
            localStorage.setItem("recipes", JSON.stringify(recipes));

            window.location.href = "przepisy.html"; // Redirect after saving
        });
    }

    // Handle recipe list display
    if (recipeList) {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipeList.innerHTML = "";

        if (recipes.length === 0) {
            recipeList.innerHTML = "<p>Brak dodanych przepisów.</p>";
        } else {
            recipes.forEach((recipe, index) => {
                const div = document.createElement("div");
                div.classList.add("recipe-item"); // Add class for styling
                div.innerHTML = `
                    <h3>Przepis ${index + 1}: ${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button onclick="editRecipe(${index})">Edytuj</button>
                    <button onclick="deleteRecipe(${index})">Usuń</button>
                `;
                recipeList.appendChild(div);
            });
        }
    }

    // Edit recipe function
    window.editRecipe = function(index) {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const recipe = recipes[index];
        document.getElementById("title").value = recipe.title;
        document.getElementById("description").value = recipe.description;

        // Modify the form to update instead of adding a new recipe
        recipeForm.addEventListener("submit", function(event) {
            event.preventDefault();
            recipe.title = document.getElementById("title").value;
            recipe.description = document.getElementById("description").value;

            recipes[index] = recipe;
            localStorage.setItem("recipes", JSON.stringify(recipes));

            window.location.href = "przepisy.html"; // Redirect after editing
        });
    };

    // Delete recipe function
    window.deleteRecipe = function(index) {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.splice(index, 1); // Remove recipe at the given index
        localStorage.setItem("recipes", JSON.stringify(recipes));

        // Re-render the recipe list
        window.location.reload();
    };
});

// Function to clear all recipes     
function clearAllRecipes() {
    if (confirm("Czy na pewno chcesz usunąć wszystkie przepisy?")) {
        localStorage.removeItem("recipes");
        window.location.reload();
    }
}

