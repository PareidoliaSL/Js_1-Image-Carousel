// FIXED WIDTH AND HEIGHT OF THE IMAGES
const IMAGE_WIDTH = 495;
const IMAGE_HEIGHT = 330;

// FETCHING DOM ELEMENTS
const carouselContainer = document.getElementsByClassName('carousel-container');
const carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper');
const images = document.getElementsByTagName('img');

// GETS NUMBER OF IMAGES INSIDE THE IMAGE WRAPPER
const imageCount = carouselImageWrapper[0].children.length;

// STYLING CAROUSEL CONTAINER
carouselContainer[0].style.width = IMAGE_WIDTH + 'px';
carouselContainer[0].style.height = IMAGE_HEIGHT + 'px';
carouselContainer[0].style.position = 'relative';
carouselContainer[0].style.overflow = 'hidden';
carouselContainer[0].style.margin = '0% auto';
carouselImageWrapper[0].style.position = 'relative';

// STYLING THE INDIVIDUAL IMAGES
for (let i = 0; i < imageCount; i++) {
    images[i].style.position = 'absolute';
    images[i].style.width = IMAGE_WIDTH + 'px';
    images[i].style.height = IMAGE_HEIGHT + 'px';
    images[i].style.top = '0px';
    images[i].style.left = (i * IMAGE_WIDTH) + 'px';
    images[i].style.border = '1px solid black';
}

// VARIABLES AND CONSTANTS FOR TRANSITION OF IMAGES AND INDICATOR DOT.  
const transitionSpeed = IMAGE_WIDTH / 20;
let distanceTravelled = 0;
let currentIndex = 0;
let interval;
const carouselIndicatorWidth = 20;
const carouselIndicatorMarginLeftRight = 5;

// CREATING AND STYLING INDICATOR DIV
const carouselIndicators = document.createElement('div');
carouselContainer[0].appendChild(carouselIndicators);
carouselIndicators.style.position = 'absolute';
carouselIndicators.style.top = (IMAGE_HEIGHT - (carouselIndicatorWidth * 2)) + 'px';
carouselIndicators.style.left = ((IMAGE_WIDTH / 2) - imageCount * (carouselIndicatorWidth - carouselIndicatorMarginLeftRight)) + 'px';


// RESET COLOR OF ALL CAROUSEL INDICATORS, AND SETS DIFFERENT COLOR TO THE ACTIVE ONE.

function setActiveCarouselIndicator() {
    for (let carouselIndicator of carouselIndicators.children) {
        carouselIndicator.style.opacity = '0.4';
    }
    carouselIndicators.children[currentIndex].style.opacity = '1';
}


// GENERATES CAROUSEL INDICATORS EQUAL TO THE NUMBER OF IMAGES
for (let i = 0; i < imageCount; i++) {
    const carouselIndicator = document.createElement('img');
    carouselIndicator.src = './images/dot_grey.svg';
    carouselIndicator.style.width = carouselIndicatorWidth + 'px';
    carouselIndicator.style.marginBottom = '5px';
    carouselIndicator.style.marginLeft = carouselIndicatorMarginLeftRight + 'px';
    carouselIndicator.style.marginRight = carouselIndicatorMarginLeftRight + 'px';
    carouselIndicator.style.cursor = 'pointer';
    carouselIndicators.appendChild(carouselIndicator);

    /**
     * Triggers a function when an indicator dot is clicked.
     */
    carouselIndicator.addEventListener('click', () => {
        /**
         * Runs every 17 milliseconds until the interval is cleared.
         */
        interval = setInterval(() => {
            /**
             * If clicked indicator dot is same as current pos, it clears the interval.
             */
            if (currentIndex === i) {
                clearInterval(interval);
            } else if (currentIndex > i) {
                /**
                 * Runs if clicked indicator dot is before the current position.
                 */
                distanceTravelled -= transitionSpeed;
                carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';

                if (distanceTravelled <= i * IMAGE_WIDTH) {
                    clearInterval(interval);
                    currentIndex = i;
                    setActiveCarouselIndicator();
                }
            } else {
                /**
                 * Runs if clicked indicator dot is after the current position.
                 */
                distanceTravelled += transitionSpeed;
                carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';
                if (distanceTravelled >= i * IMAGE_WIDTH) {
                    clearInterval(interval);
                    currentIndex = i;
                    setActiveCarouselIndicator();
                }
            }
        }, 17);
    });
}

// FUNCTION FOR NEXT BUTTON CLICKED
const nextClicked = function() {
    currentIndex++;

    // CHECKS IF THE LAST IMAGE IS BEING DISPLAYED
    if (currentIndex === imageCount) {
        currentIndex = 0;
        interval = setInterval(() => {
            distanceTravelled -= transitionSpeed;
            carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';

            if (distanceTravelled < currentIndex * IMAGE_WIDTH) {
                clearInterval(interval);
                setActiveCarouselIndicator();
            }
        }, 5);
    } else {
        interval = setInterval(() => {
            carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';
            distanceTravelled += transitionSpeed;

            if (distanceTravelled > currentIndex * IMAGE_WIDTH) {
                clearInterval(interval);
                setActiveCarouselIndicator();
            }
        }, 17);
    }
};


// FUNCTION FOR PREV BUTTON CLICKED
const prevClicked = function() {
    currentIndex--;

    // CHECKS IF THE FIRST IMAGE IS BEING DISPLAYED
    if (currentIndex === -1) {
        currentIndex = imageCount - 1;
        interval = setInterval(() => {
            distanceTravelled += transitionSpeed;
            carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';

            if (distanceTravelled >= currentIndex * IMAGE_WIDTH) {
                clearInterval(interval);
                setActiveCarouselIndicator();
            }
        }, 5);
    } else {
        interval = setInterval(() => {
            carouselImageWrapper[0].style.left = -(distanceTravelled) + 'px';
            distanceTravelled -= transitionSpeed;

            if (distanceTravelled < currentIndex * IMAGE_WIDTH) {
                clearInterval(interval);
                setActiveCarouselIndicator();
            }
        }, 17);
    }
};

// STYLING PREV AND NEXT
const prev = document.createElement('img');
const next = document.createElement('img');

prev.src = './images/arrow-left1.png';
prev.style.opacity = '0.5';
prev.style.position = 'absolute';
prev.style.width = '100px';
prev.style.height = '100px';
prev.style.cursor = 'pointer';
prev.style.top = ((IMAGE_HEIGHT / 2) - (parseInt(prev.style.height) / 2)) + 'px';
prev.style.left = '0px';

next.src = './images/arrow-right1.png';
next.style.opacity = '0.5';
next.style.position = 'absolute';
next.style.top = '0px';
next.style.width = '100px';
next.style.height = '100px';
next.style.cursor = 'pointer';
next.style.top = ((IMAGE_HEIGHT / 2) - (parseInt(next.style.height) / 2)) + 'px';
next.style.right = '0px';

carouselContainer[0].appendChild(prev);
carouselContainer[0].appendChild(next);

// NEXT AND PREV BUTTON CLICK EVENT 
next.addEventListener('click', nextClicked);

prev.addEventListener('click', prevClicked);

// SETS THE DEFAULT CAROUSEL INDICATOR TO FIRST ONE
setActiveCarouselIndicator();