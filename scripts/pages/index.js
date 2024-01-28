function displayRecipes(recipesList) {
  const $recipesContainer = document.querySelector(".recipes-section");
  recipesList.forEach((recipe) => {
    $recipesContainer.appendChild(getRecipeCardDom(recipe));
  });
}

async function init() {
  const recipesFullList = await getRecipes();
  displayRecipes(recipesFullList);
}

init();
