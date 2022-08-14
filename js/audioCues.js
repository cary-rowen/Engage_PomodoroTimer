const player = document.getElementById("player");

function audioCues(audioName) {
  player.src = `./audio/${audioName}.wav`;
  player.play();
}
