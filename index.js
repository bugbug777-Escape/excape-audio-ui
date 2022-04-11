const musicUrl = "https://spmdl.github.io/json-files/rain.mp3";

function playAudio(audio) {
  audio.play();
}

function init () {
  const audio = document.createElement("audio");
  audio.src = musicUrl;
  console.dir(audio);
}

init();
