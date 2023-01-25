// Get HTML Elements

const instructionsModal = document.getElementById("instructions-modal");
const instructionsButton = document.getElementById("instructions-button");
const imageContainer = document.getElementById("image-container");
const volumeOn = document.getElementById("volume-off");
const volumeOff = document.getElementById("volume-on");
const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");
const input = document.getElementById("input");
const randomWord = document.getElementById("random-word");
const timeLeft = document.getElementById("time-left");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const replayButton = document.getElementById("replay-button");

// Default Bindings
let startTime = 10;
let initialScore = 0;
let initialWordArr = [];

// Toggle Modal

function handleModalClicked(event) {
  event.stopPropagation();
  toggleDropdown(!instructionsModal.classList.contains("open"));
}

function toggleDropdown(shouldOpen) {
  if (shouldOpen) {
    instructionsModal.classList.add("open");
  } else {
    instructionsModal.classList.remove("open");
  }
}

instructionsModal.addEventListener("click", () => toggleDropdown());

// Toggle Music

function handleVolume(event) {
  event.stopPropagation();
  toggleVolume(!volumeOn.classList.contains("on"));
}

function toggleVolume(shouldBeOn) {
  if (shouldBeOn) {
    volumeOn.classList.add("on");
    volumeOff.classList.add("show");
    audio.play();
    audio.addEventListener("timeupdate", function () {
      let buffer = 0.22;

      if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
      }
    });
  } else {
    volumeOn.classList.remove("on");
    audio.pause();
  }
}

imageContainer.addEventListener("click", () => toggleVolume());

// Toggle Play

function handlePlayClicked(event) {
  event.stopPropagation;
  togglePlay();
  fetchWords();
}

function togglePlay() {
  playButton.classList.add("hide");
  instructionsButton.classList.add("hide");
  input.classList.add("show");
  randomWord.classList.add("show");
  timeLeft.classList.add("show");
  score.classList.add("show");
  highScore.classList.add("show");

  if (instructionsModal.classList.contains("open")) {
    instructionsModal.classList.remove("open");
  }

  input.select();
  handleHighScore();
}

// Get Random Words From API And Store In An Array

async function fetchWords() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const randomWords = await response.json();
  initialWordArr = randomWords;
  randomWord.innerHTML = initialWordArr[0];
  startCountDown();
  return await randomWords;
}

function handleScore(event) {
  if (event.target.value === randomWord.innerHTML) {
    initialScore++;
    startTime += 3;
    score.innerHTML = `Score: ${initialScore}`;
    randomWord.innerHTML =
      initialWordArr[Math.floor(Math.random() * initialWordArr.length)];
    input.value = "";
  }
}

input.addEventListener("click", () => handleScore());

// Countdown

function startCountDown() {
  const timer = setInterval(() => {
    startTime--;
    timeLeft.innerHTML = `Time Left: ${startTime}s`;

    if (startTime === 0) {
      clearInterval(timer);
      timeLeft.innerHTML = "Times up!";
      replayButton.classList.add("show");
      randomWord.classList.remove("show");
      input.classList.remove("show");
      score.innerHTML = `Score: ${initialScore}`;
      handleHighScore();
    }
  }, 1000);
}

// Replay

function handleReplayClicked(event) {
  event.stopPropagation();
  toggleReplay();
}

function toggleReplay() {
  replayButton.classList.remove("show");
  randomWord.classList.add("show");
  input.classList.add("show");
  randomWord.innerHTML =
      initialWordArr[Math.floor(Math.random() * initialWordArr.length)];
  startTime += 10;
  startCountDown();
}

replayButton.addEventListener("click", () => handleReplayClicked());

// High Score

function handleHighScore() {
  let getScore = window.sessionStorage.getItem("score");

  getScore
    ? (highScore.innerHTML = `High Score: ${window.sessionStorage.score}`)
    : `High Score:`;

  if (initialScore > getScore) {
    window.sessionStorage.setItem("score", `${initialScore}`);
    highScore.innerHTML = `High Score: ${window.sessionStorage.score}`;
  }
}
