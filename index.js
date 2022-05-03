// 備註
// 1. 播放倍速（1、1.25、1.5、2、5） 待完成
//    播放速度要是可循環的。（當倍速為 5 倍時，再次點選就會回到倍速 1
// 2. 時間軸拖曳或點選音樂時間會跟著改變。

// Settings
const musicUrl = "https://spmdl.github.io/json-files/rain.mp3";

// Status
let isPlaying = false;
let hasSound = true;
let preVolume = 0; // 原來的音量大小

// Elements
const timeSpend = document.getElementById('timeSpent');
const timeLeft = document.getElementById('timeLeft');
const playBtn = document.querySelector('.fa-play');
const rewindBtn = document.querySelector('.fa-rotate-left');
const forwardBtn = document.querySelector('.fa-rotate-right');
const plusVolumeBtn = document.querySelector('.fa-plus');
const volumeBtn = document.querySelector('.fa-volume-high');
const minusVolumeBtn = document.querySelector('.fa-minus');

// Functions
function toggleAudio(e, audio) {
  if (!isPlaying) {
    isPlaying = true;
    e.target.classList.replace('fa-play', 'fa-pause'); 
    audio.play();
  } else {
    isPlaying = false;
    e.target.classList.replace('fa-pause', 'fa-play'); 
    audio.pause();
  }
}
function forward(audio) {
  audio.currentTime += 2;
  audio.play();
}
function rewind(audio) {
  audio.currentTime -= 2
  audio.play();
}
function toggleVolume(e, audio) {
  if (hasSound) {
    preVolume = audio.volume; // 紀錄前次音量大小
    audio.volume = 0;
    hasSound = false;
    e.target.classList.replace('fa-volume-high', 'fa-volume-xmark'); 
  } else {
    audio.volume = preVolume; // 指定前次音量
    hasSound = true;
    e.target.classList.replace('fa-volume-xmark', 'fa-volume-high');
  }
}
function plusVolume(audio) {
  try {
    audio.volume += 0.1
  } catch (error) {
    audio.volume = 1
  }
}
function minusVolume(audio) {
  try {
    audio.volume -= 0.1
  } catch (error) {
    audio.volume = 0
  }
}
function calculateSpendTime(seconds) {
  // 計算幾分鐘
  const minutes = Math.floor(seconds/60);
  // 計算剩餘秒數
  const remainderSeconds = Math.floor(seconds % 60);
  // 組合顯示文字(剩餘時間)
  const display = `${minutes}:${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;

  return display;
}
function calculateLeftTime(seconds, duration) {
  const totalLeft = duration - seconds
  // 計算幾分鐘
  const minutes = Math.floor(totalLeft/60);
  // 計算剩餘秒數
  const remainderSeconds = Math.floor(totalLeft % 60);
  // 組合顯示文字(剩餘時間)
  const display = `${minutes}:${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;

  return display;
}
function playRateLoop(audio) {
  console.log(audio.defaultPlaybackRate);
}

// 初始化
function init () {
  const audio = new Audio(musicUrl);
  let seconds;
  let duration;
  console.dir(audio);
  // playRateLoop(audio);

  // Bind Listener
  playBtn.addEventListener('click', (e) => toggleAudio(e, audio))
  rewindBtn.addEventListener('click', (e) => rewind(audio))
  forwardBtn.addEventListener('click', (e) => forward(audio))
  plusVolumeBtn.addEventListener('click', (e) => plusVolume(audio))
  volumeBtn.addEventListener('click', (e) => toggleVolume(e, audio))
  minusVolumeBtn.addEventListener('click', (e) => minusVolume(audio))

  // Time Diplay
  setInterval(() => {
    seconds = audio.currentTime;
    timeSpend.innerText = calculateSpendTime(seconds);
  }, 1000)
  setInterval(() => {
    duration = audio.duration;
    seconds = audio.currentTime;
    timeLeft.innerText = calculateLeftTime(seconds, duration);
  }, 1000)
}

init();
