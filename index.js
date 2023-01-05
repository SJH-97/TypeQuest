// Get Elements

const dropdown = document.getElementById("instructions-modal");
const imageContainer = document.getElementsByClassName("image-container");
const volumeOn = document.getElementById("volume-off");
const volumeOff = document.getElementById("volume-on");
const myAudio = document.querySelector("#audio");

// Toggle Modal

function handleModalClicked(event) {
  event.stopPropagation();
  toggleDropdown(!dropdown.classList.contains("open"));
}

function toggleDropdown(shouldOpen) {
  if (shouldOpen) {
    dropdown.classList.add("open");
  } else {
    dropdown.classList.remove("open");
  }
}

dropdown.addEventListener("click", () => toggleDropdown());

// Toggle Music

function handleVolume(event) {
  event.stopPropagation();
  toggleVolume(!volumeOn.classList.contains("on"));
}

function toggleVolume(shouldBeOn) {
  if (shouldBeOn) {
    volumeOn.classList.add("on");
    volumeOff.classList.add("show");
    myAudio.play();
    myAudio.addEventListener("timeupdate", function () {
      let buffer = 0.44;

      if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
      }
    });
  } else {
    volumeOn.classList.remove("on");
    myAudio.pause();
  }
}

imageContainer.addEventListener("click", () => toggleVolume());
