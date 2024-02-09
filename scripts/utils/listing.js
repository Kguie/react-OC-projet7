async function handleLists(recipes) {
  const recipesFullList = recipes ? recipes : await getRecipes(); //Remplacer ça par le choix entre la liste filtrée*
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
  const chosenMainList =
    chosenList
      .filter((obj) => obj.hasOwnProperty("main"))
      .map((obj) => obj.main) || [];

  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  recipesFullList.forEach((recipe) => {
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

/**
 * Affiche les listes de choix au niveau des accordions
 */
function displayChoicesList($listNode, list, type, category) {
  //Nettoyage de la liste avant tout changement
  $listNode.innerHTML = "";
  if (type === "availableItems") {
    list.forEach((element) => {
      const $choiceItem = document.createElement("li");
      addEventOnChoiceItem($choiceItem, element, type, category);
      $choiceItem.classList.add("collapse__container__choices__item");
      $choiceItem.textContent = element;
      $listNode.appendChild($choiceItem);
    });
  } else {
    if (!list.length) {
      $listNode.style.display = "none";
      return;
    }
    $listNode.style.display = "flex";
    if (category === "main") {
      list.forEach((element) => {
        const $choiceItem = document.createElement("div");
        addEventOnChoiceItem($choiceItem, element, type, category);
        $choiceItem.classList.add("search-section__selected-items-line__item");

        const $labelWrapper = document.createElement("div");
        $labelWrapper.classList.add(
          "search-section__selected-items-line__item__label"
        );
        const $label = document.createElement("p");
        $label.textContent = element;

        const $eraseButton = document.createElement("img");
        $eraseButton.alt = "Enlever le choix";
        $eraseButton.src = "../../assets/icons/close-black.svg";

        $labelWrapper.appendChild($label);
        $labelWrapper.appendChild($eraseButton);
        $choiceItem.appendChild($labelWrapper);
        $listNode.appendChild($choiceItem);
      });
      return;
    }
    list.forEach((element) => {
      const $choiceItem = document.createElement("li");
      addEventOnChoiceItem($choiceItem, element, type, category);
      $choiceItem.classList.add("collapse__container__chosen-items__item");

      const $label = document.createElement("p");
      $label.classList.add("collapse__container__chosen-items__item__label");
      $label.textContent = element;

      const $eraseButton = document.createElement("img");
      $eraseButton.classList.add(
        "collapse__container__chosen-items__item__erase-button"
      );
      $eraseButton.alt = "Enlever le choix";
      $eraseButton.src = "../../assets/icons/circle-close.svg";

      $label.appendChild($eraseButton);
      $choiceItem.appendChild($label);

      $listNode.appendChild($choiceItem);
    });
  }
}

/**
 * Ajoute les fonctions au click sur les choix au niveau des accordions
 */
function addEventOnChoiceItem($itemNode, label, type, category) {
  if (type === "availableItems") {
    $itemNode.onclick = async () => {
      addKeyToRecipesSearchArray({ [category]: label });
      await handleLists();
    };
  } else {
    $itemNode.onclick = async () => {
      removeKeyFromRecipesSearchArray({ [category]: label });
      await handleLists();
    };
  }
}
