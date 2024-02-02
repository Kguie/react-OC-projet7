function addSearchInputEventListener(inputNode) {}

function addClearInput(inputNode, eraseNode) {
  eraseNode.onclick = (e) => {
    inputNode.value = "";
    eraseNode.style.display = "none";
  };
}

function handleEraseIcon(text, eraseNode) {
  if (text.length) {
    eraseNode.style.display = "block";
  } else {
    eraseNode.style.display = "none";
  }
}
