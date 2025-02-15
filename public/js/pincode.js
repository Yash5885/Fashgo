document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pincodeModal");
    const openModal = document.getElementById("openPincodeModal");
    const closeModal = document.querySelector(".pincode-close");
    const applyPincode = document.getElementById("applyPincode");
    const useMyLocation = document.getElementById("useMyLocation");
    const pincodeInput = document.getElementById("pincodeInput");
    const pincodeResult = document.getElementById("pincodeResult");
    const pincodeDisplay = document.getElementById("pincodeDisplay"); // Navbar update


    // ✅ Keep Pincode stored and show it in the navbar
    function updatePincodeUI(pincode) {
        pincodeDisplay.innerText = `Deliverable at ${pincode}`;
        localStorage.setItem("selectedPincode", pincode); // Store pincode
        modal.style.display = "none"; // Close modal
    }

    // ✅ Restore Pincode from localStorage
    const savedPincode = localStorage.getItem("selectedPincode");
    if (savedPincode) {
        updatePincodeUI(savedPincode);
        document.getElementById("pincode-display").textContent = savedPincode;
    }

    // ✅ Open Modal ONLY on click
    openModal.addEventListener("click", () => {
        modal.style.display = "flex"; // Show the modal
    });

    // ✅ Close Modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
    });

    // ✅ Close Modal on outside click
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // ✅ Check Delivery by Pincode
    applyPincode.addEventListener("click", async () => {
        const pincode = pincodeInput.value.trim();
        if (!pincode) {
            pincodeResult.innerText = "Please enter a valid pincode.";
            return;
        }

        const response = await fetch("/check-delivery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pincode })
        });

        const data = await response.json();
        if (data.deliverable) {
            updatePincodeUI(pincode);
        } else {
            pincodeResult.innerText = "Sorry, we do not deliver to this pincode.";
        }
    });

    // ✅ Get User's Location & Check Delivery
    useMyLocation.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                const response = await fetch("/get-location", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ latitude, longitude })
                });

                const data = await response.json();
                if (data.deliverable) {
                    updatePincodeUI(data.pincode);
                } else {
                    pincodeResult.innerText = "Sorry, we do not deliver to your location.";
                }
            });
        } else {
            pincodeResult.innerText = "Geolocation is not supported by your browser.";
        }
    });
});
