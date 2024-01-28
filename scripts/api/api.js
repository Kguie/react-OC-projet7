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
