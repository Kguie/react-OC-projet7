async function handleSearch(recipes) {
  let searchList = await getRecipesSearchArray();
  let recipesList = recipes || (await getRecipes()) || [];
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
  launchRecipesCount(recipesList, searchList);
}

function launchRecipesCount(recipeList, searchList) {
  // const $recipesList = document.querySelectorAll(".recipe-card");
  const $counter = document.querySelector(
    ".search-section__choices-line__recipes-counter"
  );
  $counter.textContent = `${recipeList?.length || 0} recette${
    (recipeList?.length || 0) > 1 ? "s" : ""
  }`;
  displayNoRecipesFounded(recipeList, searchList);
}

function displayNoRecipesFounded(recipeList, searchList) {
  const $disclaimer = document.querySelector(".disclaimer__empty");
  const $disclaimerKey = document.querySelector(".disclaimer__empty__key");

  const mainElement = searchList?.find((element) => element.main);

  if (mainElement && (recipeList.length || 0) === 0) {
    $disclaimer.style.display = "block";
    $disclaimerKey.textContent = mainElement.main;
  } else {
    $disclaimer.style.display = "none";
    $disclaimerKey.textContent = "";
  }
}

/**
 * Principale fonction de recherche
 */
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
