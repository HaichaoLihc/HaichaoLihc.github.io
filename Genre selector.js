document.getElementById('all').addEventListener('click', ()=>{
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        if (allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    }
})

// Genre = light 
document.getElementById('B1').addEventListener('click', () => {
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        
        if (allImage[i].classList.contains('light')===false){
            allImage[i].classList.add('hide');
        }
        if (allImage[i].classList.contains('light')&&allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    } 
})

// Genre = water 
document.getElementById('B2').addEventListener('click', () => {
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        if (allImage[i].classList.contains('water')===false){
            allImage[i].classList.add('hide');
        }
        if (allImage[i].classList.contains('water')&&allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    } 
})

// Genre = landscape
document.getElementById('B4').addEventListener('click', () => {
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        if (allImage[i].classList.contains('landscape')===false){
            allImage[i].classList.add('hide');
        }
        if (allImage[i].classList.contains('landscape')&&allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    } 
})

// Genre = street
document.getElementById('B3').addEventListener('click', () => {
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        if (allImage[i].classList.contains('street')===false){
            allImage[i].classList.add('hide');
        }
        if (allImage[i].classList.contains('street')&&allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    } 
})

// Genre = people
document.getElementById('B5').addEventListener('click', () => {
    let allImage = document.querySelectorAll('div.photos>div');
    for(i=0;i<allImage.length;i++){
        if (allImage[i].classList.contains('people')===false){
            allImage[i].classList.add('hide');
        }
        if (allImage[i].classList.contains('people')&&allImage[i].classList.contains('hide')){
            allImage[i].classList.remove('hide');
        }
    } 
})

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

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});