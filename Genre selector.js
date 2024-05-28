const time = 30; // Time in milliseconds to wait before showing the next image
const galleryPhotos = document.querySelector('div.photos');
const genres = ['light', 'water', 'street', 'landscape', 'people'];
let photoData = {'people':[
        "images/2022/fisher.jpg","images/2022/gaze.jpg",
        "images/2022/oldman.jpg",
    ],'light':[
        "images/2018-19/flower.jpg","images/2020-21/couple.jpg", "images/2020-21/helicopter.jpg",
        "images/2022/bicycles.jpg","images/2022/cloth.jpg","images/2022/grass.jpg",
        "images/2022/light-on-leaves.jpg","images/2022/swan.jpg",
        "images/2023/railings.jpg",
    ], 'water':[
        "images/2022/light.jpg","images/2022/water.jpg","images/2022/wave.jpg",
        "images/2023/wave.jpg","images/2023/spray.jpg","images/2023/flower.jpg",

    ], 'street':[
        "images/2018-19/garage.jpg", "images/2020-21/child.jpg","images/2020-21/children.jpg",
        "images/2022/bicycle.jpg","images/2022/bubbles.jpg","images/2022/chair.jpg",
        "images/2022/elevator.jpg","images/2022/hanging-clothes.jpg",
        "images/2022/kindergarden.jpg","images/2022/kaleidoscope.jpg","images/2022/lying-child.jpg",
        "images/2022/old-women.jpg","images/2022/red.jpg","images/2022/shadow.jpg",
        "images/2022/shovel.jpg","images/2022/snow.jpg","images/2022/xiaomi.jpg",
        "images/2023/bedsheet.jpg","images/2023/cars.jpg","images/2023/gas-station.jpg",
        "images/2023/hotpot.jpg","images/2023/kite.jpg","images/2023/stairs.jpg"
    ], 'landscape':[
        "images/2018-19/skyline.jpg", "images/2018-19/park.jpg","images/2020-21/Angel%20Island.jpg",
        "images/2020-21/bird-on-rock.jpg","images/2020-21/boulder.jpg","images/2020-21/cliff.jpg",
        "images/2020-21/gate.jpg","images/2020-21/half-dome.jpg","images/2020-21/hill.jpg",
        "images/2020-21/ocean.jpg","images/2020-21/Santa%20Monica%20Beach,%20California%202.jpg",
        "images/2020-21/Santa%20Monica%20Beach,%20California%205.jpg","images/2020-21/tide.jpg",
        "images/2020-21/Yosemite,%20California%202.jpg","images/2022/last-light.jpg",
        "images/2023/curve.jpg","images/2023/mountain.jpg","images/2023/boats.jpg",
        "images/2023/moonrise.jpg","images/2023/woods.jpg"
    ]
};


// add all photos to a single array
let photos = [];
for (let key in photoData) {
    photos = photos.concat(photoData[key]);
}
photos.reverse();


// takes in an index, an array of photos, and all the divs currently in gallery. Appends the next image to the gallery
function appendNextImage(index, photos, allDivs){
        if(index < photos.length){
            let img = new Image();
            img.src = photos[index];
            addGenres(img,photos[index]);
            allDivs[index].appendChild(img);
            appendNextImage(index+1,photos,allDivs)
        }
}


// takes in an index, an array of photos, and all the divs currently in gallery. Shows the images in the gallery
function showImage(index, photos, allDivs){
    if(index < photos.length){
        let img = allDivs[index].querySelector('img');
        if (img.complete) {
            console.log(`${img} is already loaded`);
            revealImage(img);
            setTimeout(()=>{showImage(index+1,photos,allDivs);},time)
        }else{
            console.log(`loading ${img}`);
            img.onload = () =>{
                console.log(`${img} is loaded`);
                revealImage(img);
                setTimeout(()=>{showImage(index+1,photos,allDivs);},time)
            }
        }
    }
}


// function to adjust the image orientation and add the click event listener
// and finally reveal the image
function revealImage(img){
    if (img.naturalHeight < img.naturalWidth) {
        img.classList.add('horizontal');
    } else {
        img.classList.add('vertical'); 
    }
    img.offsetHeight; // Trigger reflow
    img.style.opacity = '1'; //reveal the image
    parentDiv = img.parentElement;
    parentDiv.style.transform = 'translateY(0)'; // move the image up
    img.addEventListener('click', ()=>openModal(img)); //add click event listener to open closer view
}


function addGenres(img,src){
    for(let key in photoData){
        if (photoData[key].includes(src)) {
            img.classList.add(key);
        }
    }
}

// Function to create divs for each photo
function createDivs(photos){
    for(let i=0;i<photos.length;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('photo-container');
        galleryPhotos.appendChild(newDiv);
    }

}


// Function to clear all divs in the gallery
function clearDivs(){
    let allDivs = document.querySelectorAll('div.photos>div');
    for(let i=0;i<allDivs.length;i++){
        allDivs[i].remove();
    }
}


// Function to filter images based on genre
function filterImages(){
    for(let i=0;i<genres.length;i++){
        document.getElementById(genres[i]).addEventListener('click', ()=>{
            let currentPhotos = [...photoData[genres[i]]];
            clearDivs();
            createDivs(currentPhotos);
            let allDivs = document.querySelectorAll('div.photos>div');
            appendNextImage(0,currentPhotos,allDivs);
            setTimeout(()=>{showImage(0,currentPhotos,allDivs)},time)

        })
    }
    document.getElementById('all').addEventListener('click', ()=>{
        clearDivs();
        createDivs(photos);
        let allDivs = document.querySelectorAll('div.photos>div');
        appendNextImage(0,photos,allDivs);
        setTimeout(()=>{showImage(0,photos,allDivs)},time)
    })
}


// main commands to create divs, append images and show images
createDivs(photos);
let allDivs = document.querySelectorAll('div.photos>div');
appendNextImage(0,photos,allDivs);
setTimeout(()=>{showImage(0,photos,allDivs);},500)
filterImages();


// Function to change the active class styling of the genre buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.genreSelector button');

    buttons.forEach(link => {
        link.addEventListener('click', function () {

            // Remove the 'active' class from all links
            buttons.forEach(otherLink => {
                otherLink.classList.remove('active');
            });

            // Add the 'active' class to the clicked link
            this.classList.add('active');
        });
    });
});


// Function to open the modal and set the image source
function openModal(img) {
    document.getElementById('modalImage').src = img.src;
    document.getElementById('imageModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Function to scroll to the top of the page when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 150);
});

