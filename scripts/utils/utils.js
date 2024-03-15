function addClearInput(inputNode, eraseNode, recipes) {
  eraseNode.onclick = (e) => {
    const searchArray = getRecipesSearchArray();
    const mainObject = searchArray?.find((searchObject) => searchObject.main);
    if (mainObject) {
      removeKeyFromRecipesSearchArray(mainObject);
      handleSearch(recipes);
    }
    inputNode.value = "";
    eraseNode.style.display = "none";
  };
}

/**
 * Gère l'apparition et la disparition de l’icône d'effacement
 */
function handleEraseIcon(text, eraseNode) {
  if (text.length) {
    eraseNode.style.display = "block";
  } else {
    eraseNode.style.display = "none";
  }
}

function addMainSearchEvent(recipes) {
  const $mainSearchBarButton = document.querySelector(
    ".google-container--hover"
  );
  const $mainSearchBarEraseButton = document.querySelector(".erase-icon");

  const regex = /^[a-zA-ZÀ-ÿ\s',]+$/;

  function research() {
    const $mainSearchBar = document.getElementById("search-bar");

    //Vérifie que l'objet de recherche main est présent
    const searchArray = getRecipesSearchArray();
    const mainObject = searchArray?.find((searchObject) => searchObject.main);

    if (
      !$mainSearchBar.value ||
      ($mainSearchBar.value &&
        ($mainSearchBar.value.length < 3 ||
          $mainSearchBar.value.length > 50)) ||
      !regex.test($mainSearchBar.value)
    ) {
      if (mainObject) {
        removeKeyFromRecipesSearchArray(mainObject);
        handleSearch(recipes);
      }
      return;
    }
    if (mainObject) {
      removeKeyFromRecipesSearchArray(mainObject);
    }
    //Ajouter ici la fonction pour qu'il n'y ai qu'un seul objet main
    addKeyToRecipesSearchArray({ main: $mainSearchBar.value });
    // $mainSearchBar.value = "";
    // $mainSearchBarEraseButton.setAttribute("aria-hidden", true);
    // $mainSearchBarEraseButton.style.display = "none";
    handleSearch(recipes);
  }

  // $mainSearchBarButton.onclick = () => research();
  // document.getElementById("search-bar").onkeydown = (event) => {
  //   const key = event.key;
  //   if (key === "Enter") {
  //     research();
  //     return;
  //   }
  // };

  //Gère la recherche à l'input
  document.getElementById("search-bar").oninput = (event) => {
    if (!regex.test(event.data)) {
      document.getElementById("search-bar").value = event.target.value.slice(
        0,
        event.target.value.length - 1
      );
    } else {
      research();
    }
  };
}

function addAdvancedSearchEvent(list, category) {
  const regex = /^[a-zA-ZÀ-ÿ\s',]+$/;

  function handleSort(event) {
    const $collapse = document.getElementById(`${category}s-collapse`);
    const $listNode = $collapse.querySelector(".collapse__container__choices");

    if (
      !event.target.value ||
      (event.target.value &&
        (event.target.value.length < 3 || event.target.value.length > 50)) ||
      !regex.test(event.target.value)
    ) {
      if (event.target.value.length < 3) {
        displayChoicesList($listNode, list, "availableItems", category);
      }
      return;
    }
    const filteredList =
      list && list.length
        ? list.filter((element) =>
            element.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : [];
    displayChoicesList($listNode, filteredList, "availableItems", category);
  }

  document.getElementById(`${category}s-search-bar`).oninput = (e) => {
    if (!regex.test(e.data)) {
      document.getElementById(`${category}s-search-bar`).value =
        e.target.value.slice(0, e.target.value.length - 1);
    } else {
      handleSort(e);
    }
  };
}
