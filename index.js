// Get Elements

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

// togglePlay

function handlePlayClicked(event) {
  event.stopPropagation;
  togglePlay();
  fetchWords();
  startCountDown();
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

async function fetchWords(){
  const response = await fetch("https://random-word-api.herokuapp.com/word?number=10");
  const randomWords = await response.json();
  console.log(randomWords);
  return await randomWords;
}
