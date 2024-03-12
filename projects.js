function toggleDescription(descriptionId,descriptionTitleId) {
    const descriptionElement = document.getElementById(descriptionId);
    const TitleElement = document.getElementById(descriptionTitleId);
    descriptionElement.classList.toggle('hidden');
    TitleElement.classList.toggle('clicked');
}

  function toggleGallery(image, gallery,title) {
    const mainImage = document.getElementById(image);
    const galleryContainer = document.getElementById(gallery);
    const TitleElement = document.getElementById(title);
    galleryContainer.classList.toggle('hidden');
    mainImage.classList.toggle('hidden');
    TitleElement.classList.toggle('clicked');
  }

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
