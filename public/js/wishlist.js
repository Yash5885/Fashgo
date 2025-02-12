document.addEventListener("DOMContentLoaded", function () {
    const wishlistButton = document.querySelector(".wishlist-button");
    const wishlistIcon = wishlistButton.querySelector(".wishlist-icon");
    
    wishlistButton.addEventListener("mouseenter", function () {
        // Create a new Image element to completely reset the GIF
        let newGif = document.createElement("img");
        newGif.src = "./images/icons8-heart.gif"; // Set GIF source
        newGif.className = "wishlist-icon"; // Apply same class
        newGif.style.height = "24px"; // Maintain same size

        // Replace the old image with the new one
        wishlistIcon.replaceWith(newGif);

        // Update reference to new image
        wishlistIcon = newGif;
    });

    wishlistButton.addEventListener("mouseleave", function () {
        setTimeout(() => {
            let newStaticImg = document.createElement("img");
            newStaticImg.src = "./images/icons8-heart-50.png"; // Set PNG source
            newStaticImg.className = "wishlist-icon"; // Apply same class
            newStaticImg.style.height = "24px"; // Maintain same size

            // Replace the GIF with the static PNG
            wishlistIcon.replaceWith(newStaticImg);

            // Update reference to new image
            wishlistIcon = newStaticImg;
        }, 1000); // Delay to let GIF play once
    });
});
