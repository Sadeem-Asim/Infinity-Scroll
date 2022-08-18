const loader = document.getElementById("loader");
const imageContainer = document.querySelector(".image-container");
let photosArray = [];
const accessKey = "DGzLAB-kcjnRCpKfL0qv6ufAWXiQWCD_QDT_elwR1j4";
const secretKey = "JzCF5X11OR66OvwiMVBKus8rda16Xq5A-agzTSrJ23M";
const count = 10;
let totalImages = 0;
let imagesLoaded = 0;
let ready = false;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;
function imageLoaded() {
  console.log(imagesLoaded);
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}
function displayImages() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //   create link for unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create image
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);
    //
    image.addEventListener("load", imageLoaded);
    // putting all in one container
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

async function getImage() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayImages();
  } catch (err) {
    console.log(err);
  }
}
// making infinity scroll
window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY <=
      this.document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImage();
  }
});

getImage();
