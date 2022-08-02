// 强制使用整数配置
let configPanel = document.querySelector("#configPanel");
configPanel.addEventListener("input", (e) => {
  //alert(e.target.tagName);
  if (e.target.value) {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    //console.log(e.target.value);
    //此处 edge 和 Firefox 行为有不同，待讨论
  }
});
let newBTN = document.querySelector("#newBTN");
newBTN.addEventListener("click", () => {
  showOrHide("startPanel", "hide");
  showOrHide("configPanel", "show");
});
