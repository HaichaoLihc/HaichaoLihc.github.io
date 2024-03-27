// Add or create this JavaScript file
const photos = [
    "images/2022/bicycle.jpg",
    "images/2020-21/Santa%20Monica%20Beach,%20California%205.jpg",
    "images/2023/mountain.jpg",
    "images/2022/cloth.jpg",
    "images/2020-21/Yosemite,%20California%202.jpg",
    "images/2020-21/Angel%20Island.jpg",
    "images/2023/wave.jpg",

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

let intervalId
intervalId = setInterval(nextPhoto, 5000)
const stopButton = document.getElementById("stopButton");
function toggleAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            stopButton.style.color = 'rgba(255,255,255,0.3)';
            intervalId = null; // Reset intervalId
        } else {
            // If interval is not running, start it
            intervalId = setInterval(nextPhoto, 5000);
            stopButton.style.color = 'rgba(255,255,255,1)';
        }

    }

const colors = ['#59D5E0', '#F5DD61', '#FAA300', '#F4538A'];
window.addEventListener('scroll', () => {
    const headerBackdrop = document.getElementById('blurry-screen');
    const boxBackdrop = document.getElementsByClassName('selected-work-box');
    let scrollPosition = window.scrollY;
    // Adjust opacity based on scroll position
    headerBackdrop.style.opacity = 0.8 - (scrollPosition / (0.6 * window.innerHeight));
    for (let i = 0; i < 4; i++) {
        if (scrollPosition > (0.8 + (i * 0.8)) * window.innerHeight) {
            boxBackdrop[i].style.opacity = (scrollPosition / ((0.8 + (i * 0.45)) * window.innerHeight)) - 0.8;
            boxBackdrop[i].querySelector('h2').style.color = colors[i]
        }
    }
})


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

function goto2023() {
    window.location.href = 'yearly-photo-pages/2023.html';
}
function goto2022() {
    window.location.href = 'yearly-photo-pages/2022.html';
}
function goto2021() {
    window.location.href = 'yearly-photo-pages/2020-21.html';

}
function goto2019() {
    window.location.href = 'yearly-photo-pages/2018-19.html';
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 150);
});

