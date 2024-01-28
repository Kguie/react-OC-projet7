function displayRecipes(recipesList) {
  const $recipesContainer = document.querySelector(".recipes-section");
  recipesList.forEach((recipe) => {
    $recipesContainer.appendChild(getRecipeCardDom(recipe));
  });
}

function displayCollapses() {
  const $ingredientsCollapse = document.getElementById("ingredients-collapse");
  const $appliancesCollapse = document.getElementById("appliances-collapse");
  const $utensilsCollapse = document.getElementById("utensils-collapse");

  $ingredientsCollapse.querySelector("button").onclick = () => {
    handleCollapse($ingredientsCollapse);
  };
  $appliancesCollapse.querySelector("button").onclick = () => {
    handleCollapse($appliancesCollapse);
  };
  $utensilsCollapse.querySelector("button").onclick = () => {
    handleCollapse($utensilsCollapse);
  };
}

async function init() {
  const recipesFullList = await getRecipes();
  displayRecipes(recipesFullList);
  displayCollapses();
}

init();
