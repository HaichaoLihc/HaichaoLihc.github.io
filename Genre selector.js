//Function to add images to the gallery
const time = 80; // Time in milliseconds to wait before showing the next image
const alltime = 30;
const galleryPhotos = document.querySelector('div.photos');
const genres = ['landscape', 'street', 'casual'];
let photoData_old = {
    'street':[
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
    ], 'casual':[
        "images/2018-19/flower.jpg","images/2020-21/couple.jpg", "images/2020-21/helicopter.jpg",
        "images/2022/bicycles.jpg","images/2022/cloth.jpg","images/2022/grass.jpg",
        "images/2022/light-on-leaves.jpg","images/2022/swan.jpg","images/2022/fisher.jpg",
        "images/2022/gaze.jpg","images/2022/oldman.jpg","images/2022/light.jpg",
        "images/2022/water.jpg","images/2022/wave.jpg","images/2023/railings.jpg",
        "images/2023/wave.jpg","images/2023/spray.jpg","images/2023/flower.jpg"
    ]
};

let photoData = {};
let photos = [];
let photoMetadata = {}; // Store photo metadata including dates

// Initialize the gallery with parallel async data loading
async function initializeGallery() {
    try {
        // Show loading indicator
        showLoadingState();
        
        // Start all three API requests in parallel to get metadata
        const [casualMeta, streetMeta, landscapeMeta] = await Promise.all([
            imageDataApi.getCloudinaryImagesWithMetadata(['casual']).catch(() => []),
            imageDataApi.getCloudinaryImagesWithMetadata(['street']).catch(() => []),
            imageDataApi.getCloudinaryImagesWithMetadata(['landscape']).catch(() => [])
        ]);
        
        // Check if we got valid data from the API
        if (casualMeta.length === 0 && streetMeta.length === 0 && landscapeMeta.length === 0) {
            throw new Error('No images returned from Cloudinary API');
        }
        
        // Extract URLs and store metadata
        const casual = casualMeta.map(item => item.url);
        const street = streetMeta.map(item => item.url);
        const landscape = landscapeMeta.map(item => item.url);
        
        // Store metadata for sorting
        photoMetadata = {};
        [...casualMeta, ...streetMeta, ...landscapeMeta].forEach(item => {
            photoMetadata[item.url] = item;
        });
        
        photoData = {'casual': casual, 'street': street, 'landscape': landscape};
        
        // Combine all photos and sort by date (newest first)
        photos = [];
        for (let key in photoData) {
            photos = photos.concat(photoData[key]);
        }
        
        // Sort photos by date in descending order (newest first)
        photos = sortPhotosByDate(photos, 'desc');
        
        console.log('Successfully loaded images from Cloudinary API');
        
        // Initialize the gallery display after all images are loaded
        hideLoadingState();
        createDivs(photos);
        let allDivs = document.querySelectorAll('div.photos>div');
        appendNextImage(0, photos, allDivs);
        setTimeout(() => { showImage(0, photos, allDivs, alltime); }, 500);
        filterImages();
        
    } catch (error) {
        console.error('Error loading gallery images from API:', error);
        console.log('Falling back to local image data...');
        
        // Fallback to old data if API fails
        photoData = photoData_old;
        photos = [];
        for (let key in photoData) {
            photos = photos.concat(photoData[key]);
        }
        
        // For fallback data, sort by filename which contains year info
        photos = sortPhotosByFilename(photos, 'desc');
        
        console.log('Successfully loaded fallback image data');
        
        hideLoadingState();
        createDivs(photos);
        let allDivs = document.querySelectorAll('div.photos>div');
        appendNextImage(0, photos, allDivs);
        setTimeout(() => { showImage(0, photos, allDivs, alltime); }, 500);
        filterImages();
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
    }
    return array;
}

