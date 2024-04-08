const photos = {'photo1':[
    "images/books/osaas.png",
    "images/books/2-1.jpg",
    "images/books/2-2.jpg",
    "images/books/2-3.jpg",
        "images/books/2-4.jpg",
        "images/books/2-5.jpg",
    "images/books/2-6.jpg",
        "images/books/2-7.jpg",
        "images/books/2-8.jpg",
    "images/books/2-9.jpg",
        "images/books/2-10.jpg",
        "images/books/2-11.jpg",
        "images/books/2-12.jpg"

],'photo2':[
    "images/books/srrti.png",
    "images/books/1.jpg",
    "images/books/2.jpg",
    "images/books/3.jpg",
        "images/books/4.jpg",
        "images/books/5.jpg",
        "images/books/6.jpg",
        "images/books/7.jpg",
        "images/books/8.jpg",
        "images/books/9.jpg",
        "images/books/10.jpg",
]};

let currentPhotoIndex = {'photo1':0,'photo2':0};
const photoElement = {'photo1':document.getElementById("photo1"),
    'photo2':document.getElementById("photo2")
};

function nextPhoto(id) {
    if(currentPhotoIndex[id] === 0 || currentPhotoIndex[id] === photos[id].length-1){
        photoElement[id].style.opacity = '0'
        currentPhotoIndex[id] = (currentPhotoIndex[id] + 1)%photos[id].length
        photoElement[id].src = photos[id][currentPhotoIndex[id]];
        setTimeout(()=>{
            updateSquare()
            photoElement[id].style.opacity = '1'
        }, 150)
    }else{
        currentPhotoIndex[id] = (currentPhotoIndex[id] + 1)%photos[id].length
        photoElement[id].src = photos[id][currentPhotoIndex[id]];
    }


}

function prevPhoto(id){
    if(currentPhotoIndex[id] === 0 || currentPhotoIndex[id] === 1){
        photoElement[id].style.opacity = '0'
        currentPhotoIndex[id] = (currentPhotoIndex[id] - 1 + photos[id].length)%photos[id].length
        photoElement[id].src = photos[id][currentPhotoIndex[id]];
        setTimeout(()=>{
            updateSquare()
            photoElement[id].style.opacity = '1'
        }, 150)
    }else{
        currentPhotoIndex[id] = (currentPhotoIndex[id] - 1 + photos[id].length)%photos[id].length
        photoElement[id].src = photos[id][currentPhotoIndex[id]];
    }

}

function goToCover(photo){
    currentPhotoIndex[photo] = -1
    nextPhoto(photo)

}


function updateSquare() {
        for(let i=0; i<square.length; i++) {
            let image = square[i].querySelector("img")
            let width = square[i].offsetWidth;
            let height = square[i].offsetHeight;
            let scale = 0
            if(currentPhotoIndex[`photo${i+1}`] === 0){scale = 0.8}else{scale = 1.4}
            console.log(scale)
            if (width > scale * height) {
                    // If div's width is greater than its height
                    image.style.width = 'auto';
                    image.style.height = '100%';
            } else {
                    // If div's height is greater than its width
                    image.style.width = '100%';
                    image.style.height = 'auto';
            }
        }
}

//
let square = document.getElementsByClassName('book-container');
window.addEventListener('resize', updateSquare);
window.addEventListener('load',updateSquare)



//functions to improve reloading page experience

//scroll to top when reload
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});