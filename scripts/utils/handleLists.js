async function handleLists(recipes) {
  clearCollapseInputs();

  const $ingredientsSearchBarEraseButton = document
    .getElementById("ingredients-collapse-list")
    .querySelector(".erase-collapse");
  const $appliancesSearchBarEraseButton = document
    .getElementById("appliances-collapse-list")
    .querySelector(".erase-collapse");
  const $utensilsSearchBarEraseButton = document
    .getElementById("utensils-collapse-list")
    .querySelector(".erase-collapse");

  const $ingredientsChoicesList = document
    .getElementById("ingredients-collapse")
    .querySelector(".collapse__container__choices");
  const $appliancesChoicesList = document
    .getElementById("appliances-collapse")
    .querySelector(".collapse__container__choices");
  const $utensilsChoicesList = document
    .getElementById("utensils-collapse")
    .querySelector(".collapse__container__choices");

  const $ingredientsChosenList = document
    .getElementById("ingredients-collapse")
    .querySelector(".collapse__container__chosen-items");
  const $appliancesChosenList = document
    .getElementById("appliances-collapse")
    .querySelector(".collapse__container__chosen-items");
  const $utensilsChosenList = document
    .getElementById("utensils-collapse")
    .querySelector(".collapse__container__chosen-items");
  const $mainChosenList = document.querySelector(
    ".search-section__selected-items-line"
  );

  //Récupération de la liste de recherche
  const chosenList = getRecipesSearchArray();

  //Constitution des listes de choix en fonction du type
  const chosenIngredientsList =
    chosenList
      .filter((obj) => obj.hasOwnProperty("ingredient"))
      .map((obj) => obj.ingredient) || [];
  const chosenAppliancesList =
    chosenList
      .filter((obj) => obj.hasOwnProperty("appliance"))
      .map((obj) => obj.appliance) || [];
  const chosenUtensilsList =
    chosenList
      .filter((obj) => obj.hasOwnProperty("utensil"))
      .map((obj) => obj.utensil) || [];
  // const chosenMainList =
  //   chosenList
  //     .filter((obj) => obj.hasOwnProperty("main"))
  //     .map((obj) => obj.main) || [];
  const chosenMainList = [];

  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient);
    });
    recipe.utensils.forEach((utensil) => {
      utensilsSet.add(utensil);
    });
    recipe.appliance && appliancesSet.add(recipe.appliance);
  });

  //Filtrage des listes en fonction des ingrédients déjà choisi
  const ingredientsList = Array.from(ingredientsSet).filter((ingredient) => {
    const regex = new RegExp(ingredient, "i");
    return !chosenIngredientsList.some((chosenIngredient) =>
      regex.test(chosenIngredient)
    );
  });
  const appliancesList = Array.from(appliancesSet).filter((appliance) => {
    const regex = new RegExp(appliance, "i");
    return !chosenAppliancesList.some((chosenAppliance) =>
      regex.test(chosenAppliance)
    );
  });
  const utensilsList = Array.from(utensilsSet).filter((utensil) => {
    const regex = new RegExp(utensil, "i");
    return !chosenUtensilsList.some((chosenUtensil) =>
      regex.test(chosenUtensil)
    );
  });

  //Ajout des event Listeners sur les inputs des collapses
  addAdvancedSearchEvent(ingredientsList, "ingredient");
  addAdvancedSearchEvent(appliancesList, "appliance");
  addAdvancedSearchEvent(utensilsList, "utensil");

  $ingredientsSearchBarEraseButton.onclick = () => {
    document.getElementById("ingredients-search-bar").value = "";
    $ingredientsSearchBarEraseButton.setAttribute("aria-hidden", "true");
    $ingredientsSearchBarEraseButton.style.display = "none";
    displayChoicesList(
      $ingredientsChoicesList,
      ingredientsList,
      "availableItems",
      "ingredient"
    );
  };
  $appliancesSearchBarEraseButton.onclick = () => {
    document.getElementById("appliances-search-bar").value = "";
    $appliancesSearchBarEraseButton.setAttribute("aria-hidden", "true");
    $appliancesSearchBarEraseButton.style.display = "none";
    displayChoicesList(
      $appliancesChoicesList,
      appliancesList,
      "availableItems",
      "appliance"
    );
  };
  $utensilsSearchBarEraseButton.onclick = () => {
    document.getElementById("utensils-search-bar").value = "";
    $utensilsSearchBarEraseButton.setAttribute("aria-hidden", "true");
    $utensilsSearchBarEraseButton.style.display = "none";
    displayChoicesList(
      $utensilsChoicesList,
      utensilsList,
      "availableItems",
      "utensil"
    );
  };

  //Affichage des listes
  displayChoicesList(
    $ingredientsChoicesList,
    ingredientsList,
    "availableItems",
    "ingredient"
  );
  displayChoicesList(
    $appliancesChoicesList,
    appliancesList,
    "availableItems",
    "appliance"
  );
  displayChoicesList(
    $utensilsChoicesList,
    utensilsList,
    "availableItems",
    "utensil"
  );
  displayChoicesList(
    $ingredientsChosenList,
    chosenIngredientsList,
    "selectedItems",
    "ingredient"
  );
  displayChoicesList(
    $appliancesChosenList,
    chosenAppliancesList,
    "selectedItems",
    "appliance"
  );
  displayChoicesList(
    $utensilsChosenList,
    chosenUtensilsList,
    "selectedItems",
    "utensil"
  );

  displayChoicesList($mainChosenList, chosenMainList, "selectedItems", "main");
}
