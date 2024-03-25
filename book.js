const photos = {'photo1':[
    "images/books/book2-1.png",
    "images/books/book2-2.png",
    "images/books/book2-3.png",
],'photo2':[
    "images/books/book2-1.png",
    "images/books/book2-2.png",
    "images/books/book2-3.png",
]};
const coverphoto = {'photo1':"images/books/osaas.png",'photo2':"images/books/srrti.png"};
let currentPhotoIndex = {'photo1':0,'photo2':0};
const photoElement = {'photo1':document.getElementById("photo1"),
    'photo2':document.getElementById("photo2")
};
let Flag = {'photo1':false,'photo2':false};

function changePhoto(photo,index){
    photo.src = photos[index][currentPhotoIndex[index]];
    photo.classList.add('width100');
    photo.classList.remove('height100');
    currentPhotoIndex[index] = (currentPhotoIndex[index] + 1) % photos[index].length;
}

function nextPhoto(id,element) {
        if(Flag[id] === false){
            toggleTitle(element)
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
        Flag[id] = false;
        photoElement[id].style.opacity = '0';
        setTimeout(()=>{
            photoElement[id].src = coverphoto[id];
            photoElement[id].classList.add('height100');
            photoElement[id].classList.remove('width100');
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