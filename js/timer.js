function setStatus(description) {
  let titleBar = document.head.querySelector("title");
  titleBar.textContent = `${description} - 番茄工作法计时器`;
  let statusDiv = document.getElementById("status");
  statusDiv.textContent = description;
}
function toMS(minutes) {
  return minutes * 60 * 1000;
}
function toHMS(ms) {
  return {
    hours: Math.floor(ms / 1000 / 60 / 60),
    minutes: Math.floor(ms / 1000 / 60),
    seconds: Math.floor(ms / 1000),
  };
}
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
      //showSummary();
      return;
    }
    setTimeout(executeTimingCycle, restTime);
  }
}
