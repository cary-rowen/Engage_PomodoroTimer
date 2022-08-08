function showOrHide(id, operation) {
  /**
   * @param {string} the id of element that will be operated.
   * @param {string} "hide" or "show" - refers to operation that will be applied to the element
   * @return {void}
   */
  let control = document.getElementById(id);
  if (operation == "show") {
    control.classList.remove("hidden");
    control.focus();
  } else if (operation == "hide") {
    control.classList.add("hidden");
  }
}
