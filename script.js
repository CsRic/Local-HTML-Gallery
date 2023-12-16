const images = ["images/MISSILE228.full.2868896.jpg", "images/MISSILE228.full.2904075.jpg", "images/MISSILE228.full.2934229.jpg", "images/MISSILE228.full.3203181.jpg", "images/MISSILE228.full.3203183.jpg", "images/MISSILE228.full.3506959.jpg", "images/MISSILE228.full.3532502.jpg", "images/MISSILE228.full.3540279.jpg", "images/MISSILE228.full.3568362.jpg", "images/MISSILE228.full.3635310.jpg", "images/MISSILE228.full.3744582.jpg", "images/MISSILE228.full.3749986.jpg", "images/MISSILE228.full.3802668.jpg", "images/MISSILE228.full.3863121.jpg", "images/MISSILE228.full.3863122.jpg", "images/MISSILE228.full.3863123.jpg", "images/MISSILE228.full.3863124.jpg", "images/MISSILE228.full.3863126.jpg", "images/MISSILE228.full.3886719.jpg", "images/MISSILE228.full.3903483.jpg", "images/MISSILE228.full.4027132.jpg", "images/MISSILE228.full.4029681.jpg", "images/MISSILE228.full.4079290.jpg"];


const scrollSpeed = 500; // pixel per update
const queueLength = 3; // image num in queue
const updateInterval = 1000; // millisecond update interval

document.addEventListener('DOMContentLoaded', function() {
    const currentBackground = document.getElementById('currentBackground');
    const nextBackground = document.getElementById('nextBackground');
    let activeImages = [];
    let lastAddedImageIndex = -1;
    let currentPosition = 0;

    function addImage() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * images.length);
        } while (images.length > 1 && randomIndex === lastAddedImageIndex);

        lastAddedImageIndex = randomIndex;
        const imgElement = document.createElement('img');
        imgElement.src = images[randomIndex];
        imgElement.classList.add('background-image');
        imgElement.onload = () => {
            background.appendChild(imgElement);
            activeImages.push(imgElement);
            if (activeImages.length > queueLength) {
                removeImage();
            }
        };
    }

    function removeImage() {
        const oldImage = activeImages.shift();
        if (oldImage) {
            currentPosition += oldImage.offsetWidth;
            background.removeChild(oldImage);
            background.style.transform = `translateX(${currentPosition}px)`;
        }
        void background.offsetWidth;
    }

    function updatePosition() {
        background.style.opacity = '0';

        setTimeout(() => {
            const lastImage = activeImages[activeImages.length - 1];
            if (lastImage && lastImage.getBoundingClientRect().right < window.innerWidth + scrollSpeed) {
                addImage();
            }
            currentPosition -= scrollSpeed;
            background.style.transform = `translateX(${currentPosition}px)`;
            background.style.opacity = '1';
        }, 500);
    }

    for (let i = 0; i < queueLength; i++) {
        addImage();
    }

    setInterval(updatePosition, updateInterval);
});