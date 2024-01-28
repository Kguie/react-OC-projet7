/**
 *Crée la carte de la recette dans le DOM
 */
function getRecipeCardDom(recipe) {
  const $recipeCard = document.createElement("article");
  const $imgSection = document.createElement("div");
  const $bodySection = document.createElement("div");
  const $title = document.createElement("h2");
  const $description = document.createElement("div");
  const $ingredients = document.createElement("div");
  const $ingredientsTitle = document.createElement("p");
  const $listContainer = document.createElement("ul");

  $recipeCard.classList.add("recipe-card");
  $imgSection.classList.add("recipe-card__img-container");
  $bodySection.classList.add("recipe-card__body");
  $description.classList.add("recipe-card__body__description");
  $ingredients.classList.add("recipe-card__body__ingredients");
  $ingredientsTitle.classList.add("recipe-card__body__title");
  $listContainer.classList.add("recipe-card__body__ingredients__list");

  $imgSection.innerHTML = `<img alt="recette n° ${
    recipe.id
  }" class="recipe-card__img-container__img" src="assets/${
    recipe.image ? "photos/" + recipe.image : "default.png"
  }"/>
  <div class="recipe-card__timer-container">
      <p aria-label="temps de préparation" class="recipe-card__timer-container__timer">${
        recipe.time
      }min</p>
  </div>`;
  $title.textContent = recipe.name;
  $description.innerHTML = `<p class="recipe-card__body__title">RECETTE</p>
    <p class="recipe-card__body__description__text">${recipe.description}</p> `;
  $ingredientsTitle.textContent = "Ingrédients";
  setDOMIngredientsList($listContainer, recipe.ingredients);

  $ingredients.appendChild($ingredientsTitle);
  $ingredients.appendChild($listContainer);
  $bodySection.appendChild($title);
  $bodySection.appendChild($description);
  $bodySection.appendChild($ingredients);
  $recipeCard.appendChild($imgSection);
  $recipeCard.appendChild($bodySection);

  return $recipeCard;
}

/**
 * Créée la liste d'ingrédients pour la carte dans le DOM
 */
function setDOMIngredientsList(ingredientsNode, ingredientsList) {
  ingredientsList.forEach((ingredient) => {
    const $ingredient = document.createElement("li");
    $ingredient.classList.add("ingredient");
    $ingredient.innerHTML = `<p class="ingredient__title">${
      ingredient.ingredient
    }</p>
    <p class="ingredient__content">${ingredient.quantity || ""}${
      ingredient.unit || ""
    }</p>
    `;
    ingredientsNode.appendChild($ingredient);
  });
}
