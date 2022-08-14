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
newBTN.addEventListener("click", () => operateUI("#configPanel", showPanel));
let startBTN = document.querySelector("#startBTN");
startBTN.addEventListener("click", () => {
  let isAbsorbing = false;
  let finishTime = 0;
  let finishedPomodoro = 0;
  let totalPomodoro;
  let absorbTime;
  let restTime;
  let timeRemainControl = document.querySelector("#remainingTime");
  let finishedPomodoroControl = document.querySelector("#finishedPomodoro");
  let remainPomodoroControl = document.querySelector("#remainingPomodoro");
  let summaryCaptionControl = document.querySelector("#summaryCaption");
  let summaryContentControl = document.querySelector("#summaryContent");
  let countdownTimerId = null;
  let startTime = Date.now();
  let stopTime;
  totalPomodoro = document.querySelector("#pomodoroNumber").value;
  absorbTime = toMS(document.querySelector("#absorbTime").value);
  restTime = toMS(document.querySelector("#restTime").value);
  function executeTimingCycle() {
    isAbsorbing = !isAbsorbing;
    if (isAbsorbing) {
      setStatus("专注中");
      finishTime = absorbTime + Date.now();
      setTimeout(executeTimingCycle, absorbTime);
    } else {
      finishTime = restTime + Date.now();
      finishedPomodoro++;
      setStatus("休息中");
      if (finishedPomodoro == totalPomodoro) {
        clearInterval(countdownTimerId);
        setStatus("已完成");
        stopTime = Date.now();
        showSummary();
        return;
      }
      setTimeout(executeTimingCycle, restTime);
    }
  }
  executeTimingCycle();

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
  operateUI("#absorbPanel", showPanel);

  function showSummary() {
    let totalTime = toHMS(stopTime - startTime);
    summaryCaptionControl.textContent = "好棒呀👍";
    summaryContentControl.textContent = `你在 \
    ${totalTime.hours} 小时， ${totalTime.minutes} 分钟内完成了 \
    ${totalPomodoro} 个番茄钟，\
    让将来的你感谢现在努力的自己，加油！`;
    operateUI("#summaryPanel", showPanel);
  }
});

function showPanel(elements) {
  let panels = document.querySelectorAll("[id*=Panel]");
  panels.forEach((panel) => {
    if (panel.id == elements[0].id) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  });
}
