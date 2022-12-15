// Toggle Modal

const handleModalClicked = (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById("instructions-modal");
    toggleDropdown(!dropdown.classList.contains("open"));
  };

const toggleDropdown = (shouldOpen) => {
    const dropdown = document.getElementById("instructions-modal");
  
    if (shouldOpen) {
      dropdown.classList.add("open");
    } else {
      dropdown.classList.remove("open");
    }
  
  };
  
document.body.addEventListener("click", () => toggleDropdown());

// Toggle Music

const handleVolume = (event) => {
  event.stopPropagation();
  const volumeOn = document.getElementById("volume-off");
  toggleVolume(!volumeOn.classList.contains("on"));
};

const toggleVolume = (shouldBeOn) => {
  const volumeOn = document.getElementById("volume-off");
  const volumeOff = document.getElementById("volume-on");

  if (shouldBeOn) {
    volumeOn.classList.add("on");
    volumeOff.classList.add('show')
  } else {
    volumeOn.classList.remove("on");
  }

};

document.body.addEventListener("click", () => toggleVolume());
