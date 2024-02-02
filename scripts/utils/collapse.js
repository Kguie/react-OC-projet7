/**
 * Gère l'ouverture et la fermeture du collapse avec animation
 */
function handleCollapse(collapseNode) {
  const $collapseContainer = collapseNode.querySelector(".collapse__container");
  const $collapseButton = collapseNode.querySelector("button");
  const $icon = collapseNode.querySelector(".collapse__icon");
  const isOpen = collapseNode.querySelector(".collapse__container--open")
    ? true
    : false;

  if (!isOpen) {
    collapseNode.ariaExpanded = true;
    $collapseContainer.setAttribute("aria-hidden", false);
    $collapseButton.style.borderBottomLeftRadius = 0;
    $collapseButton.style.borderBottomRightRadius = 0;

    //Le collapse devient visible
    $collapseContainer.style.opacity = 1;
    $collapseContainer.classList.add("collapse__container--open");
    $icon.style.transform = "rotate(180deg)";
  } else {
    collapseNode.ariaExpanded = false;
    $collapseContainer.classList.remove("collapse__container--open");
    $collapseContainer.setAttribute("aria-hidden", false);
    $icon.style.transform = "rotate(0deg)";

    //Permet le retour des bords arrondis du bouton à la fin de l'animation et la disparition des autres boutons
    setTimeout(() => {
      $collapseButton.style.borderBottomLeftRadius = "11px";
      $collapseButton.style.borderBottomRightRadius = "11px";
      $collapseContainer.style.opacity = 0;
    }, 100);
  }
}
