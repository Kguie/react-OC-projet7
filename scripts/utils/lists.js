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

  const tagList = [
    ...chosenUtensilsList,
    ...chosenAppliancesList,
    ...chosenIngredientsList,
  ];

  function capitalizeFirstLetterOfSentence(text) {
    const sentence = text.split(" ");

    for (let i = 0; i < sentence.length; i++) {
      sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
    }

    return sentence.join(" ");
  }

  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(
        capitalizeFirstLetterOfSentence(
          ingredient.ingredient.trim().toLowerCase()
        )
      );
    });
    recipe.utensils.forEach((utensil) => {
      utensilsSet.add(
        capitalizeFirstLetterOfSentence(utensil.trim().toLowerCase())
      );
    });
    recipe.appliance &&
      appliancesSet.add(
        capitalizeFirstLetterOfSentence(recipe.appliance.trim().toLowerCase())
      );
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

  displayChoicesList($mainChosenList, tagList, "selectedItems", "main");
}

/**
 * Affiche les listes de choix
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
    //Trouver solution ici
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
 * Ajoute les fonctions au click sur les choix
 */
function addEventOnChoiceItem($itemNode, label, type, category) {
  if (category === "main") {
    const searchArray = getRecipesSearchArray();
    const mainObject = searchArray?.find((object) => {
      const value = Object.values(object)[0].toLowerCase();
      if (value.includes(label.toLowerCase())) {
        return true;
      }
    });
    if (mainObject) {
      const mainObjectCategory = Object.keys(mainObject)[0].toLowerCase();
      $itemNode.onclick = async () => {
        removeKeyFromRecipesSearchArray({ [mainObjectCategory]: label });
        await handleSearch();
      };
    }
    return;
  }
  if (type === "availableItems") {
    $itemNode.onclick = async () => {
      addKeyToRecipesSearchArray({ [category]: label });
      await handleSearch();
    };
  } else {
    $itemNode.onclick = async () => {
      removeKeyFromRecipesSearchArray({ [category]: label });
      await handleSearch();
    };
  }
}

function clearCollapseInputs() {
  document.getElementById("ingredients-search-bar").value = "";
  document.getElementById("utensils-search-bar").value = "";
  document.getElementById("appliances-search-bar").value = "";

  const $eraseIcons = document.querySelectorAll(".erase-collapse");
  $eraseIcons.forEach(($eraseIcon) => {
    $eraseIcon.style.display = "none";
    $eraseIcon.setAttribute("aria-hidden", "true");
  });
}
