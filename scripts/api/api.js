//Renvoie les données de toutes les recettes
async function getRecipes() {
  try {
    const response = await fetch("../../data/recipes.json");
    const { recipes } = await response.json();
    return recipes || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Récupère la liste de recherche dans le local storage
 */
function getRecipesSearchArray() {
  const localStorageSearchArray = localStorage.getItem("recipesSearchArray");
  return localStorageSearchArray ? JSON.parse(localStorageSearchArray) : [];
}

/**
 * Ajoute un élément à la liste de recherche dans le local storage
 */
function addKeyToRecipesSearchArray(key) {
  const searchArray = getRecipesSearchArray();

  const existingKey = searchArray.find(
    (item) => JSON.stringify(item) === JSON.stringify(key)
  );

  if (!existingKey) {
    searchArray.push(key);
    localStorage.setItem("recipesSearchArray", JSON.stringify(searchArray));
  }
}

/**
 * Supprime un élément de la liste de recherche dans le local storage
 */
function removeKeyFromRecipesSearchArray(key) {
  const searchArray = getRecipesSearchArray();

  const indexToRemove = searchArray.findIndex(
    (item) => JSON.stringify(item) === JSON.stringify(key)
  );

  if (indexToRemove !== -1) {
    searchArray.splice(indexToRemove, 1);
    localStorage.setItem("recipesSearchArray", JSON.stringify(searchArray));
  }
}
