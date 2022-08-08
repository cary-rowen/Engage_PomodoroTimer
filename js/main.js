let isAbsorbing = false;
let finishTime = 0;
let finishedPomodoro = 0;
let totalPomodoro;
let absorbTime;
let restTime;
let timeRemainControl = document.querySelector("#remainingTime");
let finishedPomodoroControl = document.querySelector("#finishedPomodoro");
let remainPomodoroControl = document.querySelector("#remainingPomodoro");
let countdownTimerId = null;
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
let startBTN = document.querySelector("#startBTN");
startBTN.addEventListener("click", () => {
  totalPomodoro = +document.querySelector("#pomodoroNumber").value;
  absorbTime = toMS(+document.querySelector("#absorbTime").value);
  restTime = toMS(+document.querySelector("#restTime").value);
  executeTimingCycle();
  showOrHide("configPanel", "hide");
  countdownTimerId = setInterval(() => {
    let timeLeft = toHMS(finishTime - Date.now());
    let pomodoroLeft = totalPomodoro - finishedPomodoro;
    remainPomodoroControl.textContent = `剩余番茄个数：\
    ${pomodoroLeft}`;
    finishedPomodoroControl.textContent = `已完成的番茄个数：\
    ${finishedPomodoro}`;
    timeRemainControl.textContent = `剩余时间：\
    ${timeLeft.hours} 时 ${timeLeft.minutes} 分 ${timeLeft.seconds} 秒`;
  }, 1000);
  showOrHide("absorbPanel", "show");
});
