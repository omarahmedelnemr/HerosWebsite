function initializeSlider(sliderContainer) {
    let currentIndex = 1;
    const slides = sliderContainer.querySelectorAll(".slider");
    const pics = sliderContainer.querySelectorAll(".pic");
  
    function displaySlide(n) {
      if (n > slides.length) currentIndex = 1;
      if (n < 1) currentIndex = slides.length;
  
      slides.forEach((slide, index) => {
        slide.style.display = index === currentIndex - 1 ? "flex" : "none";
      });
  
      pics.forEach((pic, index) => {
        pic.classList.remove("active", "Deactivating");
        if (index === currentIndex - 1) {
          pic.classList.add("active");
        } else {
          pic.classList.add("Deactivating");
        }
      });
    }
  
    function changeSlide(n) {
        console.log("Change")
      displaySlide((currentIndex += n));
    }
  
    function currentSlide(n) {
        console.log("Current")
        displaySlide((currentIndex = n));
    }
  
    // Initialize the slider
    displaySlide(currentIndex);
  
    // Return controls to be used outside
    return { changeSlide, currentSlide };
  }
  
  // Initialize all sliders
  document.querySelectorAll(".slider-container").forEach((container) => {
    const slider = initializeSlider(container);
    console.log("Slider")
    // Example of connecting controls:
    container.querySelector(".next").addEventListener("click", () => slider.changeSlide(1));
    container.querySelector(".prev").addEventListener("click", () => slider.changeSlide(-1));
  
    // Add click events for individual dots if applicable
    console.log( container.querySelectorAll(".pic"))
    container.querySelectorAll(".pic").forEach((dot, index) => {
        console.log("Dot", dot, index)
      dot.addEventListener("click", () => slider.currentSlide(index + 1));
      dot.addEventListener("change", () => slider.changeSlide());
    });
  });
  