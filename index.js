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
  const myAudio = document.querySelector('#audio')

  if (shouldBeOn) {
    volumeOn.classList.add("on");
    volumeOff.classList.add('show');

    myAudio.play();

    myAudio.addEventListener('timeupdate', function(){
      var buffer = .44
      if(this.currentTime > this.duration - buffer){
          this.currentTime = 0
          this.play()
      }
    });

  } else {
    volumeOn.classList.remove("on");
    myAudio.pause()
  }

};

document.body.addEventListener("click", () => toggleVolume());