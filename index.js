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

// Default Bindings

let startTime = 10;

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
      let buffer = 0.44;

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
  startCountDown(startTime);
}

function togglePlay() {
  playButton.classList.add("hide");
  instructionsButton.classList.add("hide");
  input.classList.add("show");
  randomWord.classList.add("show");
  timeLeft.classList.add("show");
  score.classList.add("show");

  if (instructionsModal.classList.contains("open")) {
    instructionsModal.classList.remove("open");
  }
}

// Get Random Words From API And Store In An Array

async function fetchWords() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10"
  );
  const randomWords = await response.json();
  randomWord.innerHTML = randomWords[0];
  console.log(randomWords);
  return await randomWords;
}

// Countdown

function startCountDown(time) {
  const timer = setInterval(() => {
    time--;
    timeLeft.innerHTML = `Time Left: ${time}s`;

    if (time === 0) {
      clearInterval(timer);
      timeLeft.innerHTML = "Times up!";
      randomWord.classList.remove("show");
      input.classList.remove("show");
    }
  }, 1000);
}
