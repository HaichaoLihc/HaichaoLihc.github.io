//Function to add images to the gallery
const galleryPhotos = document.querySelector('div.photos');
const genres = ['light', 'water', 'street', 'landscape', 'people'];
let photoData = {'light':[
        "images/2018-19/flower.jpg","images/2020-21/couple.jpg", "images/2020-21/helicopter.jpg",
        "images/2022/bicycles.jpg","images/2022/cloth.jpg","images/2022/grass.jpg",
        "images/2022/light-on-leaves.jpg","images/2022/red-wood.jpg","images/2022/swan.jpg",
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


    ], 'people':[
        "images/2022/fisher.jpg","images/2022/gaze.jpg",
        "images/2022/oldman.jpg",
    ]
};
let photos = [];
for (let key in photoData) {
    photos = photos.concat(photoData[key]);
}
shuffle(photos)

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
    }
    return array;
}

function appendNextImage(index){
        if(index < photos.length){
            let img = document.createElement('img');
            img.src = photos[index];
            console.log(img.height, img.width)
            addGenres(img,photos[index]);
            allDivs[index].appendChild(img);
            appendNextImage(index+1)
        }
}

function showImage(index){
        if(index < photos.length){
            let img = allDivs[index].querySelector('img');
            if (img.naturalHeight > img.naturalWidth) {
                img.classList.add('vertical');
                console.log('yes vertical')
            } else {
                img.classList.add('horizontal');
            }
            img.addEventListener('click', ()=>openModal(photos[index]));
            img.offsetHeight; // Trigger reflow
            img.style.opacity = '1';
            allDivs[index].style.transform = 'translateY(0)';
            setTimeout(()=>{showImage(index+1);},100)
        }
}

function addGenres(img,src){
    for(let key in photoData){
        if (photoData[key].includes(src)) {
            img.classList.add(key);
        }
    }
}

function createDivs(){
    for(let i=0;i<photos.length;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('photo-container');
        galleryPhotos.appendChild(newDiv);
    }

}

createDivs();
let allDivs = document.querySelectorAll('div.photos>div');
appendNextImage(0);
setTimeout(()=>{showImage(0);},200)


// Function to filter images based on genre
function filterImages(){
    for(let i=0;i<genres.length;i++){
        document.getElementById(genres[i]).addEventListener('click', ()=>{
            for(let j=0;j<allDivs.length;j++){
                let image = allDivs[j].querySelector('img');
                console.log(image)
                if (!image.classList.contains(genres[i])){
                    allDivs[j].classList.add('hide');
                }
                if (image.classList.contains(genres[i])&&allDivs[j].classList.contains('hide')){
                    allDivs[j].classList.remove('hide');
                }
            }
        })
    }
    document.getElementById('all').addEventListener('click', ()=>{
        let allDivs = document.querySelectorAll('div.photos>div');
        for(let i=0;i<allDivs.length;i++){
            if (allDivs[i].classList.contains('hide')){
                allDivs[i].classList.remove('hide');
            }
        }
    })
}

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
function openModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
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

