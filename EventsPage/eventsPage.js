// Function to initialize each slider
function initializeSlider(slider) {
  let nextBtn = slider.querySelector(".next");
  let prevBtn = slider.querySelector(".prev");
  let sliderList = slider.querySelector(".list");
  let thumbnail = slider.querySelector(".thumbnail");
  let thumbnailItems = Array.from(thumbnail.querySelectorAll(".item"));

  let autoSlideInterval = null;
  const slideIntervalDuration = 3000; // 3 seconds for auto-slide
  let isAnimating = false; // Flag to prevent overlapping animations
  let isManualInteraction = false; // Flag to check if the user clicked next/prev

  // Function to move the slider based on direction
  function moveSlider(direction) {
    if (isAnimating) return; // Prevent multiple animations
    isAnimating = true; // Set animating flag

    let sliderItems = sliderList.querySelectorAll(".item");
    let thumbnailItems = Array.from(thumbnail.querySelectorAll(".item"));

    if (direction === "next") {
      // Move first slider item to the end
      let firstSliderItem = sliderItems[0];
      sliderList.appendChild(firstSliderItem);

      // Move first thumbnail item to the end
      let firstThumbnailItem = thumbnailItems[0];
      thumbnail.appendChild(firstThumbnailItem);

      let newFirstThumbnailImg = thumbnailItems[1].querySelector("img").src;
      setBackground(newFirstThumbnailImg);
      slider.classList.add("next");
    } else if (direction === "prev") {
      // Move last slider item to the start
      let lastSliderItem = sliderItems[sliderItems.length - 1];
      sliderList.prepend(lastSliderItem);

      // Move last thumbnail item to the start
      let lastThumbnailItem = thumbnailItems[thumbnailItems.length - 1];
      thumbnail.prepend(lastThumbnailItem);

      let newFirstThumbnailImg = thumbnailItems[0].querySelector("img").src;
      setBackground(newFirstThumbnailImg);
      slider.classList.add("prev");
    }

    slider.addEventListener(
      "animationend",
      () => {
        slider.classList.remove("next", "prev");
        isAnimating = false; // Animation complete, reset flag
      },
      { once: true }
    );
  }

  // Auto-slide logic
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!isManualInteraction) {
        moveSlider("next");
      }
    }, slideIntervalDuration);
  }

  // Stop the auto-slide interval
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Function to set background image
  function setBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
  }

  // Handle thumbnail click
  function handleThumbnailClick(event) {
    if (isAnimating) return;

    let clickedThumbnail = event.target.closest(".item");
    if (!clickedThumbnail) return;

    let clickedThumbnailIndex = Array.from(thumbnail.children).indexOf(
      clickedThumbnail
    );
    let sliderItems = Array.from(sliderList.querySelectorAll(".item"));
    let correspondingSliderItem = sliderItems[clickedThumbnailIndex];

    let clickedThumbnailImg = clickedThumbnail.querySelector("img").src;
    setBackground(clickedThumbnailImg);

    sliderList.prepend(correspondingSliderItem);
    thumbnail.prepend(clickedThumbnail);

    thumbnailItems = Array.from(thumbnail.querySelectorAll(".item"));

    stopAutoSlide();
  }

  // Attach thumbnail click event listeners
  thumbnailItems.forEach((thumbnailItem) => {
    thumbnailItem.addEventListener("click", handleThumbnailClick);
  });

  // Add event listeners for next and prev buttons
  nextBtn.onclick = function () {
    moveSlider("next");

    // Stop auto-slide on user interaction
    isManualInteraction = true;
    stopAutoSlide();
  };

  prevBtn.onclick = function () {
    moveSlider("prev");

    // Stop auto-slide on user interaction
    isManualInteraction = true;
    stopAutoSlide();
  };

  // Start auto-slide when the slider scrolls into view using IntersectionObserver
  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isManualInteraction) {
          // Start auto-slide if the user hasn't interacted with the slider yet
          startAutoSlide();
        } else {
          // Stop auto-slide when slider is out of view
          stopAutoSlide();
        }
      });
    },
    { threshold: 0.5 }
  ); // Adjust threshold to 50% of the slider in view

  // Observe the slider
  observer.observe(slider);
}

// Initialize all sliders on the page
document.querySelectorAll(".slider").forEach(initializeSlider);

// Sidebar toggle functionality
const toggleSidebar = () => {
  const menuBtn = document.querySelector(".floating-btn");
  const sidebar = document.querySelector(".sidebar");

  // Toggle the sidebar and the "cancel" icon state
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active"); // Slide in/out the sidebar
    menuBtn.classList.toggle("cancel"); // Switch between hamburger and cancel icon
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.classList.remove("active"); // Hide sidebar
      menuBtn.classList.remove("cancel"); // Reset the button to hamburger state
    }
  });

  // Close sidebar on mobile when clicking a sidebar link
  const sidebarLinks = document.querySelectorAll(".sidebar .links li a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        // Only close on mobile view
        sidebar.classList.remove("active");
        menuBtn.classList.remove("cancel"); // Reset button to hamburger
      }
    });
  });
};

// Ensure DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", toggleSidebar);

gsap.registerPlugin(ScrollTrigger);

const sidebar = document.querySelector(".sidebar");
const eventContainer = document.querySelector(".eventsPage");

ScrollTrigger.create({
  trigger: eventContainer,
  start: "top top", // When the top of the event container hits the top of the viewport
  end: "bottom top", // When the bottom of the event container hits the top of the viewport
  onEnter: () => (sidebar.style.display = "none"), // Hide sidebar when entering event container
  onLeave: () => (sidebar.style.display = "flex"), // Show sidebar when leaving the event container
  onEnterBack: () => (sidebar.style.display = "none"), // Hide sidebar when scrolling back into view
});
