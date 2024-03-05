// Add or create this JavaScript file

const photos = [
    "images/index/bicycle.jpg",
    "images/index/elevator.jpg",
    // Add more image paths as needed
];

let currentPhotoIndex = 0;
const photoElement = document.getElementById("photo");

function showPhoto(index) {
    if (index >= 0 && index < photos.length) {
        photoElement.src = photos[index];
        currentPhotoIndex = index;
    }
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
}

// Automatically switch to the next photo every 5 seconds
setInterval(nextPhoto, 5000);
