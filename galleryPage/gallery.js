document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add 'animated' class to trigger animation
    galleryItems.forEach(item => {
        item.style.opacity = "1"; // Ensure images are visible after animations
    });
});