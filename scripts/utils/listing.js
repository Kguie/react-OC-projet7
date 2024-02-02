function getAndDisplayChoicesLists(recipes) {
  const $ingredientsListChoices = document
    .getElementById("ingredients-collapse")
    .querySelector(".collapse__container__choices");
  const $appliancesListChoices = document
    .getElementById("appliances-collapse")
    .querySelector(".collapse__container__choices");
  const $utensilsListChoices = document
    .getElementById("utensils-collapse")
    .querySelector(".collapse__container__choices");

  const chosenList = [];

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

  const ingredientsList = Array.from(ingredientsSet);
  const appliancesList = Array.from(appliancesSet);
  const utensilsList = Array.from(utensilsSet);

  displayChoicesList($ingredientsListChoices, ingredientsList);
  displayChoicesList($appliancesListChoices, appliancesList);
  displayChoicesList($utensilsListChoices, utensilsList);
}

function displayChoicesList($listNode, list, listType) {
  list.forEach((element) => {
    const $choiceItem = document.createElement("li");
    $choiceItem.classList.add("collapse__container__choices__item");
    $choiceItem.textContent = element;
    $listNode.appendChild($choiceItem);
  });
}
