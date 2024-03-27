const photos = {'photo1':[
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
const coverphoto = {'photo1':"images/books/osaas.png",'photo2':"images/books/srrti.png"};
let currentPhotoIndex = {'photo1':0,'photo2':0};
const photoElement = {'photo1':document.getElementById("photo1"),
    'photo2':document.getElementById("photo2")
};
let Flag = {'photo1':false,'photo2':false};

function changePhoto(photo,index){
    photo.src = photos[index][currentPhotoIndex[index]];
    photo.style.width = '100%';
    photo.style.height = 'auto';
    currentPhotoIndex[index] = (currentPhotoIndex[index] + 1) % photos[index].length;
}

function nextPhoto(id,element) {
        if(Flag[id] === false){
            toggleTitle(element)
            photoElement[id].classList.add('mark');
            photoElement[id].style.opacity = '0';
            console.log(photoElement[id])
            setTimeout(() => {changePhoto(photoElement[id],id)
                setTimeout(()=>{photoElement[id].style.opacity = '1';},500);
            }, 500);
            Flag[id] = true;
        }
        else{
            changePhoto(photoElement[id],id)
        }
}

function showCoverPhoto(id,element){
        if (Flag[id] === true){
            toggleTitle(element);
        }
        photoElement[id].classList.remove('mark');
        Flag[id] = false;
        photoElement[id].style.opacity = '0';
        setTimeout(()=>{
            photoElement[id].src = coverphoto[id];
            setTimeout(()=>{photoElement[id].style.opacity = '1';},500)
        },500)

    }

function toggleTitle(element){
    let title = document.getElementById(element);
    title.classList.toggle('clicked');
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});

window.onload = function() {
    let square = document.getElementsByClassName('book-cover');
    // let image = document.getElementById('image');

    function updateSquare() {
        console.log('updateSquare');
        for(i=0; i<square.length; i++) {
            let width = square[i].offsetWidth;
            let height = square[i].offsetHeight;
            let image = square[i].querySelector("img")
            if (!image.classList.contains('mark')){
                if (width > height) {
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
    }
    updateSquare();
    window.addEventListener('resize', updateSquare);

}