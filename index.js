// Add or create this JavaScript file

const photos = [
    "images/index/bicycle.jpg",
    "images/index/elevator.jpg",
    // Add more image paths as needed
];

let currentPhotoIndex = 0;
const photoElement = document.getElementById("photo");
const photoElement2 = document.getElementById("photo2");

function showPhoto(index) {
    if (index >= 0 && index < photos.length) {
        photoElement.src = photos[index];
        photoElement2.src = photos[index];
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

const colors = ['#59D5E0', '#F5DD61', '#FAA300','#F4538A'];
document.addEventListener('DOMContentLoaded', ()=> {
    window.addEventListener('scroll', ()=> {
        const header = document.getElementsByClassName('welcome-section');
        const headerBackdrop = document.getElementById('blurry-screen');
        const frame = document.getElementById('frame');

        let scrollPosition = window.scrollY;

        // Adjust opacity based on scroll position
        headerBackdrop.style.opacity = 0.8 - (scrollPosition / (0.6 * window.innerHeight));


    })
})

document.addEventListener('DOMContentLoaded', function() {
  let textElement = document.getElementById('colorChangingText');
  let wordsToChange = ['collection']; // Add the words you want to change color here// Define the colors you want to use

  let interval = 1000; // Interval in milliseconds
  let currentIndex = 0;

  // Function to change the color of the specified word
  function changeColor() {
    let words = textElement.textContent.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (wordsToChange.includes(words[i].toLowerCase())) {
        words[i] = `<span style="color: ${colors[currentIndex]}">${words[i]}</span>`;
      }
    }
    textElement.innerHTML = words.join(' ');
    currentIndex = (currentIndex + 1) % colors.length;
  }

  // Call the changeColor function at the specified interval
  setInterval(changeColor, interval);
});