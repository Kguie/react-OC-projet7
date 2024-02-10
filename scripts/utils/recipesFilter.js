async function handleSearch(recipes) {
  let searchList = getRecipesSearchArray();
  let recipesList = recipes || (await getRecipes());
  if (searchList.length) {
    searchList.forEach((element) => {
      if (recipesList.length) {
        recipesList = filterRecipes(element, recipesList);
      } else {
        return;
      }
    });
  }
  await handleLists(recipesList);
  displayRecipes(recipesList);
  launchRecipesCount();
}

function launchRecipesCount() {
  const $recipesList = document.querySelectorAll(".recipe-card");
  const $counter = document.querySelector(
    ".search-section__choices-line__recipes-counter"
  );
  $counter.textContent = `${$recipesList.length} recette${
    $recipesList.length > 1 ? "s" : ""
  }`;
}

function filterRecipes(searchElement, recipes) {
  const key = Object.keys(searchElement)[0];
  const value = Object.values(searchElement)[0].toLowerCase();
  if (key === "main") {
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(value)
        )
    );
  } else if (key === "ingredient") {
    return recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(value)
      )
    );
  } else if (key === "appliance") {
    return recipes.filter((recipe) =>
      recipe.appliance?.toLowerCase().includes(value)
    );
  } else if (key === "utensil") {
    return recipes.filter((recipe) =>
      recipe.utensils.some((utensil) => utensil.toLowerCase().includes(value))
    );
  }
}
