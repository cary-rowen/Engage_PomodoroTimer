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

let backBTN = document.querySelector("#backBTN");
backBTN.addEventListener("click", () => {
  newBTN.click();
  setStatus("设置番茄任务");
});

let startBTN = document.querySelector("#startBTN");
startBTN.addEventListener("click", () => {
  let stopBTN = document.querySelector("#stopBTN");
  stopBTN.onclick = () => {
    if (!confirm("确定要停止该番茄钟吗？")) return;
    clearInterval(countdownTimerId);
    clearTimeout(cycleTimerId);
    stopTime = Date.now();
    showSummary(true);
  };
  let isAbsorbing = false;
  let finishedPomodoro = 0;
  let timeRemainControl = document.querySelector("#remainingTime");
  let finishedPomodoroControl = document.querySelector("#finishedPomodoro");
  let remainPomodoroControl = document.querySelector("#remainingPomodoro");
  let summaryCaptionControl = document.querySelector("#summaryCaption");
  let summaryContentControl = document.querySelector("#summaryContent");
  let countdownTimerId = null;
  let startTime = Date.now();
  let stopTime;
  let totalPomodoro = document.querySelector("#pomodoroNumber").value;
  let absorbTime = toMS(document.querySelector("#absorbTime").value);
  let finishTime = absorbTime + Date.now();
  let restTime = toMS(document.querySelector("#restTime").value);
  let cycleTimerId;

  function executeTimingCycle() {
    isAbsorbing = !isAbsorbing;
    if (isAbsorbing) {
      setStatus("专注中");
      audioCues("start");
      finishTime = absorbTime + Date.now();
      cycleTimerId = setTimeout(executeTimingCycle, absorbTime);
    } else {
      finishTime = restTime + Date.now();
      finishedPomodoro++;
      setStatus("休息中");
      if (finishedPomodoro == totalPomodoro) {
        clearInterval(countdownTimerId);
        stopTime = Date.now();
        showSummary(false);
        return;
      }
      audioCues("rest");
      cycleTimerId = setTimeout(executeTimingCycle, restTime);
    }
  }
  executeTimingCycle();

  countdownTimerId = setInterval(() => {
    let timeLeft = toHMS(finishTime - Date.now());
    timeLeft = timeLeft < 0 ? 0 : timeLeft;
    let pomodoroLeft = totalPomodoro - finishedPomodoro;
    remainPomodoroControl.textContent = `剩余番茄个数：\
    ${pomodoroLeft}`;
    finishedPomodoroControl.textContent = `已完成的番茄个数：\
    ${finishedPomodoro}`;
    timeRemainControl.textContent = `剩余时间：\
    ${timeLeft.hours} 时 ${timeLeft.minutes} 分 ${timeLeft.seconds} 秒`;
  }, 1000);
  operateUI("#absorbPanel", showPanel);

  function showSummary(isStop) {
    let totalTime = toHMS(stopTime - startTime);
    audioCues("finish");
    let caption, content;
    if (isStop) {
      setStatus("已停止");
      caption = "啊哦！番茄钟提前结束😼";
      content = `你在： \
      ${totalTime.hours} 小时， ${totalTime.minutes} 分钟 ${totalTime.seconds} 秒内完成了 \
      ${finishedPomodoro} 个番茄钟，\
      每天进步一点点，期待下一次的相逢。`;
    } else {
      setStatus("已完成");
      caption = "好棒呀👍";
      content = `你在 \
    ${totalTime.hours} 小时， ${totalTime.minutes} 分钟内完成了 \
    ${finishedPomodoro} 个番茄钟，\
    将来的你会感谢现在努力的自己，加油！`;
    }
    summaryCaptionControl.textContent = caption;
    summaryContentControl.textContent = content;
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
