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


