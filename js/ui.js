function operateUI(selector, callback) {
  let elementCollection = document.querySelectorAll(selector);
  callback(elementCollection);
}
