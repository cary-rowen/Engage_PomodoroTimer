function showOrHide(id, operation) {
  let control = document.getElementById(id);
  if (operation == "show") {
    control.classList.remove("hidden");
    control.focus();
  } else if (operation == "hide") {
    control.classList.add("hidden");
  }
}