// Function to sort photos by date using metadata
function sortPhotosByDate(photoArray, order = 'desc') {
    return photoArray.sort((a, b) => {
        const dateA = photoMetadata[a] ? new Date(photoMetadata[a].created_at) : new Date(0);
        const dateB = photoMetadata[b] ? new Date(photoMetadata[b].created_at) : new Date(0);
        
        if (order === 'desc') {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    });
}

// Function to sort photos by filename (fallback for local data)
function sortPhotosByFilename(photoArray, order = 'desc') {
    return photoArray.sort((a, b) => {
        // Extract year from filename (e.g., "images/2023/photo.jpg" -> "2023")
        const yearA = extractYearFromPath(a);
        const yearB = extractYearFromPath(b);
        
        if (order === 'desc') {
            return yearB - yearA; // Newest first
        } else {
            return yearA - yearB; // Oldest first
        }
    });
}

// Helper function to extract year from image path
function extractYearFromPath(imagePath) {
    const yearMatch = imagePath.match(/images\/(\d{4})/);
    if (yearMatch) {
        return parseInt(yearMatch[1]);
    }
    
    // Handle ranges like "2018-19" or "2020-21"
    const rangeMatch = imagePath.match(/images\/(\d{4})-(\d{2})/);
    if (rangeMatch) {
        return parseInt(rangeMatch[1]); // Use the starting year
    }
    
    return 0; // Default for unknown dates
}

// takes in an index, an array of photos, and all the divs currently in gallery. Appends the next image to the gallery
function appendNextImage(index, photos, allDivs){
        if(index < photos.length){
            let img = document.createElement('img');
            img.src = photos[index];
            addGenres(img,photos[index]);
            allDivs[index].appendChild(img);
            appendNextImage(index+1,photos,allDivs)
        }
}

// takes in an index, an array of photos, and all the divs currently in gallery. Shows the images in the gallery
function showImage(index, photos, allDivs, appendTime){
        if(index < photos.length){
            let img = allDivs[index].querySelector('img');
            if (img.naturalHeight > img.naturalWidth) {
                img.classList.add('vertical');
                // console.log('yes vertical')
            } else {
                img.classList.add('horizontal');
            }
            img.addEventListener('click', ()=>openModal(photos[index]));
            img.offsetHeight; // Trigger reflow
            img.style.opacity = '1';
            allDivs[index].style.transform = 'translateY(0)';
            setTimeout(()=>{showImage(index+1,photos,allDivs,appendTime);},appendTime)
        }
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


// Function to show loading state
function showLoadingState(){
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
            <div style="font-size: 18px; margin-bottom: 10px;">Loading gallery...</div>
        </div>
    `;
    galleryPhotos.appendChild(loadingDiv);
}

// Function to hide loading state
function hideLoadingState(){
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
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
            
            // Sort filtered photos by date (newest first)
            if (Object.keys(photoMetadata).length > 0) {
                currentPhotos = sortPhotosByDate(currentPhotos, 'desc');
            } else {
                currentPhotos = sortPhotosByFilename(currentPhotos, 'desc');
            }
            
            clearDivs();
            createDivs(currentPhotos);
            let allDivs = document.querySelectorAll('div.photos>div');
            appendNextImage(0,currentPhotos,allDivs);
            setTimeout(()=>{showImage(0,currentPhotos,allDivs,time)},alltime)

        })
    }
    document.getElementById('all').addEventListener('click', ()=>{
        clearDivs();
        createDivs(photos);
        let allDivs = document.querySelectorAll('div.photos>div');
        appendNextImage(0,photos,allDivs);
        setTimeout(()=>{showImage(0,photos,allDivs,alltime);},alltime)
    })
}


// Initialize gallery when page loads
initializeGallery();





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

// Add event listener to close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Close modal when clicking on the modal background
    modal.addEventListener('click', function(event) {
        // Only close if the click was on the modal background, not on the image
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking on the image itself
    modalImage.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Function to scroll to the top of the page when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 150);
});

