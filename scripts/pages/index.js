function displayRecipes(recipesList) {
  const $recipesContainer = document.querySelector(".recipes-section");
  //Nettoyage du container
  $recipesContainer.innerHTML = "";
  recipesList.forEach((recipe) => {
    $recipesContainer.appendChild(getRecipeCardDom(recipe));
  });
}

function displayCollapses() {
  const $ingredientsCollapse = document.getElementById("ingredients-collapse");
  const $appliancesCollapse = document.getElementById("appliances-collapse");
  const $utensilsCollapse = document.getElementById("utensils-collapse");

  //Ajout des event-listeners pour l'ouverture des collapses
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
  //Réinitialisation des recherches
  resetSearchArray();

  const recipesFullList = await getRecipes();
  displayRecipes(recipesFullList);
  displayCollapses();
  await handleLists(recipesFullList);

  //Ajout des event-listeners au niveau des inputs de recherche
  const $mainSearchBar = document.getElementById("search-bar");
  const $mainSearchBarEraseButton = document.querySelector(".erase-icon");

  const $ingredientsSearchBar = document.getElementById(
    "ingredients-search-bar"
  );
  const $ingredientsSearchBarEraseButton = document
    .getElementById("ingredients-collapse-list")
    .querySelector(".erase-collapse");

  const $appliancesSearchBar = document.getElementById("appliances-search-bar");
  const $appliancesSearchBarEraseButton = document
    .getElementById("appliances-collapse-list")
    .querySelector(".erase-collapse");

  const $utensilsSearchBar = document.getElementById("utensils-search-bar");
  const $utensilsSearchBarEraseButton = document
    .getElementById("utensils-collapse-list")
    .querySelector(".erase-collapse");

  $mainSearchBar.addEventListener("input", (e) => {
    const text = e.target.value;
    handleEraseIcon(text, $mainSearchBarEraseButton);
  });

  addMainSearchEvent(recipesFullList);

  $ingredientsSearchBar.addEventListener("input", (e) => {
    const text = e.target.value;
    handleEraseIcon(text, $ingredientsSearchBarEraseButton);
  });

  $appliancesSearchBar.addEventListener("input", (e) => {
    const text = e.target.value;
    handleEraseIcon(text, $appliancesSearchBarEraseButton);
  });

  $utensilsSearchBar.addEventListener("input", (e) => {
    const text = e.target.value;
    handleEraseIcon(text, $utensilsSearchBarEraseButton);
  });

  addClearInput($mainSearchBar, $mainSearchBarEraseButton, recipesFullList);

  launchRecipesCount(recipesFullList);
}

init();
