const images =[
    "ellenBild4.png",
    "ellenBild3.png",
    "ellenBild1.png",
    "ellenBild2.png"
]

let currentImageIndex = 0;

const slideshowImage = document.getElementById("slideshow-image");
const tillbakaBtn = document.getElementById("tillbakaBtn");
const nästaBtn = document.getElementById("nästaBtn");

function updateImage(){
    slideshowImage.src = images[currentImageIndex];
}

nästaBtn.addEventListener("click",() =>{
    currentImageIndex++;
    if(currentImageIndex >= images.length){
        currentImageIndex = 0;
    }
    updateImage();
})

tillbakaBtn.addEventListener("click", ()=>{
    currentImageIndex--;
    if(currentImageIndex < 0){
        currentImageIndex = images.length -1;
    }
    updateImage();
})

updateImage();